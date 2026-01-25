
## 🚀 Supabase JS Client Cheat Sheet

Assume:

```js
import { supabase } from "./db.js";
```

---

### ✅ BASIC CRUD

---

### 📥 SELECT (Read)

### Get all rows

```js
supabase.from("todos").select("*");
```

---

### Get specific columns

```js
supabase.from("todos").select("id,title");
```

---

### Get single row

```js
supabase.from("todos").select("*").eq("id", todoId).single();
```

---

### LIMIT

```js
supabase.from("todos").select("*").limit(5);
```

---

### ORDER

```js
supabase.from("todos").select("*").order("created_at", { ascending: false });
```

---

### ➕ INSERT (Create)

```js
supabase.from("todos").insert([
  { title: "Task", user_id }
]);
```

Return inserted row:

```js
supabase.from("todos")
  .insert([{ title, user_id }])
  .select()
  .single();
```

---

### ✏ UPDATE

```js
supabase.from("todos")
  .update({ title: "New" })
  .eq("id", todoId);
```

---

### ❌ DELETE

```js
supabase.from("todos")
  .delete()
  .eq("id", todoId);
```

---

### ✅ FILTERS (WHERE CLAUSES)

---

### Equal

```js
.eq("user_id", userId)
```

---

### Not equal

```js
.neq("is_completed", true)
```

---

### IN

```js
.in("id", [1,2,3])
```

---

### Greater / Less

```js
.gt("created_at", "2025-01-01")
.lt("count", 10)
```

---

### LIKE (search)

```js
.ilike("title", "%todo%")
```

---

### ✅ UPSERT (Insert or Update)

Mongo equivalent: `updateOne({},{upsert:true})`

```js
supabase.from("todos").upsert({
  id: todoId,
  title: "Task"
});
```

---

### ✅ COUNT

```js
supabase.from("todos").select("*", { count: "exact" });
```

---

### ✅ EXISTS CHECK

```js
supabase.from("users")
  .select("id")
  .eq("email", email)
  .single();
```

---

### ✅ JOINS / NESTED DATA

---

### User with todos

```js
supabase.from("users").select(`
  id,
  name,
  todos(title,is_completed)
`);
```

---

### ✅ PAGINATION

```js
supabase.from("todos")
  .select("*")
  .range(0,9);
```

---

### ✅ TRANSACTIONS (Advanced)

Supabase doesn’t expose explicit transactions in JS.

You use:

### SQL function (RPC)

```sql
create function my_tx() returns void as $$
begin
  -- multiple operations
end;
$$ language plpgsql;
```

Then:

```js
supabase.rpc("my_tx");
```

---

### ✅ RAW SQL (RPC)

Call stored procedures:

```js
supabase.rpc("get_user_todos", { uid: userId });
```

---

### ✅ AUTH (if used)

```js
supabase.auth.signUp()
supabase.auth.signInWithPassword()
supabase.auth.getUser()
```

---

### ✅ STORAGE

```js
supabase.storage.from("bucket").upload()
supabase.storage.from("bucket").download()
```

---

### ✅ REALTIME

```js
supabase.channel("todos")
  .on("postgres_changes", ...)
```

---

### 🧠 Mongo → Supabase Mapping 

| Mongo       | Supabase          |
| ----------- | ----------------- |
| find()      | select()          |
| findOne()   | select().single() |
| create()    | insert()          |
| updateOne() | update()          |
| deleteOne() | delete()          |
| populate()  | nested select     |
| upsert      | upsert            |
| schema      | table             |
| ObjectId    | UUID              |

---

# 🔥 Golden Rule

Supabase client is a **query builder**, not ORM.

No:

❌ `.save()`
❌ document mutation
❌ nested schemas

Only:

✔ explicit queries

---

# One killer interview line

> Supabase JS is a thin SQL query builder, not an ORM like Mongoose.

---

# Summary

You mainly use:

```bash
from()
select()
insert()
update()
delete()
eq()
single()
order()
limit()
upsert()
rpc()
```

Everything else is built on these.

---
