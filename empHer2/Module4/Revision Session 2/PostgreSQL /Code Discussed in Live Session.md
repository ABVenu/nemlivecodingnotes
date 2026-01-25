
MarkLiveEdit
Markdown Live editor


Editor








## User–Todo Management System
### (Node + Express + Supabase)

---

# 📁 Project Structure

```bash
user-todo-app/
│
├── db.js
├── .env
├── server.js
│
├── routes/
│   ├── user.routes.js
│   └── todo.routes.js
│
├── controllers/
│   ├── user.controller.js
│   └── todo.controller.js
```

---

# 1️⃣ Supabase Database Setup (SQL Editor)

Run this inside **Supabase → SQL Editor**

---

## ✅ Users Table

```sql
create extension if not exists "uuid-ossp";

create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  password text not null,
  created_at timestamp default now()
);
```

---

## ✅ Todos Table (with CASCADE)

```sql
create table todos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  is_completed boolean default false,
  user_id uuid references users(id) on delete cascade,
  created_at timestamp default now()
);
```

### ⭐ Important Line

```
on delete cascade
```

This ensures:

> **Deleting a user automatically deletes all their todos.**

---

# 2️⃣ Node Setup

---

### Install Packages

```bash
npm init -y
npm install express dotenv @supabase/supabase-js cors
```

---

# 3️⃣ Environment Variables

### `.env`

```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_service_role_key
PORT=3000
```

⚠️ Use **SERVICE ROLE KEY** (not anon).

---

# 4️⃣ Supabase Client

### `db.js`

```js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
```

---

# 5️⃣ Express Entry

### `server.js`

```js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => console.log("Server running"));
```

---

# 6️⃣ User Signup

---

### `routes/user.routes.js`

```js
import express from "express";
import { signupUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.delete("/:id", deleteUser);

export default router;
```

---

### `controllers/user.controller.js`

```js
import { supabase } from "../db.js";

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const { data: existing } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (existing)
    return res.status(409).json({ message: "Email already exists" });

  const { data, error } = await supabase.from("users").insert([
    { name, email, password }
  ]);

  if (error) return res.status(500).json(error);

  res.json({ message: "User created" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) return res.status(400).json(error);

  res.json({ message: "User + Todos deleted" });
};
```

---

# 7️⃣ Todo CRUD

---

### `routes/todo.routes.js`

```js
import express from "express";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add-todo", addTodo);
router.get("/get-my-todo/:userId", getTodos);
router.put("/update-todo/:todoId", updateTodo);
router.delete("/delete-todo/:todoId", deleteTodo);

export default router;
```

---

### `controllers/todo.controller.js`

```js
import { supabase } from "../db.js";

export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId)
    return res.status(400).json({ message: "Missing fields" });

  const { error } = await supabase.from("todos").insert([
    { title, description, user_id: userId }
  ]);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo added" });
};

export const getTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { title, description, is_completed } = req.body;

  const { error } = await supabase
    .from("todos")
    .update({ title, description, is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo updated" });
};

export const toggleTodoStatus = async (req, res) => {
  const { todoId } = req.params;

  // 1. Fetch current status
  const { data: todo, error: fetchError } = await supabase
    .from("todos")
    .select("is_completed")
    .eq("id", todoId)
    .single();

  if (fetchError || !todo)
    return res.status(404).json({ message: "Todo not found" });

  // 2. Toggle
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !todo.is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Status toggled" });
};
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase.from("todos").delete().eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo deleted" });
};
```

---

# 🧪 Testing Order (Postman)

1️⃣ Signup User
`POST /users/signup`

2️⃣ Create Todo
`POST /todos/add-todo`

3️⃣ Get Todos
`GET /todos/get-my-todo/:userId`

4️⃣ Delete User
`DELETE /users/:id`

👉 Verify:

```
todos table becomes EMPTY automatically
```

That proves **CASCADE works**.

---


5,945 characters
Preview




User–Todo Management System
(Node + Express + Supabase)
📁 Project Structure
user-todo-app/
│
├── db.js
├── .env
├── server.js
│
├── routes/
│   ├── user.routes.js
│   └── todo.routes.js
│
├── controllers/
│   ├── user.controller.js
│   └── todo.controller.js
1️⃣ Supabase Database Setup (SQL Editor)
Run this inside Supabase → SQL Editor

✅ Users Table
create extension if not exists "uuid-ossp";

create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  password text not null,
  created_at timestamp default now()
);
✅ Todos Table (with CASCADE)
create table todos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  is_completed boolean default false,
  user_id uuid references users(id) on delete cascade,
  created_at timestamp default now()
);
⭐ Important Line
on delete cascade
This ensures:

Deleting a user automatically deletes all their todos.

2️⃣ Node Setup
Install Packages
npm init -y
npm install express dotenv @supabase/supabase-js cors
3️⃣ Environment Variables
.env
SUPABASE_URL=your_url
SUPABASE_KEY=your_service_role_key
PORT=3000
⚠️ Use SERVICE ROLE KEY (not anon).

4️⃣ Supabase Client
db.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
5️⃣ Express Entry
server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => console.log("Server running"));
6️⃣ User Signup
routes/user.routes.js
import express from "express";
import { signupUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.delete("/:id", deleteUser);

export default router;
controllers/user.controller.js
import { supabase } from "../db.js";

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const { data: existing } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (existing)
    return res.status(409).json({ message: "Email already exists" });

  const { data, error } = await supabase.from("users").insert([
    { name, email, password }
  ]);

  if (error) return res.status(500).json(error);

  res.json({ message: "User created" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) return res.status(400).json(error);

  res.json({ message: "User + Todos deleted" });
};
7️⃣ Todo CRUD
routes/todo.routes.js
import express from "express";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add-todo", addTodo);
router.get("/get-my-todo/:userId", getTodos);
router.put("/update-todo/:todoId", updateTodo);
router.delete("/delete-todo/:todoId", deleteTodo);

export default router;
controllers/todo.controller.js
import { supabase } from "../db.js";

export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId)
    return res.status(400).json({ message: "Missing fields" });

  const { error } = await supabase.from("todos").insert([
    { title, description, user_id: userId }
  ]);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo added" });
};

export const getTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { title, description, is_completed } = req.body;

  const { error } = await supabase
    .from("todos")
    .update({ title, description, is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo updated" });
};

export const toggleTodoStatus = async (req, res) => {
  const { todoId } = req.params;

  // 1. Fetch current status
  const { data: todo, error: fetchError } = await supabase
    .from("todos")
    .select("is_completed")
    .eq("id", todoId)
    .single();

  if (fetchError || !todo)
    return res.status(404).json({ message: "Todo not found" });

  // 2. Toggle
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !todo.is_completed })
    .eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Status toggled" });
};
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase.from("todos").delete().eq("id", todoId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Todo deleted" });
};
🧪 Testing Order (Postman)
1️⃣ Signup User POST /users/signup

2️⃣ Create Todo POST /todos/add-todo

3️⃣ Get Todos GET /todos/get-my-todo/:userId

4️⃣ Delete User DELETE /users/:id

👉 Verify:

todos table becomes EMPTY automatically
That proves CASCADE works.

5,458 characters
About
Contact
Legal
Privacy Policy
GDPR
Made with
by
DigitalPro
