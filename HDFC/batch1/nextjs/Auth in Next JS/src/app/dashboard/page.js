"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/test-auth") // redirect if not logged in
//     }
//   }, [status, router])

//   if (status === "loading") return <p>Loading...</p>

//   // ✅ handle null safely
//   if (!session) return <p>Redirecting to login...</p>

  return <h1>Welcome {session.user?.name}</h1>
}
