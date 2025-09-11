## 🔹 1. Default Behavior of `<Image />`

When you use Next.js’s `Image` component:

```jsx
import Image from "next/image";

export default function Example() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero banner"
      width={800}
      height={400}
    />
  );
}
```

### What happens under the hood:

1. **Lazy Loading by Default**

   * Unless you explicitly add `priority`, all `<Image />` elements are `loading="lazy"`.
   * That means images below the viewport are **not downloaded until the user scrolls near them**.
   * Saves bandwidth + speeds up first load.

2. **Responsive Loading**

   * Generates multiple sizes (based on `deviceSizes` in `next.config.js`).
   * Browser downloads the best size for the screen resolution (no oversized images).

3. **Modern Formats**

   * Supports **WebP/AVIF** automatically if the browser supports them.
   * Falls back to JPEG/PNG if not.

4. **Optimized Delivery**

   * Images are served via Next.js’s **Image Optimization API** (`/_next/image?...`).
   * This means resizing, compression, caching handled automatically.

---

## 🔹 2. Lazy Loading vs Priority

* **Default (Lazy Loading)**

  ```jsx
  <Image src="/banner.jpg" alt="Banner" width={800} height={400} />
  ```

  Loads only when scrolled into view.

* **Above-the-fold (Priority)**

  ```jsx
  <Image
    src="/hero.jpg"
    alt="Hero section"
    width={1200}
    height={600}
    priority
  />
  ```

  Loads immediately on page load.
  Useful for **hero images / logos** that must be visible right away.

---

## 🔹 3. How It Improves Performance

* **First Contentful Paint (FCP)** improves → only necessary images load first.
* **Largest Contentful Paint (LCP)** improves if you mark the main hero image as `priority`.
* **Cumulative Layout Shift (CLS)** is reduced because you always specify `width` & `height`, so the layout is reserved.

---

## 🔹 4. Compared with Normal `<img>`

| Feature           | `<img>`                                          | `<Image>`                    |
| ----------------- | ------------------------------------------------ | ---------------------------- |
| Lazy loading      | ❌ Not by default (you must add `loading="lazy"`) | ✅ Built-in                   |
| Responsive sizes  | ❌ You must write `srcset` manually               | ✅ Auto-generated             |
| Optimized formats | ❌ You must serve WebP/AVIF yourself              | ✅ Automatic                  |
| Resize & compress | ❌ Manual                                         | ✅ Via Image Optimization API |
| CLS prevention    | ❌ Risky if no width/height                       | ✅ Always required            |

---

✅ **Conclusion:**
Next.js `<Image />` does **lazy loading automatically** (unless you add `priority`).
It’s far better than plain `<img>` for performance + SEO because it combines lazy loading, responsive sizing, compression, and caching in one.

---


