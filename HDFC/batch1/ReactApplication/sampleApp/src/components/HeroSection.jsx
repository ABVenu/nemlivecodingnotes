// src/components/HeroSection.jsx
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-50 via-white to-purple-50 px-6">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Organize Your Day with <span className="text-blue-600">TodosApp</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        A simple yet powerful todos application with authentication. Track tasks, stay productive, and never miss a deadline again.
      </p>
      <div className="flex gap-4">
        <Link to="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" size="lg">Login</Button>
        </Link>
      </div>
    </section>
  )
}
