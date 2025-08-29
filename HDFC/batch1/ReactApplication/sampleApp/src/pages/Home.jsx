// src/pages/Home.jsx
import HeroSection from "@/components/HeroSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section className="py-16 px-6 container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why TodosApp?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          TodosApp helps you manage your daily tasks effortlessly with an intuitive interface,
          authentication system, and a clean design. Stay on top of your work and life.
        </p>
      </section>
    </main>
  )
}
