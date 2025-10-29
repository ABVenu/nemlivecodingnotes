// Replace this with your ECS backend public URL
//const API_BASE = "http://localhost:8080";
const API_BASE = "http://13.61.33.227:8080"
// -------------- SIGNUP ----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const profilePic = document.getElementById("signupPic").files[0];

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePic", profilePic);

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) window.location.href = "index.html";
    } catch (err) {
      alert("Signup failed");
    }
  });
}

// -------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "welcome.html";
      }
    } catch (err) {
      alert("Login failed");
    }
  });
}

// -------------- WELCOME PAGE ----------------
const welcomeText = document.getElementById("welcomeText");
const profileImage = document.getElementById("profileImage");
if (welcomeText && profileImage) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "index.html";
  } else {
    welcomeText.textContent = `Welcome, ${user.email}`;
    profileImage.src = user.profilePic;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
