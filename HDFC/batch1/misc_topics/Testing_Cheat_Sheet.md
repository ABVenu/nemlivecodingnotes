
# React Testing Library + Vitest Cheat Sheet

---

## 📦 Setup

```js
// vitest.config.js
export default {
  test: {
    globals: true,   // allows `describe`, `it`, etc. without import
    environment: "jsdom", // required for React DOM testing
  },
};
```

---

## 🛠 Common Imports

```js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // better than fireEvent
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
```

---

## 🧩 render()

Render your component for testing:

```js
render(<MyComponent />);
```

With wrapper (router, provider, etc.):

```js
render(
  <MemoryRouter initialEntries={["/"]}>
    <App />
  </MemoryRouter>
);
```

---

## 🔍 Queries (screen.\*)

👉 Prefer **queries by role** or **label** (closest to user interaction).

### By Role (preferred)

```js
screen.getByRole("button", { name: /submit/i }); // exact match
screen.getAllByRole("listitem"); // returns array
```

### By Text

```js
screen.getByText("Hello World");
screen.getByText(/hello/i); // regex
```

### By Label / Placeholder

```js
screen.getByLabelText(/username/i);
screen.getByPlaceholderText(/enter password/i);
```

### By Alt Text (images)

```js
screen.getByAltText(/profile picture/i);
```

### By Display Value

```js
screen.getByDisplayValue("admin"); // for inputs
```

### By Test ID (last resort)

```js
screen.getByTestId("todo-item");
screen.getAllByTestId("todo-item");
```

---

## 🔁 Query Variants

* **getBy**\* → throws error if not found.
* **queryBy**\* → returns `null` if not found (no error).
* **findBy**\* → async, waits until element appears.
* **getAllBy**\* → multiple elements (array).

Example:

```js
expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
const todo = await screen.findByText(/buy milk/i); // async
```

---

## 🖱 Events

### fireEvent (basic)

```js
fireEvent.click(button);
fireEvent.change(input, { target: { value: "hello" } });
```

### userEvent (better, more realistic)

```js
await userEvent.type(input, "hello");
await userEvent.click(button);
await userEvent.tab(); // simulate tab key
await userEvent.keyboard("{enter}"); // press Enter
```

---

## ⏳ Async Helpers

### waitFor

Wait for expectations to pass:

```js
await waitFor(() => {
  expect(screen.getByText(/done/i)).toBeInTheDocument();
});
```

### findBy

Shorthand for async queries:

```js
const todo = await screen.findByText(/milk/i);
```

---

## ✅ Assertions (Matchers from jest-dom)

Install `@testing-library/jest-dom` and Vitest auto-includes matchers.

```js
expect(element).toBeInTheDocument();
expect(element).toHaveTextContent("Hello");
expect(input).toHaveValue("admin");
expect(button).toBeDisabled();
expect(link).toHaveAttribute("href", "/home");
expect(listItems).toHaveLength(3);
expect(img).toHaveAttribute("alt", "avatar");
```

---

## 🔄 Vitest Lifecycle Hooks

```js
beforeAll(() => { /* run once before all tests */ });
afterAll(() => { /* run once after all tests */ });
beforeEach(() => { /* run before every test */ });
afterEach(() => { /* cleanup after every test */ });
```

---

## 🗂 Vitest Test Syntax

```js
describe("MyComponent", () => {
  it("renders properly", () => {
    expect(true).toBe(true);
  });

  test("alias for it", () => {});

  it.skip("skip this test", () => {});
  it.only("run only this test", () => {});
});
```

---

## 🧪 Mocking in Vitest

### Mock a function

```js
const mockFn = vi.fn();
mockFn("hello");
expect(mockFn).toHaveBeenCalledWith("hello");
```

### Mock a module

```js
vi.mock("axios");
import axios from "axios";

axios.get.mockResolvedValue({ data: { id: 1 } });
```

### Spy

```js
const spy = vi.spyOn(console, "log");
console.log("hello");
expect(spy).toHaveBeenCalledWith("hello");
spy.mockRestore();
```

---

## 🌐 Testing Routes

```js
import { MemoryRouter } from "react-router-dom";

render(
  <MemoryRouter initialEntries={["/todos"]}>
    <App />
  </MemoryRouter>
);
```

---

## 🔒 Best Practices

✅ Prefer `getByRole`, `getByLabelText` over `getByTestId`.
✅ Use `userEvent` instead of `fireEvent`.
✅ Use `findBy*` for async UI updates.
✅ Keep tests independent (reset state in `beforeEach`).
✅ Test behavior, not implementation details.

---

### ⚡ Quick Reference Summary

* **Render**: `render()`
* **Queries**: `getBy`, `findBy`, `queryBy` (role, text, label, alt, testId)
* **Events**: `fireEvent`, `userEvent`
* **Async**: `waitFor`, `findBy`
* **Assertions**: `toBeInTheDocument`, `toHaveTextContent`, `toHaveValue`, `toBeDisabled`, `toHaveAttribute`, etc.
* **Vitest**: `describe`, `it`, `expect`, `vi.fn()`, `vi.mock()`, hooks (`beforeAll`, `afterAll`, etc.)


