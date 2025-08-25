import React, { Suspense } from "react";
// Lazy load the component
const About = React.lazy(() => import("./About"));
const Lazy = () => {
  return (
    <div>
      <h1>Welcome to My App 🚀</h1>

      {/* Suspense shows fallback UI until About loads */}
      <Suspense fallback={<p>Loading About page...</p>}>
        <About />
      </Suspense>
    </div>
  );
}

export default Lazy