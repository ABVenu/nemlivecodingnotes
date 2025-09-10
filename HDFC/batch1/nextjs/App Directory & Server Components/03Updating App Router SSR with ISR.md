
#### Using ISR 
## Updated `app/todos/page.js` (ISR + Manual Revalidate)

```jsx
import TodoList from "./components/TodoList";

export const revalidate = 0; // ISR without automatic time limit

export default async function TodosPage() {
  const res = await fetch("http://localhost:4000/todos", { cache: "no-store" });
  const todos = await res.json();

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Todos List</h2>
      <TodoList initialTodos={todos} />
    </div>
  );
}
```

---

## `app/todos/components/TodoList.js` (Manual Revalidate)

```jsx
"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

// Next.js function to manually revalidate a path
import { revalidatePath } from "next/cache";

export default function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = async (title) => {
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);

    // Revalidate ISR
    revalidatePath("/todos");
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));

    // Revalidate ISR
    revalidatePath("/todos");
  };

  const updateTodo = async (id, newTitle) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    const updatedTodo = await res.json();
    setTodos(todos.map(t => t.id === id ? updatedTodo : t));

    // Revalidate ISR
    revalidatePath("/todos");
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo} // if you want update button in TodoItem
          />
        ))}
      </ul>
    </div>
  );
}
```

---

### ✅ Key Points:

1. `export const revalidate = 0;` → tells Next.js: **don’t automatically revalidate**, we’ll do it manually.
2. `revalidatePath("/todos")` → triggers ISR to refresh the `/todos` page whenever a mutation happens (add/update/delete).
3. All other pages (`[id]/page.js`) stay the same.




----------- or ---------------


```js
const res = await fetch("http://localhost:4000/todos", {
  next: {
    tags: ["todos"],
    revalidate: 3600, // automatic revalidation every 1 hour
  }
});
```

* **Initial request** → fetches from JSON Server → cached.
* **Subsequent requests within 3600 seconds** → return cached data (no new fetch).
* **After 3600 seconds** → ISR automatically re-fetches in the background.

---

### 2️⃣ Manual ISR with `revalidateTag("todos")`

```js
import { revalidateTag } from "next/cache";

const addTodo = async (title) => {
  await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  // Force revalidation of ISR
  revalidateTag("todos");
};
```

* This **immediately invalidates the cache** for all fetches with the `"todos"` tag.
* **Next request to `/todos`** → fetches fresh data from JSON Server **even if 3600 seconds haven't passed**.
* Automatic ISR revalidation timer (`3600`) still exists, but **manual revalidation overrides it**.

---




