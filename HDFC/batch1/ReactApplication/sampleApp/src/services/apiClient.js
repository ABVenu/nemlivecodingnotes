import { BACKEND_API } from "@/config";

export async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${BACKEND_API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  let data = await res.json();
  ///console.log("data from apiclient",data)
  return data
}

export async function apiPost(endpoint, body, headers = {}) {
  const res = await fetch(`${BACKEND_API}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API POST error: ${res.status}`);
  }
  return await res.json();
}