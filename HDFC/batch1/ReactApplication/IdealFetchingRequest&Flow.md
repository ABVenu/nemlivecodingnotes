
## 📌 Where to keep `fetch` requests?

You **should not** scatter raw `fetch` calls inside components. Instead, keep them in a **centralized folder** so they’re reusable, testable, and easy to maintain.

### 🔹 Best practice:

Use a `/services` (or `/api`) folder.

```
/src
 ├── /services
 │     ├── apiClient.js      # axios/fetch base setup
 │     ├── authService.js    # login, signup requests
 │     └── todoService.js    # todos CRUD requests
```

---

## 📌 Example

### 1. `apiClient.js`

If using `fetch`:

```js
const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
```

(If you want axios, you’d export an `axios.create({ baseURL: BASE_URL })` here.)

---

### 2. `authService.js`

```js
import { apiRequest } from "./apiClient";

export const login = (credentials) =>
  apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const signup = (data) =>
  apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
```

---

### 3. `todoService.js`

```js
import { apiRequest } from "./apiClient";

export const getTodos = () => apiRequest("/todos");

export const addTodo = (todo) =>
  apiRequest("/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });

export const updateTodo = (id, updates) =>
  apiRequest(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });

export const deleteTodo = (id) =>
  apiRequest(`/todos/${id}`, {
    method: "DELETE",
  });
```

---

## 📌 Usage in components

```jsx
import { useEffect, useState } from "react";
import { getTodos } from "@/services/todoService";

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos).catch(console.error);
  }, []);

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

---

## ✅ Advantages

* All API logic is **decoupled from UI**.
* Easy to swap JSON-server with real backend later.
* Central error handling.
* Works well with Redux Toolkit thunks or RTK Query.

---

👉 So short answer:
🔹 Keep all `fetch`/API calls inside **`/src/services`** (or `/api`) and only call those service functions inside components or Redux slices.

---



If you already have a **service layer** (`/services/todoService.js` with `fetch` calls), then what is the role of **Redux Toolkit (RTK)**? Let’s break it down:

---

## 🔹 1. Service Layer (`/services`)

* Responsible for **talking to backend** (API calls).
* Example: `getTodos()`, `addTodo()`, `login()` → all return a **Promise**.
* Purely about **data fetching**, no global state here.

---

## 🔹 2. Redux Toolkit (RTK)

* Responsible for **managing global state** in React.
* Decides:

  * Where to store the data (`todos`, `user` info).
  * How to update state (loading, success, error).
  * How components **consume** that state.

👉 RTK sits **on top of your service layer**.
It calls the `service` functions, handles the result, and puts it into Redux state.

---

## 📌 Example Flow (Todos)

### `todoService.js` (service layer)

```js
import { apiRequest } from "./apiClient";

export const getTodos = () => apiRequest("/todos");
export const addTodo = (todo) =>
  apiRequest("/todos", { method: "POST", body: JSON.stringify(todo) });
```

---

### `todosSlice.js` (RTK layer)

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as todoService from "@/services/todoService";

// Thunks use service functions
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await todoService.getTodos();
});

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (todo) => {
  return await todoService.addTodo(todo);
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default todosSlice.reducer;
```

---

### Usage in Component

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addNewTodo } from "@/features/todos/todosSlice";

function Todos() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addNewTodo({ title: "New Task" }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ✅ Summary

* **Service layer (`/services`)** = raw API calls.
* **RTK (slices + thunks)** = orchestrates API calls, manages global state, exposes it to components.

So think of it like this:
👉 **Services = “Data fetching utilities”**
👉 **Redux Toolkit = “Global state manager”**

---


