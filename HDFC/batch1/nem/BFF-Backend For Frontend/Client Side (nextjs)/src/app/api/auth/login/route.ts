import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Forward to your Express backend
  const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  // Store JWT in HttpOnly cookie (secure for CSRF)
  if (res.ok && data.token) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return response;
  }

  return NextResponse.json(data, { status: res.status });
}
