

# **Performance & Optimization in Next.js (App Router)**

---

## **1. Why Performance & Optimization?**

Before we dive into coding, let’s understand *why* this topic is so important:

* **User Experience** → A fast site feels smooth, loads quickly, and keeps the user engaged. Slow sites frustrate users, leading to drop-offs.
* **SEO Impact** → Google and other search engines consider site speed and performance (Core Web Vitals) as ranking factors. Faster websites rank higher.
* **Business Impact** → Faster pages = lower bounce rate = higher conversions. Amazon once reported a 1% revenue loss for every 100ms slowdown.
* **Developer Productivity** → Next.js gives you built-in tools for optimization so you don’t need to manually optimize images, caching, or bundles.

👉 Our goal today: Learn **how App Router helps us optimize performance and SEO**, and see it **practically** using demos.

---

## **2. SEO with App Router**

### **2.1 What is SEO?**

SEO (**Search Engine Optimization**) ensures that your website can be easily discovered and indexed by search engines like Google.
It involves:

* Having proper **metadata** (title, description, keywords).
* Using **semantic HTML** (`<h1>`, `<p>`, `<nav>` etc.) so crawlers understand structure.
* Adding **Open Graph tags** for social media preview (Facebook, Twitter, WhatsApp).
* Ensuring **good performance** (fast, mobile-friendly, accessible).

---

### **2.2 How SEO was handled before (Pages Router)**

Older Next.js used `next/head`:

```jsx
import Head from "next/head";

<Head>
  <title>My Page</title>
  <meta name="description" content="..." />
</Head>
```

But in **App Router**, we don’t use `Head`. Instead, we use a **Metadata API**.

---

### **2.3 SEO with Metadata API (Static Metadata)**

Every page in App Router can export a `metadata` object.

```jsx
// app/page.js
export const metadata = {
  title: "SEO Optimized Page - Next.js",
  description: "This page is optimized for SEO using Metadata API in App Router",
  keywords: ["Next.js", "SEO", "Performance", "App Router"],
  openGraph: {
    title: "SEO Optimized Page",
    description: "Better SEO with Next.js Metadata API",
    url: "https://example.com",
    siteName: "Next.js SEO Demo",
    images: [
      {
        url: "/seo-image.png",
        width: 800,
        height: 600,
        alt: "SEO Demo Image",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">
          🚀 SEO Optimized Page with Next.js
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Build blazing-fast, search-friendly websites with Next.js App Router.
          This page demonstrates metadata, performance optimization, and modern
          best practices.
        </p>
        <a
          href="#features"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Learn More
        </a>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Why Optimize with Next.js?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">✅ Metadata API</h3>
            <p className="text-gray-600">
              Generate SEO-friendly titles, descriptions, and Open Graph tags
              dynamically for each page.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">⚡ Performance</h3>
            <p className="text-gray-600">
              Enjoy automatic image optimization, lazy loading, and fast
              JavaScript bundles out of the box.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">🌍 SEO Ranking</h3>
            <p className="text-gray-600">
              Give search engines structured metadata for better ranking and
              visibility on social platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p>
          © {new Date().getFullYear()} Next.js SEO Demo. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

```

What happens here?

* `title` → Appears on browser tab + Google search results.
* `description` → Appears under title in Google search.
* `keywords` → Old practice, still included, not heavily used by Google anymore.
* `openGraph` → Used when sharing links on social media (Facebook/Twitter preview).

👉 This is the **App Router way** to do SEO.

---

### **2.4 SEO with Dynamic Metadata**

Sometimes metadata depends on data fetched at runtime (e.g., blog posts, product pages).
We use `generateMetadata()` for that.

