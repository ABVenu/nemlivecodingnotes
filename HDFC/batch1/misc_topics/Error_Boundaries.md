
---

## 1. Introduction to Errors in React

* React apps can crash due to **runtime errors** in components.
* By default, React **unmounts the whole component tree**, showing a blank screen.

🔹 Example: Faulty component that throws error

```jsx
function FaultyComponent() {
  throw new Error("I crashed!");
  return <div>This will never render</div>;
}

export default function App() {
  return (
    <div>
      <h1>My React App</h1>
      <FaultyComponent />
    </div>
  );
}
```

👉 Running this will crash the **entire app**.

---

## 2. Why Error Boundaries?

* We don’t want the **whole app to crash** because of one buggy component.
* Instead, we want a **graceful fallback UI**:

  * Show “Something went wrong” message.
  * Optionally let users retry or continue using other parts.

Analogy: Like a **try/catch** but at the **component level**.

---

## 3. What are Error Boundaries?

* **Special React components** that catch errors in:

  * Rendering
  * Lifecycle methods
  * Constructor of child components
* Provide a **fallback UI** instead of crashing.

⚠️ **What Error Boundaries CANNOT catch**:

* Errors inside event handlers.
* Asynchronous errors (`setTimeout`, Promises).
* Server-side rendering errors.
* Errors inside the error boundary itself.

---

## 4. Creating an Error Boundary

Error Boundaries must be **class components** (as of React 18).

🔹 Example:

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Optional: log error details
  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong 😢</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

👉 Key methods:

* `getDerivedStateFromError` → updates state to trigger fallback.
* `componentDidCatch` → logs error details.

---

## 5. Using Error Boundaries

Wrap risky components inside `<ErrorBoundary>`.

```jsx
import ErrorBoundary from "./ErrorBoundary";
import FaultyComponent from "./FaultyComponent";

export default function App() {
  return (
    <div>
      <h1>App with Error Boundaries</h1>
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    </div>
  );
}
```

👉 Now, instead of crashing, only the **FaultyComponent area** shows fallback UI.

---

## 6. Best Practices

✅ Use **multiple error boundaries** at different levels:

* One **global boundary** at the root.
* Local boundaries for risky components (e.g., charts, ads, 3rd-party widgets).

✅ Provide **user-friendly fallback UI**:

```jsx
render() {
  if (this.state.hasError) {
    return (
      <div>
        <h2>Oops! Something went wrong.</h2>
        <button onClick={() => window.location.reload()}>Reload App</button>
      </div>
    );
  }
  return this.props.children;
}
```

✅ Integrate with **logging services** (Sentry, LogRocket, etc.) inside `componentDidCatch`.

---

## 7. Error Boundaries vs Try/Catch

* **Error Boundaries** → for rendering errors in components.
* **try/catch** → for synchronous logic like event handlers.

🔹 Example of try/catch inside event handler:

```jsx
function Button() {
  const handleClick = () => {
    try {
      throw new Error("Event error!");
    } catch (e) {
      console.error("Caught locally:", e);
    }
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

## 8. Error Boundaries in React 18

* Still **class-only** (no hook yet).
* Work well with **Concurrent Rendering**.
* Can be combined with **React.Suspense** for async fallbacks.

---

## 9. Hands-on Demos / Exercises

### 📝 Exercise 1: Basic Boundary

* Create a `FaultyComponent` and wrap with `ErrorBoundary`.

### 📝 Exercise 2: Multiple Boundaries

* Wrap only part of the UI (like a chart component).
* Show that only that part crashes, not the whole app.

### 📝 Exercise 3: Retry Button

* Modify fallback UI to include a **retry** or **reload** option.

### 📝 Exercise 4: Logging

* Log errors to `console` first, then mock integration with a logging service.

---

## 10. Wrap Up (Key Takeaways)

1. **Error Boundaries prevent app-wide crashes** by isolating faulty components.
2. Must be **class components** (React 18).
3. Use **multiple localized boundaries** for better resilience.
4. Combine with **fallback UI + error logging** for production apps.

---

