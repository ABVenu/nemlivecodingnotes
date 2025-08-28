
## 1️⃣ **If you’re using Create React App (CRA)**

* ✅ Good news: CRA comes with Jest preconfigured.
* You **don’t need to add Jest manually**.
* Just install extra matchers:

  ```bash
  npm install --save-dev @testing-library/jest-dom @testing-library/user-event
  ```
* In CRA, your `package.json` will already have this:

  ```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
  ```
* Nothing else to change.
* Add `setupTests.js` file in `src/` to load jest-dom automatically:

  ```js
  import "@testing-library/jest-dom";
  ```

---

## 2️⃣ **If you’re using Vite + Vitest (Recommended for Vite projects)**
### This is our case, as we using vite template
* Install:

  ```bash
  npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui
  ```

* Update `package.json` scripts:

  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage"
  }
  ```

* Add `vite.config.js` (or `vite.config.ts`) test config:

  ```js
  /// <reference types="vitest" />
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
    },
  });
  ```

* Create `src/setupTests.js`:

  ```js
  import "@testing-library/jest-dom";
  ```

---

## 3️⃣ **If you’re using Vite but want Jest (less common, more setup)**


* Install Jest & babel support:

  ```bash
  npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```
* Add `babel.config.js`:

  ```js
  module.exports = {
    presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
  };
  ```
* Add `jest.config.js`:

  ```js
  module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  };
  ```
* Update `package.json` scripts:

  ```json
  "scripts": {
    "test": "jest"
  }
  ```

---

✅ **Summary:**

* **CRA** → no changes to `package.json` (just add `@testing-library/jest-dom` and `setupTests.js`).
* **Vite + Vitest** → add `"test": "vitest"` in scripts + configure `vite.config.js`.
* **Vite + Jest** → need `babel.config.js` + `jest.config.js` + script `"test": "jest"`.

---

