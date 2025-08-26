

### **Styling with Tailwind CSS**

---

## 🔹 1. Introduction

* **Tailwind CSS** is a **utility-first CSS framework**.
* Instead of writing custom CSS, you compose styles using **predefined utility classes**.
* Example:

  ```html
  <!-- Without Tailwind -->
  <button class="btn-primary">Click</button>

  <!-- With Tailwind -->
  <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Click</button>
  ```

👉 Here, `px-4 py-2` = padding, `bg-blue-500` = background, `rounded-lg` = border radius.

---


## 🔹 3. Core Utility Classes

### 🎨 Colors

* `bg-{color}-{shade}` → background
* `text-{color}-{shade}` → text
* `border-{color}-{shade}` → border

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Primary Button
</button>
<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
  Danger Button
</button>
```

---

### 🔠 Typography

```jsx
<h1 className="text-4xl font-bold text-gray-800">Heading</h1>
<p className="text-lg text-gray-600 leading-relaxed">
  This is a paragraph with larger text and relaxed line height.
</p>
```

---

### 📏 Spacing

* `p` → padding, `m` → margin
* `px` / `py` → horizontal/vertical padding
* `space-x-*` / `space-y-*` → spacing between elements

```jsx
<div className="p-4 m-4 bg-gray-100">
  Box with padding and margin
</div>

<div className="flex space-x-4">
  <span className="bg-blue-200 p-2">Item 1</span>
  <span className="bg-blue-300 p-2">Item 2</span>
</div>
```

---

### 🟦 Borders & Radius

```jsx
<div className="border border-gray-400 rounded-lg p-4">
  Rounded box with border
</div>
```

---

### 🌑 Shadows & Gradients

```jsx
<div className="p-6 shadow-lg rounded bg-gradient-to-r from-blue-400 to-purple-500 text-white">
  Gradient Card with Shadow
</div>
```

---

## 🔹 4. Layout with Flex & Grid

### Flexbox

```jsx
<div className="flex justify-between items-center p-4 bg-gray-200">
  <div>Logo</div>
  <div className="flex space-x-4">
    <a href="#">Home</a>
    <a href="#">About</a>
  </div>
</div>
```

### Grid

```jsx
<div className="grid grid-cols-3 gap-4 p-4">
  <div className="bg-red-200 p-4">1</div>
  <div className="bg-blue-200 p-4">2</div>
  <div className="bg-green-200 p-4">3</div>
</div>
```

---

## 🔹 5. Responsive Design

Tailwind uses **mobile-first breakpoints**:

* `sm:` → ≥640px
* `md:` → ≥768px
* `lg:` → ≥1024px
* `xl:` → ≥1280px

```jsx
<div className="text-sm md:text-lg lg:text-2xl">
  Responsive Text
</div>

<button className="bg-blue-500 text-white p-2 w-full md:w-auto">
  Responsive Button
</button>
```

---

## 🔹 6. Pseudo States

* `hover:` → on hover
* `focus:` → on focus
* `active:` → on click
* `disabled:` → when disabled

```jsx
<input
  type="text"
  placeholder="Enter text"
  className="border p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
/>
```

---

## 🔹 7. Dark Mode

Enable in `tailwind.config.js`:

```js
darkMode: "class"
```

Example:

```jsx
<div className="bg-white text-black dark:bg-gray-900 dark:text-white p-4">
  Dark mode box
</div>
```

---

## 🔹 8. Example: Profile Card

```jsx
export default function ProfileCard() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/400"
        alt="Profile"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">Jane Doe</h2>
        <p className="text-gray-600">Software Engineer</p>
        <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Follow
        </button>
      </div>
    </div>
  )
}
```

---

## 🔹 9. Best Practices

✅ Group related classes logically (spacing → typography → color → effects)
✅ Use `@apply` for very repeated styles
✅ Don’t overuse — keep classes readable
✅ Use responsive + dark mode classes for better UX

---

