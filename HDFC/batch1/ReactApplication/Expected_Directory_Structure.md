
---

# 📂 Folder Structure

```
/project-root
│── package.json
│── vite.config.js / webpack.config.js
│── tailwind.config.js
│── postcss.config.js
│── .env              # API URLs, secrets
│── /public
│     └── index.html
│
└── /src
     │── main.jsx      # entry point
     │── App.jsx       # main app component with Router
     │── index.css     # global styles (tailwind base)
     │
     ├── /app
     │     ├── store.js        # Redux store configuration
     │     └── rootReducer.js  # combine slices if needed
     │
     ├── /features            # Redux Toolkit slices & related logic
     │     ├── auth
     │     │     ├── authSlice.js
     │     │     ├── authApi.js         # async thunks / RTK Query (if used)
     │     │     └── authUtils.js       # token helpers, etc.
     │     │
     │     └── todos
     │           ├── todosSlice.js
     │           ├── todosApi.js
     │           └── todosUtils.js
     │
     ├── /components          # Reusable small UI components
     │     ├── Navbar.jsx
     │     ├── Footer.jsx
     │     ├── ProtectedRoute.jsx   # wrapper for protected routes
     │     └── UI/   # Buttons, Inputs, Modals (from shadcn/chakra)
     │
     ├── /layouts             # Page layouts (auth layout, app layout)
     │     ├── AuthLayout.jsx
     │     └── MainLayout.jsx
     │
     ├── /pages               # Page-level components
     │     ├── Home.jsx
     │     ├── Signup.jsx
     │     ├── Login.jsx
     │     └── Todos.jsx
     │
     ├── /hooks               # custom hooks
     │     ├── useAuth.js
     │     └── useFetch.js
     │
     ├── /services            # API calls / axios base config
     │     ├── apiClient.js
     │     └── authService.js
     │
     ├── /context             # If useReducer + Context is needed
     │     └── ThemeContext.jsx
     │
     ├── /utils               # helpers, constants, validation
     │     ├── constants.js
     │     ├── validators.js
     │     └── storage.js     # localStorage/sessionStorage helpers
     │
     └── /assets              # images, logos, icons
```

---

# 🔑 Why this structure?

* **`/app`** → Redux store setup in one place.
* **`/features`** → Each domain (auth, todos, etc.) has its own slice, API calls, and utils (clean separation).
* **`/components`** → Reusable UI + special components like `ProtectedRoute`.
* **`/layouts`** → Easy to wrap different sections with different Navbars/Footers.
* **`/pages`** → Route-level screens.
* **`/services`** → Clean axios/json-server client setup.
* **`/hooks`** → All custom hooks for reuse.
* **`/utils`** → Constants, validation, localStorage helpers.
* **`/context`** → If you want to mix Context + useReducer for theme, UI state, etc.
* **`/assets`** → Static assets like logos, icons, images.

---

# 🔮 Flow of App

1. **Auth**

   * Signup → POST `/users` (json-server)
   * Login → Validate credentials → store JWT (fake) in `localStorage` → Redux state
   * `ProtectedRoute` → checks Redux auth state

2. **Todos CRUD**

   * Fetch todos → GET `/todos`
   * Add → POST `/todos`
   * Edit → PATCH `/todos/:id`
   * Delete → DELETE `/todos/:id`

3. **UI Libraries**

   * **Tailwind** → global styling
   * **shadCN** → cards, modals, inputs
   * **Chakra** → form controls, toasts

4. **Optimization**

   * React.memo for pure components
   * `useCallback`, `useMemo` where needed
   * Lazy loading routes
   * Splitting Redux slices cleanly
   * Debouncing API calls (if needed)

---
