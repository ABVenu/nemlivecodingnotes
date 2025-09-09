
# ⚡ Pages Router vs App Router in Next.js

## 1. **Origin**

* **Pages Router** (pre-Next.js 13) → Classic file-based routing using `pages/`.
* **App Router** (Next.js 13+) → Newer system using `app/`, designed around **React Server Components (RSC)**.

---

## 2. **Routing**

| Feature        | Pages Router (`pages/`)                         | App Router (`app/`)                                     |
| -------------- | ----------------------------------------------- | ------------------------------------------------------- |
| File system    | `pages/index.js → /`, `pages/about.js → /about` | `app/page.js → /`, `app/about/page.js → /about`         |
| Dynamic routes | `pages/posts/[id].js`                           | `app/posts/[id]/page.js`                                |
| Catch-all      | `pages/posts/[...slug].js`                      | `app/posts/[...slug]/page.js`                           |
| Nested layouts | ❌ Not supported (layouts must be duplicated)    | ✅ Built-in (`app/layout.js`, `app/dashboard/layout.js`) |

---

## 3. **Data Fetching**

| Feature                                                  | Pages Router                              | App Router                                                                                          |
| -------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `getStaticProps`, `getServerSideProps`, `getStaticPaths` | ✅ Supported                               | ❌ Not supported                                                                                     |
| Data fetching                                            | At **build-time** or **request-time**     | Fetch inside **Server Components** (`await fetch(...)`)                                             |
| Caching                                                  | Manual (`revalidate` in `getStaticProps`) | Automatic caching with `fetch` options (`{ cache: 'force-cache' }`, `{ next: { revalidate: 10 } }`) |

---

## 4. **Rendering Modes**

| Mode                                  | Pages Router                            | App Router                                                                  |
| ------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| SSR (Server-Side Rendering)           | `getServerSideProps`                    | Default (all components are server components unless marked `"use client"`) |
| SSG (Static Site Generation)          | `getStaticProps` + `getStaticPaths`     | `generateStaticParams`                                                      |
| ISR (Incremental Static Regeneration) | `revalidate` option in `getStaticProps` | `fetch(..., { next: { revalidate: 60 } })`                                  |

---

## 5. **Other Features**

| Feature                 | Pages Router      | App Router                                   |
| ----------------------- | ----------------- | -------------------------------------------- |
| Middleware              | ✅ Supported       | ✅ Supported                                  |
| API Routes              | ✅ `pages/api/*`   | ✅ Still uses `pages/api/*` (not in `app/`)   |
| Streaming / Suspense    | ❌ Not supported   | ✅ Supported                                  |
| React Server Components | ❌                 | ✅ Default                                    |
| Built-in SEO Metadata   | ❌ Manual `<Head>` | ✅ `export const metadata = { title: "..." }` |

---

## 6. **Learning Curve**

* **Pages Router** → simpler, good for beginners and interview prep.
* **App Router** → more powerful, but concepts like **server vs client components**, layouts, and caching can confuse beginners.

---

# 🚀 Which is Best?

### ✅ Use **Pages Router** if:

* You’re maintaining older projects.
* You want to practice `getStaticProps`, `getServerSideProps`, etc.
* You’re preparing for **interviews** (many still ask about `getStaticProps`/`getServerSideProps`).

### ✅ Use **App Router** if:

* You’re starting a new project today.
* You want **better performance, SEO, streaming, layouts, server components**.
* You’re okay with a bit more learning curve.

---

# 🎯 Final Verdict

* **For new production apps → App Router is best** (future of Next.js).
* **For learning/interviews → Pages Router is still important** (legacy knowledge, still widely used).

---


