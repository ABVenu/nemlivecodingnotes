
# Special Functions in **App Router**

### 1. `generateStaticParams`

* Replaces **`getStaticPaths`** from Pages Router.
* Used only in **dynamic routes** (`[id]`, `[slug]`, etc.).
* Runs at **build time**.
* Tells Next.js which dynamic routes to pre-render.

```js
export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  const posts = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
```

---

### 2. `generateMetadata`

* Runs **on the server**.
* Used for **SEO metadata** like `<title>`, `<meta>`, `<link>`.
* Can be **static** or **dynamic** (based on `params`).

```js
export async function generateMetadata({ params }) {
  return {
    title: `Post ${params.id}`,
    description: "Dynamic SEO metadata for a post",
  };
}
```

---

### 3. `revalidate` (not a function, but a setting)

* Works like **Incremental Static Regeneration (ISR)**.
* Tells Next.js how often to re-fetch and re-render.
* Used with `fetch` or exported directly.

```js
export const revalidate = 60; // re-generate every 60 seconds
```

---

### 4. `dynamicParams` (setting)

* Controls whether to allow **fallback routes** (like Pages Router’s `fallback: true/false`).

```js
export const dynamicParams = true; // allow params not returned in generateStaticParams
```

---

### 5. `dynamic` (setting)

* Forces a route to be **dynamic** (`force-dynamic`) or **static** (`force-static`).
* Controls whether Next.js should pre-render or render on each request.

```js
export const dynamic = "force-dynamic"; // always SSR
```

---

### 6. `fetch` options (`cache`, `next`)

Instead of special functions like `getServerSideProps`, **fetch itself controls caching & rendering**.

* **Static (default):**

  ```js
  await fetch(url); // cached at build time (SSG)
  ```
* **Revalidate:**

  ```js
  await fetch(url, { next: { revalidate: 60 } }); // ISR
  ```
* **No Cache (SSR):**

  ```js
  await fetch(url, { cache: "no-store" }); // always server-side
  ```

---

# 🎯 Summary Table

| Pages Router              | App Router Equivalent                |
| ------------------------- | ------------------------------------ |
| `getStaticProps`          | `fetch` (default cache)              |
| `getServerSideProps`      | `fetch` with `{ cache: "no-store" }` |
| `getStaticPaths`          | `generateStaticParams`               |
| `getInitialProps`         | ❌ (removed, no direct replacement)   |
| SEO in `_document`/`Head` | `generateMetadata`                   |

---


