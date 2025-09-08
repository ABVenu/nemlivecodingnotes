// app/layout.js
export const metadata = {
  title: "My Next App",
  description: "Learning Next.js Layouts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>
        <header style={{ background: "#333", color: "#fff", padding: "1rem" }}>
          <h1>🌐 My App</h1>
          <nav>
            {/* <a href="/" style={{ color: "white", marginRight: "1rem" }}>Home</a>
            <a href="/dashboard" style={{ color: "white", marginRight: "1rem"}}>Dashboard</a>
             <a href="/todos" style={{ color: "white", marginRight: "1rem"}}>Todos</a>
             <a href="/aboutus" style={{ color: "white", marginRight: "1rem"}}>About Us</a>
             <a href="/contactus" style={{ color: "white", marginRight: "1rem"}}>Contact Us</a> */}
          </nav>
        </header>
        <main style={{ padding: "1rem" }}>{children}</main>
        <footer style={{ background: "#eee", padding: "1rem", marginTop: "2rem" }}>
          © 2025 My App
        </footer>
      </body>
    </html>
  );
}