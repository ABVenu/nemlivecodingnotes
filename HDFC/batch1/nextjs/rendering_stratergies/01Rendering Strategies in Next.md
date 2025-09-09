
# **Rendering Strategies in Next.js**

## **1. Why Rendering Strategies Are Needed**

* **Problem in traditional React (CSR):**

  * Initial HTML is empty (`<div id="root"></div>`).
  * Browser fetches data **after JS loads** → slower first render.
  * SEO-unfriendly: crawlers may see empty content.

* **Next.js solution:**

  * Pre-render pages on server/build → faster first contentful paint (FCP).
  * Four main strategies:

    1. **CSR (Client-Side Rendering)**
    2. **SSR (Server-Side Rendering)**
    3. **SSG (Static Site Generation)**
    4. **ISR (Incremental Static Regeneration)**

---

## **2. Detailed Explanation of Each Strategy**

### **2.1 Client-Side Rendering (CSR)**

* Fetch happens **in the browser** (e.g., `useEffect`).
* HTML initially empty → React mounts → fetch → render.
* Example:

```jsx
"use client";
import { useEffect, useState } from "react";

export default function TodosCSR() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => res.json())
      .then(setTodos);
  }, []);
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

* **Pros:** Interactive, simple, standard React behavior.
* **Cons:** Slower initial render, poor SEO.

---

### **2.2 Server-Side Rendering (SSR)**

* Fetch happens **on server per request**.
* Browser receives **fully rendered HTML** with data.
* Example:

```js
// pages/SSR.js
export default async function SSRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  const todos = await res.json();
  const renderedAt = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>SSR Todos (Rendered at {renderedAt})</h2>
      <ul>{todos.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>
    </div>
  );
}
```

* **Pros:** Always fresh, fast first paint, SEO-friendly.
* **Cons:** Server does work per request → slightly slower for huge traffic.

---

### **2.3 Static Site Generation (SSG)**

* Fetch happens **once at build time** → HTML cached.
* Example:

```js
// pages/SSG.js
export const revalidate = false; // purely static
export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();
  const buildTime = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>SSG Posts (Built at {buildTime})</h2>
      <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  );
}
```

* **Pros:** Extremely fast, SEO-friendly, minimal server load.
* **Cons:** Data frozen until rebuild.

---

### **2.4 Incremental Static Regeneration (ISR)**

* **SSG with automatic refresh**.
* Use `revalidate` to set regeneration interval:

```js
// pages/ISR.js
export const revalidate = 10; // regenerate every 10s
export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();
  const generatedAt = new Date().toLocaleTimeString();

  return (
    <div>
      <h2>ISR Posts (Generated at {generatedAt})</h2>
      <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
    </div>
  );
}
```

* **Pros:** Best of both worlds — fast + fresh.
* **Cons:** Slightly more complex build setup.

---

### **3. Comparison Table**

| Strategy | Fetch Timing              | HTML                        | SEO       | Example Use Case                          |
| -------- | ------------------------- | --------------------------- | --------- | ----------------------------------------- |
| CSR      | Browser after JS load     | Initially empty             | Poor      | User dashboards, dynamic interactivity    |
| SSR      | Server per request        | Full HTML sent              | Excellent | News feed, user profile pages             |
| SSG      | Build time                | Pre-built, cached           | Excellent | Marketing pages, blog posts               |
| ISR      | Build time + revalidation | Pre-built + periodic update | Excellent | E-commerce product catalog, news articles |

---

