

## **1️⃣ General Principle**

> Use the **most efficient strategy that still meets your app’s needs**.

Next.js allows mixing **CSR, SSR, SSG, ISR** in the same app. You don’t have to pick just one.

* Some pages can be static (SSG)
* Some dynamic (SSR)
* Some interactive (CSR)
* Some partially static with periodic regeneration (ISR)

---

## **2️⃣ Strategy Guide / Rules of Thumb**

| Strategy                                  | When to Use                                                                  | Pros                                                      | Cons                                                             | Example                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------- |
| **CSR (Client-side Rendering)**           | Page is highly interactive, user-specific, data changes frequently on client | Fast navigation after initial load, less server work      | Slow first load, bad SEO, JS-dependent                           | Dashboard widgets, chat, live search        |
| **SSR (Server-side Rendering)**           | Data changes frequently, must show fresh content per request, SEO matters    | Fast first paint, SEO-friendly, fresh data                | Slower than SSG, server load per request                         | News feed, stock prices, search results     |
| **SSG (Static Site Generation)**          | Content mostly static, can be generated at build time, SEO matters           | Blazing fast, cached globally, no server load per request | Not suitable for frequently changing data                        | Blogs, documentation, marketing pages       |
| **ISR (Incremental Static Regeneration)** | Mostly static pages but occasionally updated                                 | Fast like SSG, automatically regenerates stale content    | Regeneration happens after revalidate interval; slightly complex | E-commerce product pages, pricing, catalogs |

---

## **3️⃣ Practical Classroom Example**

* Marketing pages → **SSG**
* Blog posts → **SSG + ISR** (update every 10 mins or 1 hour)
* Product catalog → **ISR** (keep fresh, don’t rebuild whole site)
* User dashboards → **CSR**
* Search results → **SSR** (always fresh, SEO-friendly)

---

## **4️⃣ How to Mix Them in One App**

Next.js allows **per-page rendering choice**:

```text
app/
 ├── index.js          → SSG (default)
 ├── products/[id]/    → ISR (revalidate every 10s)
 ├── dashboard/        → CSR (use client components)
 └── search/           → SSR (fetch fresh every request)
```

✅ Students should understand:

* You **never have to use only one**.
* The choice depends on **data freshness**, **SEO needs**, and **interactivity**.

---

## **5️⃣ Quick Mental Model**

1. **Mostly static + SEO → SSG**
2. **Mostly static but changes occasionally → ISR**
3. **Dynamic per request + SEO → SSR**
4. **Highly interactive, personalized → CSR**

---

💡 **Pro Tip for teaching**:
Show the **timestamp demo from Session 3**. Let students **see SSR vs SSG vs ISR vs CSR behavior** live. Then explain:

> “Now you know which strategy to pick based on **freshness, performance, SEO, and interactivity**.”

---

