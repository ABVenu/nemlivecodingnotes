// app/dashboard/page.js

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <h1>Access Denied, This is server side protection</h1>
  }

  return <h1>Welcome {session.user.name}, This is server side protection</h1>
}