"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function TestAuth() {
    const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>


  // Rendering 1 
  if (session) {
    return (
      <div>
        <p>✅ Logged in as {session.user.name} ({session.user.role})</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

   /// Main Rendering
  return (
    <div>
      <p>❌ Not signed in</p>
      <button onClick={() => signIn("credentials", { email: "admin@test.com", password: "1234" })}>
        Sign in with Credentials
      </button>
      <br />
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  )
}
