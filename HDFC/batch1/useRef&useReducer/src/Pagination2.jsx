
import React, { useEffect, useState } from "react";

const Pagination2 = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // items per page

  async function fetchData() {
    let res = await fetch("https://jsonplaceholder.typicode.com/todos");
    let data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate start & end indexes
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedTodos = todos.slice(start, end);

  const totalPages = Math.ceil(todos.length / limit);

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      {/* Todos list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {paginatedTodos?.map((el) => (
          <div
            key={el.id}
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <h4>Title: {el.title}</h4>
            <h4>Status: {el.completed ? "Completed" : "Pending"}</h4>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Prev button */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? "bold" : "normal",
              background: page === i + 1 ? "#ddd" : "white",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination2;
