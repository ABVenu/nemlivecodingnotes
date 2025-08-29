**`@`** in the path

That’s not default JavaScript — it’s a **path alias** we configure in the bundler (Vite, Webpack, Next.js, etc.) to avoid ugly relative imports.

---

## 🔹 The Problem Without Aliases

Imagine your project grows big:

```js
import { getTodos } from "../../../services/todoService";
```

That `../../../` stuff is **ugly and fragile** (breaks if you move files around).

---

## 🔹 The Solution → Path Aliases

We configure an alias like:

```
@ = src
```

so instead of writing `../../../services/todoService`, we just write:

```js
import { getTodos } from "@/services/todoService";
```

---

## 📌 How to Set Up in Vite (React)

1. Install `vite-tsconfig-paths` (works even in JS projects):

```bash
npm install -D vite-tsconfig-paths
```

2. Update `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src",   // ✅ maps @ to src folder
    },
  },
});
```

3. Update `jsconfig.json` (or `tsconfig.json`) at project root:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Now imports work:

```js
import { getTodos } from "@/services/todoService";
import Navbar from "@/components/Navbar";
```

---

## 📌 How to Set Up in CRA (Create React App)

1. Install **craco** or **react-app-rewired**, because CRA doesn’t support aliases natively.
2. Or simpler: use `jsconfig.json` (works in VSCode + CRA).

`jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

Then:

```js
import { getTodos } from "services/todoService";
```

---

## ✅ Summary

* `@` is just a shortcut → alias for `/src`.
* You configure it in **Vite/Webpack + tsconfig/jsconfig**.
* It keeps imports **clean, consistent, and less error-prone**.

---


