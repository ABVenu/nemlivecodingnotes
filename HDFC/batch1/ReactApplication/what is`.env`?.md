
## 📌 1. Create `.env` file

At the **root of your project** (same level as `package.json`):

```
/project-root
  ├── package.json
  ├── vite.config.js / webpack.config.js
  ├── .env
  └── src/
```

Example `.env`:

```env
# For API URL
VITE_API_URL=https://json-server-demo.onrender.com
VITE_APP_NAME=TodoApp
```

---

## 📌 2. Naming Rules

* **Vite/React** requires env vars to be prefixed:

  * In **CRA** → must start with `REACT_APP_`
  * In **Vite** → must start with `VITE_`
* These prefixes are a security feature → only such vars are exposed to the browser.

---

## 📌 3. Access in Code

### Vite:

```jsx
console.log(import.meta.env.VITE_API_URL);

fetch(`${import.meta.env.VITE_API_URL}/todos`)
  .then(res => res.json())
  .then(data => console.log(data));
```

### CRA:

```jsx
console.log(process.env.REACT_APP_API_URL);

fetch(`${process.env.REACT_APP_API_URL}/todos`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📌 4. Using Multiple Envs

You can create different env files:

* `.env` → default
* `.env.development`
* `.env.production`
* `.env.test`

When you run `npm run dev` or `npm run build`, React picks the correct file.

---

## 📌 5. Don’t Forget

* Restart dev server after changing `.env`.
* Don’t commit `.env` → add it to `.gitignore`.
* For production → host (Vercel, Netlify, etc.) lets you set environment variables directly.

---

👉 For your **JSON-server backend**, you might do:

`.env`

```env
VITE_API_URL=http://localhost:5000
```

`apiClient.js`

```js
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTodos() {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
}
```


