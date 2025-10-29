import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import AWS from "aws-sdk";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
const USERS_FILE = path.join(__dirname, "users.json");

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer setup (temporary local storage)
const upload = multer({ dest: "uploads/" });

// Utility to read and write users.json
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data || "[]");
};
const writeUsers = (data) =>
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));

// ✅ SIGNUP
app.post("/signup", upload.single("profilePic"), async (req, res) => {
  const { email, password } = req.body;
  const file = req.file;

  if (!email || !password || !file)
    return res.status(400).json({ message: "All fields are required" });

  let users = readUsers();
  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "Email already registered" });

  // Upload image to S3
  const fileContent = fs.readFileSync(file.path);
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: `profilePics/${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ACL: "public-read",
  };

  try {
    const uploadResult = await s3.upload(s3Params).promise();
    const newUser = {
      email,
      password,
      profilePic: uploadResult.Location,
    };
    users.push(newUser);
    writeUsers(users);

    // Cleanup local file
    fs.unlinkSync(file.path);

    res.json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading to S3" });
  }
});

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(404).json({ message: "Please signup first" });
  if (user.password !== password)
    return res.status(401).json({ message: "Incorrect password" });

  res.json({ message: "Login successful", user });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to AWS ECR-ECS Backend!");
});

app.get("/test", (req, res) => {
  res.send("Welcome to AWS ECR-ECS Backend!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
