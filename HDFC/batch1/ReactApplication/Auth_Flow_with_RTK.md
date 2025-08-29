## 🔹 1. Auth Flow with RTK

1. **Login Component**

   * Dispatches `loginUser(credentials)` thunk.
   * Thunk calls `authService.login()`.
   * If success → store user + token in Redux state.
   * Optionally → persist token in `localStorage`.

2. **Redux Store (authSlice)**

   * Holds `user`, `token`, `isAuthenticated`.
   * Components can read `user` anywhere using `useSelector`.

3. **ProtectedRoute**

   * Checks `isAuthenticated` from Redux.
   * If false → redirect to `/login`.
   * If true → render children.

4. **Inside Protected Page (e.g., Todos)**

   * `useSelector` to get the logged-in `user` and display info.

---

## 🔹 2. Example Code

### `authService.js`

```js
import { apiRequest } from "@/services/apiClient";

export const login = (credentials) =>
  apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
```

---

### `authSlice.js`

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "@/services/authService";

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const user = await authService.login(credentials);
  return user; // { id, name, email, token }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

---

### `ProtectedRoute.jsx`

```jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

---

### Usage in `App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Todos from "@/pages/Todos";
import Login from "@/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### `Todos.jsx` (Protected Page)

```jsx
import { useSelector } from "react-redux";

function Todos() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.name} 👋</h1>
      <p>Email: {user?.email}</p>
      {/* Todo list logic here */}
    </div>
  );
}

export default Todos;
```

---

## 🔑 Key Points

* **Redux state = single source of truth** for user info.
* **ProtectedRoute** ensures only logged-in users can access.
* **useSelector** lets you display user data anywhere.
* **localStorage token** ensures persistence (so refresh doesn’t log out immediately).

---


