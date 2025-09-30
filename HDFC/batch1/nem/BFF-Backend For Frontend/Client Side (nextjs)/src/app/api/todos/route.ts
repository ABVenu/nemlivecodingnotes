import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = req.headers.get("cookie") || "";
  const token = cookieStore
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
//console.log("cookieStore", cookieStore)
//console.log("token from cookie", token)
  const res = await fetch(`${process.env.BACKEND_URL}/users/todos/mytodos`, {
    headers: { authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  console.log("data in nxt", data)
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = req.headers.get("cookie") || "";
  const token = cookieStore
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
console.log("body in nxt", body)
  const res = await fetch(`${process.env.BACKEND_URL}/users/todos/add-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log("data in nxt", data)
  return NextResponse.json(data, { status: res.status });
}
