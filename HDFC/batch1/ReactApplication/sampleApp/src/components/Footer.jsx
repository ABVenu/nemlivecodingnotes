// src/components/Footer.jsx
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10 border-t">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600">© {new Date().getFullYear()} TodosApp. All rights reserved.</p>

        <div className="flex gap-6 text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/signup" className="hover:text-blue-600">Signup</Link>
        </div>
      </div>
    </footer>
  )
}