```jsx
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(res => res.json());

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogPage({ params }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

Here:

* Each blog post gets **unique title & description**.
* Search engines index **individual posts** properly.
* Social previews show the correct image.

---

👉 **Class Demo Idea**:

* Create two projects:

  * **Non-SEO Project**: No metadata, just `<h1>` text.
  * **SEO Project**: Use `metadata` object with title, description, OG tags.
* Run `npm run build && npm start` → open **Lighthouse** and compare SEO score + inspect HTML source.

---

## **3. Image Optimization**

### **3.1 Why optimize images?**

* Images make up **60–70% of total page weight**.
* A 2MB unoptimized image can drastically slow down load time.
* Google uses **Largest Contentful Paint (LCP)** as a ranking signal → often, that’s an image.

---

### **3.2 `next/image` (App Router way)**

```jsx
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Image Optimization Demo</h1>
      <Image
        src="/big-image.jpg"
        alt="Optimized Image"
        width={600}
        height={400}
        priority
      />
    </div>
  );
}
```

What happens here?

* Next.js automatically compresses and serves **smaller, optimized images**.
* Converts to modern formats (like WebP) when supported.
* Provides **responsive image sizes**.
* Lazy loads images below the fold (saves bandwidth).
* Works with **Vercel CDN** for caching globally.

👉 **Demo**:

1. First use `<img src="/big-image.jpg" />`. Run Lighthouse → lower performance score.
2. Replace with `<Image>` → run Lighthouse again → score improves, load time decreases.

---

## **4. Bundle Analysis & Lazy Loading**

### **4.1 Why care about bundles?**

* Every JavaScript file sent to the browser = parsing time + execution time.
* Goal: reduce **initial bundle size** → faster first load.

---

### **4.2 Bundle Analyzer Setup**

```bash
npm install @next/bundle-analyzer
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});
```

Run:

```bash
ANALYZE=true npm run build
```

👉 You’ll see a visual graph of bundle size.

---

### **4.3 Lazy Loading (Dynamic Import)**

If you import a heavy library like `chart.js`, your first page load becomes heavy.
Instead, load it **only when needed**:

```jsx
// app/page.js
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false, // load only in browser
  loading: () => <p>Loading chart...</p>,
});

export default function Page() {
  return (
    <div>
      <h1>Lazy Loading Demo</h1>
      <Chart />
    </div>
  );
}
```

👉 With `dynamic()`:

* Initial load = light bundle.
* Chart loads **only when the component is mounted**.

---

## **5. Deployment Best Practices (Vercel)**

### **Why Vercel?**

* Next.js was created by Vercel → deepest integration.
* Provides **global CDN**, **edge caching**, **image optimization**, **analytics**.

---

### **Best Practices with App Router**

1. **Incremental Static Regeneration (ISR)**

   ```jsx
   // app/posts/[id]/page.js
   export const revalidate = 60; // page re-generates every 60 seconds
   ```

   * You get **static speed** but **fresh data**.

2. **Static Params for SSG**

   ```jsx
   export async function generateStaticParams() {
     const posts = await fetch("https://api.example.com/posts").then(r => r.json());
     return posts.map(post => ({ id: post.id }));
   }
   ```

   * Pre-builds only certain pages for faster builds.

3. **Fonts Optimization**

   ```jsx
   import { Inter } from 'next/font/google';
   const inter = Inter({ subsets: ['latin'] });
   export default function Page() {
     return <h1 className={inter.className}>Optimized Fonts</h1>;
   }
   ```

   * Loads fonts directly → avoids CLS (Cumulative Layout Shift).

4. **Environment Variables**

   * Store secrets in Vercel dashboard, not in code.

5. **Monitoring**

   * Use **Vercel Analytics** to track performance and Core Web Vitals.

---

## **6. Practical Demo Flow for Class**

1. **SEO**:

   * Non-SEO page → no metadata.
   * SEO page → add metadata, run Lighthouse, show difference.

2. **Images**:

   * Add `<img>` with big file → Lighthouse shows slower LCP.
   * Replace with `<Image>` → re-run Lighthouse → score improves.

3. **Bundle**:

   * Import a heavy dependency → build size increases.
   * Add dynamic import → show reduced bundle in analyzer.

4. **Deployment**:

   * Push to GitHub, deploy on Vercel.
   * Show ISR in action → update API, refresh page after 1 min → new data appears.

---

✅ At the end of this session, students understand:

* How App Router handles **SEO properly with Metadata API**.
* Why **images** should always use `<Image>`.
* How to **measure and optimize bundles**.
* How to **deploy smartly on Vercel**.

---

