 // app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div style={{ minHeight: "80vh" }}>
      <h5 style={{backgroundColor:"lightgray", padding:"20px", display:"flex", gap:"30px"}}>
        This layout of categories page
      </h5>
     
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}