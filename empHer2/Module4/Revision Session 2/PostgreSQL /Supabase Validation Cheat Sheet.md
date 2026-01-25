# 🧾 PostgreSQL / Supabase Validation Cheat Sheet

(All written inside `CREATE TABLE` or `ALTER TABLE`)

---

# ✅ NOT NULL

(Mongoose: `required: true`)

```sql
name text not null
```

Prevents empty values.

---

# ✅ UNIQUE

(Mongoose: `unique: true`)

```sql
email text unique
```

No duplicates allowed.

---

# ✅ PRIMARY KEY

```sql
id uuid primary key
```

Automatically:

✔ unique
✔ not null
✔ indexed

---

# ✅ DEFAULT

```sql
is_completed boolean default false
```

Used when value not provided.

---

# ✅ FOREIGN KEY

(Relationship)

```sql
user_id uuid references users(id)
```

Prevents orphan records.

---

# ✅ CASCADE DELETE

```sql
user_id uuid references users(id) on delete cascade
```

Deletes children automatically.

---

# ✅ CHECK Constraint

(Custom rules)

---

### Example: password length

```sql
password text check (length(password) >= 6)
```

---

### Example: age must be positive

```sql
age int check (age > 0)
```

---

### Enum-style values

```sql
status text check (status in ('open','closed'))
```

---

# ✅ ENUM Type (alternative)

```sql
create type todo_status as enum ('open','done');
```

Then:

```sql
status todo_status
```

---

# ✅ GENERATED COLUMN

```sql
full_name text generated always as (first || ' ' || last) stored
```

Auto-calculated.

---

# ✅ INDEX

(Not validation but performance)

```sql
create index on todos(user_id);
```

---

# ✅ NOT VALID (advanced)

Add constraint without checking old data:

```sql
alter table todos
add constraint chk check (...) not valid;
```

Validate later.

---

# ✅ ALTER TABLE (migrations)

---

Add column:

```sql
alter table todos add column assignee uuid;
```

---

Make column required:

```sql
alter table todos alter column assignee set not null;
```

---

Drop column:

```sql
alter table todos drop column assignee;
```

---

Add unique later:

```sql
alter table users add constraint unique_email unique(email);
```

---
# 🔥 Interview Gold Line

> In SQL, validation is enforced at database level using constraints, not application schemas.
---

# Example Full Users Table

```sql
create table users (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text unique not null,
 password text check (length(password)>=6),
 created_at timestamp default now()
);
```

