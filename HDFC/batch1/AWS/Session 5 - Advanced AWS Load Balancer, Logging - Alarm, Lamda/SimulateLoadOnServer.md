
## **Test API with Load**
### 🧪 1️⃣ Using **`hey`** (Simplest Option)

**💡 Recommended for beginners — very easy to install and use.**

### 🔧 Installation

#### 🖥️ On macOS (using Homebrew)

```bash
brew install hey
```

#### 💻 On Linux

```bash
sudo apt-get update
sudo apt-get install hey
```

(if not available, use:)

```bash
go install github.com/rakyll/hey@latest
```

#### 🪟 On Windows

Download from the official GitHub releases page:
👉 [https://github.com/rakyll/hey/releases](https://github.com/rakyll/hey/releases)
Extract and add it to your system PATH.

---

### ▶️ Usage

```bash
hey -z 60s -c 50 "http://<your-public-url>/test"
```

**Explanation:**

| Flag     | Meaning                                |
| -------- | -------------------------------------- |
| `-z 60s` | Duration → run for 60 seconds          |
| `-c 50`  | 50 concurrent users (connections)      |
| URL      | Your ECS/EC2 public endpoint (`/test`) |

**Result:**
It’ll show summary output like requests/sec, average latency, error % etc.
Meanwhile, your ECS CPU will spike 🚀 — you can watch it on **CloudWatch → ECS Service → Metrics → CPUUtilization**.

---

# 🧪 2️⃣ Using **`wrk`** (More Powerful Option)

**💡 Ideal if you want advanced load profiles or Lua scripting — but setup is slightly heavier.**

### 🔧 Installation

#### 🖥️ On macOS

```bash
brew install wrk
```

#### 💻 On Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev git -y
git clone https://github.com/wg/wrk.git
cd wrk
make
sudo cp wrk /usr/local/bin
```

#### 🪟 On Windows

Use WSL (Windows Subsystem for Linux) and follow the Linux commands above.

---

### ▶️ Usage

```bash
wrk -t4 -c100 -d30s "http://<your-public-url>/test"
```

**Explanation:**

| Flag    | Meaning                 |
| ------- | ----------------------- |
| `-t4`   | 4 threads               |
| `-c100` | 100 open connections    |
| `-d30s` | Run test for 30 seconds |

`wrk` shows more detailed latency distribution and throughput stats.

---

# ✅ Summary Table

| Feature                    | `hey`           | `wrk`                  |
| -------------------------- | --------------- | ---------------------- |
| Ease of installation       | ⭐⭐⭐⭐            | ⭐⭐                     |
| Output simplicity          | Easy & readable | More detailed          |
| Supports Mac/Linux/Windows | ✅               | ✅ (via WSL on Windows) |
| Great for demos            | ✅✅✅             | ✅✅                     |
| CPU stress effect          | Excellent       | Excellent              |

---

# 🚀 Recommendation

For your **classroom demo**, use:

```bash
hey -z 60s -c 50 "http://<ECS-public-URL>/test"
```

