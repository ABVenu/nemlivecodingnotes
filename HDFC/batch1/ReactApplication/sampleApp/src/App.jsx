// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Users from "./features/users/Users"
import Todos from "./features/todos/Todos"

function App() {
  return (

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todos" element={<Todos />} />
          </Routes> 
        </div>
        <Footer />
        {/* <Users /> */}
      </div>

  )
}

export default App
