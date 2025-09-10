### Todos Application Using Page Router Approach

## 📂 Folder Structure

```
pages/
 ├─ _app.js
 ├─ index.js              # Home
 ├─ todos/
 │   ├─ index.js          # Todos list (SSR fetch + components)
 │   ├─ [id].js           # Single Todo
 └─ dashboard.js          # Dashboard
components/
 ├─ Layout.js
 ├─ TodoList.js
 ├─ AddTodo.js
 └─ TodoItem.js
```

---

## `pages/_app.js`

```jsx
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

---

## `components/Layout.js`

```jsx
import Link from "next/link";

export default function Layout({ children }) {
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

## `components/TodoItem.js`

```jsx
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

## `components/AddTodo.js`

```jsx
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

## `components/TodoList.js`

```jsx
import { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

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
  };

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

## `pages/index.js` (Home)

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

## `pages/todos/index.js` (SSR Fetch)

```jsx
import Layout from "../../components/Layout";
import TodoList from "../../components/TodoList";

export default function TodosPage({ todos }) {
  return (
    <Layout>
      <h2 style={{ marginBottom: "15px" }}>Todos List</h2>
      <TodoList initialTodos={todos} />
    </Layout>
  );
}

// Server-side rendering
export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/todos");
  const todos = await res.json();

  return {
    props: { todos },
  };
}
```

---

## `pages/todos/[id].js`

```jsx
import Layout from "../../components/Layout";

export default function TodoPage({ todo }) {
  return (
    <Layout>
      <h2>Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:4000/todos/${params.id}`);
  const todo = await res.json();

  return { props: { todo } };
}
```

---

## `pages/dashboard.js`

```jsx
import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      <h2>Dashboard</h2>
      <p>This is your dashboard. You can add statistics later.</p>
    </Layout>
  );
}
```

---


