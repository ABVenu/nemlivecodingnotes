### App Router System

# 📂 Folder Structure (`app/`)

```
app/
├── layout.js            // Root layout
├── page.js              // Home page (CSR example)
├── posts/
│   ├── page.js          // SSG / ISR example
│   └── [id]/
│       └── page.js      // SSR / SSG dynamic example
```

---

# 1️⃣ Root Layout (`app/layout.js`)

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Next.js App Router Examples</h1>
          <hr />
        </header>
        {children}
      </body>
    </html>
  );
}
```

---

# 2️⃣ CSR Example — Client Component (`app/page.js`)

```jsx
"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  return (
    <div>
      <h2>Client Side Rendering (CSR)</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

✅ Runs entirely on the **client**, uses `useEffect`.

---

# 3️⃣ SSG / ISR Example (`app/posts/page.js`)

```jsx
// Default fetch = SSG
export const revalidate = 10; // ISR: re-generate every 10 seconds

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 10 }, // ISR
  });
  const posts = await res.json();

  return (
    <div>
      <h2>Static Site Generation / ISR</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

* **SSG:** runs at build time
* **ISR:** automatically revalidates every 10s

---

# 4️⃣ SSR / Dynamic Example (`app/posts/[id]/page.js`)

```jsx
export const dynamic = "force-dynamic"; // SSR

export default async function PostPage({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    { cache: "no-store" } // always fresh
  );
  const post = await res.json();

  return (
    <div>
      <h2>Server Side Rendering (SSR)</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}
```

* Every request → fresh data
* Equivalent to **`getServerSideProps`** in Pages Router

---

# 5️⃣ Optional: Dynamic SSG (`generateStaticParams`)

```jsx
// In the same file: app/posts/[id]/page.js

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();

  return posts.map((p) => ({
    id: p.id.toString(),
  }));
}
```

* Pre-renders `/posts/1`, `/posts/2`, … at build time
* Works like `getStaticPaths`

---

# ✅ How It Works

| Route      | Rendering Type                               |
| ---------- | -------------------------------------------- |
| `/`        | CSR (client component)                       |
| `/posts`   | SSG / ISR                                    |
| `/posts/1` | SSR / Dynamic SSG (via generateStaticParams) |

---

This **single App Router project** covers **CSR, SSG, ISR, SSR, Client Components**.

---

