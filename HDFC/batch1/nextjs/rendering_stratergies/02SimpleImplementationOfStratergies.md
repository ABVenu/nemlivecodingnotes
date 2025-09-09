### CSR
```javascript
"use client";
import { useEffect, useState } from "react";

export default function CSRPage() {
  const [renderTime, setRenderTime] = useState(null);

  useEffect(() => {
    // measure natural delay from page load to component rendering
    setRenderTime(Math.round(performance.now()));
  }, []);

  if (!renderTime) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", background: "#f0f8ff" }}>
      <h1>CSR Page</h1>
      <p>Client-side render time: {renderTime} ms since page start</p>
    </div>
  );
}
```

### SSR 
```javascript
// app/SSR/page.js
// export const dynamic = "force-dynamic"; // 🚀 disables static optimization
export default async function SSRPage() {
  const startTime = Date.now(); // server starts rendering
  const renderTime = Date.now() - startTime; // how long server took to render
  const generatedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });
  return (
    <div style={{ padding: "20px", background: "#e6ffe6" }}>
      <h1>SSR Page</h1>
      <p>Server-side render took: {renderTime} ms</p>
      <p>Generated at: {generatedAt}</p>
    </div>
  );
}

```
### SSG 
```javascript
// app/SSG/page.js
export const revalidate = false; // purely static

export default async function SSGPage() {
  const start = Date.now();

  // simulate real data fetching (fetching real API naturally)
  // for example:
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  // const data = await res.json();

  const end = Date.now();
  const buildTime = end - start; // natural build time in ms
   const newbuildTime = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <div style={{ padding: "20px", background: "#fff3e6" }}>
      <h1>SSG Page</h1>
      <p>Build (generation) time: {buildTime} ms</p>
      <p>Built at: {newbuildTime}</p>
    </div>
  );
}

```
### ISR
```javascript
// app/ISR/page.js
export const revalidate = 100; // regenerate every 100s

export default async function ISRPage() {
  const start = Date.now();

  // simulate natural server-side data fetching if needed
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  // const data = await res.json();

  const end = Date.now();
  const regenerateTime = end - start; // natural regeneration time
   const generatedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <div style={{ padding: "20px", background: "#f9f0ff" }}>
      <h1>ISR Page</h1>
      <p>Last regeneration took: {regenerateTime} ms</p>
      <p>Generated at: {generatedAt}</p>
    </div>
  );
}
```
