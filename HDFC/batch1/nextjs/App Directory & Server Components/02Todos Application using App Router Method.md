### Todos Application using App Router Method
## 📂 Folder Structure

```
app/
 ├─ layout.js
 ├─ page.js                # Home
 ├─ todos/
 │   ├─ layout.js          # Shared layout for todos & dashboard
 │   ├─ page.js            # Todos list (SSR fetch + components)
 │   ├─ components/
 │   │    ├─ TodoList.js
 │   │    ├─ AddTodo.js
 │   │    └─ TodoItem.js
 │   └─ [id]/
 │        └─ page.js       # Single Todo
 └─ dashboard/
     └─ page.js            # Dashboard
```

---

## `app/layout.js`

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
        <header style={{ marginBottom: "20px" }}>
          <h1>Next.js Todo Application</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
```

---

## `app/page.js` (Home)

```jsx
export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Welcome to the Todos Application 🎉</h2>
      <p style={{ marginTop: "10px", color: "gray" }}>
        Manage your tasks efficiently with Next.js + JSON Server
      </p>
    </div>
  );
}
```

---

## `app/todos/layout.js`

```jsx
import Link from "next/link";

export default function TodosLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#f0f0f0", padding: "15px" }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/todos">Todos</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
```

---

## `app/todos/components/TodoItem.js`

```jsx
"use client";

export default function TodoItem({ todo, onDelete }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        padding: "8px",
        borderRadius: "5px",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{todo.title}</span>
      <div>
        <a href={`/todos/${todo.id}`} style={{ marginRight: "10px", color: "blue" }}>
          View
        </a>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
```

---

## `app/todos/components/AddTodo.js`

```jsx
"use client";

import { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo..."
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "10px",
        }}
      />
      <button
        type="submit"
        style={{
          background: "blue",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}
```

---

## `app/todos/components/TodoList.js`

```jsx
"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

export default function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  // Add new todo
  const addTodo = async (title) => {
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
```

---

## `app/todos/page.js` (SSR Fetch + Components)

```jsx
import TodoList from "./components/TodoList";

export default async function TodosPage() {
  const res = await fetch("http://localhost:4000/todos", {
    cache: "no-store", // forces server-side fetching on every request
  });
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

## `app/todos/[id]/page.js`

```jsx
export default async function TodoPage({ params }) {
  const res = await fetch(`http://localhost:4000/todos/${params.id}`, {
    cache: "no-store",
  });
  const todo = await res.json();

  return (
    <div>
      <h2>Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
    </div>
  );
}
----------------------------------------------
"use client"; // ✅ make this a client component

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TodoPage({ params }) {
  const router = useRouter();
  const [todo, setTodo] = useState(null);
  const { id } = React.use(params); // unwrap the promise
  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setTodo(data);
    };

    fetchTodo();
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h2>Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
```

---

## `app/dashboard/page.js`

```jsx
export default function DashboardPage() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>This is your dashboard. You can add statistics later.</p>
    </div>
  );
}
```

---


