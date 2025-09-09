
### Stratergies applicable and works only for **Page Router**
## 1️⃣ **getStaticProps (SSG – Static Site Generation)**

**What it does:**

* Runs **only at build time**.
* Fetches data **once** when you build the site.
* The page is **pre-rendered** and served as static HTML.

**When to use:**

* Data doesn’t change often (blog posts, docs, product catalog).

**Example:**

```javascript
// pages/posts.js
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();

  return {
    props: {
      posts, // will be passed to the component as props
    },
  };
}

export default function PostsPage({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

✅ The HTML is **generated at build time**, fast for users, but **won’t update until next build**.

---

## 2️⃣ **getStaticPaths (Dynamic SSG)**

**What it does:**

* Used with **dynamic routes** (like `/posts/[id].js`).
* Tells Next.js **which paths to pre-render at build time**.
* Works **together with `getStaticProps`**.

**Example:**

```javascript
// pages/posts/[id].js
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}

export default function PostPage({ post }) {
  return <h1>{post.title}</h1>;
}
```

✅ Next.js will pre-render `/posts/1`, `/posts/2`, … at build time.
❌ Any new post after build **won’t exist** unless you rebuild.

---

## 3️⃣ **getServerSideProps (SSR – Server-Side Rendering)**

**What it does:**

* Runs **on every request** on the server.
* Page is rendered **fresh every time**.
* Data is always up-to-date.

**When to use:**

* Data changes frequently (dashboard, user profile, stock prices).

**Example:**

```javascript
// pages/profile.js
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();

  return {
    props: { user },
  };
}

export default function ProfilePage({ user }) {
  return <h1>{user.name}</h1>;
}
```

✅ Every time someone visits `/profile`, Next.js **fetches the latest data** and renders it on the server.

---

### **Quick Comparison Table**

| Feature              | Runs When                       | Example Use Case | Page Type       |
| -------------------- | ------------------------------- | ---------------- | --------------- |
| `getStaticProps`     | Build time                      | Blog posts       | Static HTML     |
| `getStaticPaths`     | Build time (for dynamic routes) | `/posts/[id]`    | Static HTML     |
| `getServerSideProps` | On every request                | User dashboard   | Server-rendered |

---
