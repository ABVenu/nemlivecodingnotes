`zod` is a **TypeScript-first schema validation library** that works beautifully in **React** for form validation, API response validation, or any runtime data validation.

Here’s a step-by-step guide on how to use **Zod in React**:

---

## 1. Install Zod

```bash
npm install zod
```

---

## 2. Basic Example (Validate form input in React)

```jsx
import React, { useState } from "react";
import { z } from "zod";

// ✅ Define schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Safe parse user input
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // Map Zod errors into a usable format
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
    } else {
      setErrors({});
      alert("Login Success ✅");
      console.log(result.data); // validated data
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email-input"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          data-testid="password-input"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit" data-testid="submit-btn">Login</button>
    </form>
  );
}
```

---

## 3. With React Hook Form (Best Practice 🎯)

If you’re using `react-hook-form`, Zod integrates **seamlessly** with `@hookform/resolvers`.

```bash
npm install react-hook-form @hookform/resolvers
```

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Define schema
const schema = z.object({
  username: z.string().min(3, "Username too short"),
  age: z.number().min(18, "Must be at least 18"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Valid Data ✅", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username: </label>
        <input {...register("username")} />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
      </div>

      <div>
        <label>Age: </label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

---

## 4. Other Use Cases

* **API Response Validation**

```js
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

fetch("/api/user")
  .then(res => res.json())
  .then(data => {
    const parsed = userSchema.parse(data); // throws if invalid
    console.log(parsed);
  });
```

* **Optional / Default Values**

```js
const schema = z.object({
  nickname: z.string().optional(),
  role: z.string().default("user"),
});
```

---

✅ **Key Takeaway**:

* `zod` lets you **define schema once** and use it everywhere (forms, APIs, validation).
* In React, you can use it manually (`safeParse`) or integrate with `react-hook-form` (best DX).

---


