
### `App.jsx`

```jsx
import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import TodoApp from "./Todo";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username === "admin") onLogin(true);
  };

  return (
    <div data-testid="login-page">
      <h1>Login</h1>
      <input
        data-testid="username-input"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button data-testid="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div>
      <nav data-testid="navbar">
        <Link to="/">Login</Link> | <Link to="/todos">Todos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login onLogin={setIsAuth} />} />
        <Route
          path="/todos"
          element={isAuth ? <TodoApp /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}
```

---

### ✅ Example `Todo.jsx`

```jsx
export default function TodoApp() {
  return (
    <div data-testid="todo-page">
      <h1>Todo App</h1>
    </div>
  );
}
```

---

### ✅ `App.test.jsx` (Vitest + RTL with hooks)

```jsx
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Utility: render with initial route
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("App Routing and Authentication", () => {
  beforeAll(() => {
    console.log("🔧 Starting App tests with data-testid selectors...");
  });

  afterAll(() => {
    console.log("✅ Completed all App tests.");
  });

  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
  });

  it("renders login page by default", () => {
    renderWithRouter(<App />, { route: "/" });
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("prevents unauthenticated access to /todos", () => {
    renderWithRouter(<App />, { route: "/todos" });
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("logs in as admin and navigates to /todos", async () => {
    renderWithRouter(<App />, { route: "/" });

    const input = screen.getByTestId("username-input");
    const button = screen.getByTestId("login-btn");

    // Wrong user first
    fireEvent.change(input, { target: { value: "user" } });
    fireEvent.click(button);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();

    // Correct user: admin
    fireEvent.change(input, { target: { value: "admin" } });
    fireEvent.click(button);

    // Click on Todos link
    const todosLink = screen.getByText(/todos/i);
    fireEvent.click(todosLink);

    expect(await screen.findByTestId("todo-page")).toBeInTheDocument();
  });

  it("redirects back to login if not authenticated", () => {
    renderWithRouter(<App />, { route: "/todos" });
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });
});
```

---

