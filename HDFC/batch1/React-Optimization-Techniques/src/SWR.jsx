
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SWR = () => {
  const [page, setPage] = useState(1);
  
  console.time("SWR")
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`,
    fetcher
  );
  console.timeEnd("SWR")

  if (error) return <div>❌ Failed to load</div>;
  if (isLoading) return <div>⏳ Loading...</div>;

  return (
    <div>
      <h1>Posts - Page {page}</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
};

export default SWR;

