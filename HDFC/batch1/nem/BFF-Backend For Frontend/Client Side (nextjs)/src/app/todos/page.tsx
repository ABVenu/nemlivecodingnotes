"use client";

import { useEffect, useState } from "react";

type Todo = {
  _id: string;
  text: string;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data.todos));
  }, []);

  async function addTodo() {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });

    if (res.ok) {
      const added: Todo = await res.json();
      setTodos([...todos, added]);
      setNewTodo("");
    }
  }

  return (
    <div>
      <h1>My Todos</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <hr />
      <ul>
        {todos?.map((t,i) => (
          <li key={t._id} >{t.title}</li>
        ))}
      </ul>
      
    </div>
  );
}
