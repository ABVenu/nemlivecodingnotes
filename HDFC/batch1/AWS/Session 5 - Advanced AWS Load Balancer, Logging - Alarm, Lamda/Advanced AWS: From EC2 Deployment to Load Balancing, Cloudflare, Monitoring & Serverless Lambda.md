# 🌩️ AWS Session 5 – Advanced AWS Concepts

### *From EC2 Deployment to Load Balancing, Cloudflare, Monitoring & Serverless Lambda*

---

## 🧩 1️⃣ Understanding EC2 in Depth

### 🔹 What is EC2?

**Amazon Elastic Compute Cloud (EC2)** is the *foundation* of AWS compute infrastructure — it provides **resizable virtual servers** in the cloud.

You can:

* Launch instances (virtual machines)
* Choose OS, storage, and network configuration
* Scale up or down as needed

### 🔹 Core Components of EC2

| Component                      | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| **AMI (Amazon Machine Image)** | Pre-configured template (OS + software). Example: Ubuntu 22.04 AMI.     |
| **Instance Type**              | Defines CPU, RAM, and performance capacity (t2.micro → c6g.large etc.). |
| **EBS (Elastic Block Store)**  | Persistent disk storage attached to EC2.                                |
| **Security Group**             | Acts as a firewall controlling inbound/outbound traffic.                |
| **Elastic IP**                 | Static public IP you can attach to instances.                           |
| **Key Pair**                   | Used for SSH authentication.                                            |
| **VPC & Subnet**               | Network layer that defines how EC2 connects to others.                  |

---

### 🔹 Instance Lifecycle

1. **Launch** → Choose AMI + instance type + key + security group
2. **Running** → Instance is up and accessible
3. **Stopped** → No compute cost, but storage billed
4. **Terminated** → Instance + EBS (optional) deleted

---

### 🔹 Types of Instances

| Category              | Use Case               | Example Type |
| --------------------- | ---------------------- | ------------ |
| **General Purpose**   | Balanced CPU & memory  | t3, t4g, m6g |
| **Compute Optimized** | CPU-heavy workloads    | c5, c6g      |
| **Memory Optimized**  | In-memory caching, DBs | r5, r6g      |
| **Storage Optimized** | Large-scale data I/O   | i3, d2       |
| **GPU Instances**     | ML/AI, rendering       | g4dn, p3     |

---

### 🔹 Pricing Models

| Model              | Description                   | Example                     |
| ------------------ | ----------------------------- | --------------------------- |
| **On-Demand**      | Pay per hour/second           | Ideal for dev/test          |
| **Reserved**       | Commit 1–3 years → cheaper    | Production workload         |
| **Spot Instances** | Unused EC2 at 70–90% discount | Batch/ML jobs               |
| **Savings Plans**  | Flexible pricing model        | Long-term cost optimization |

---

## ⚙️ 2️⃣ Ideal Configuration for a 10K Users Website

### (Handling 100,000 requests/day)

### Step 1: Understand Load

* 100K requests/day = 100,000 / 86,400 ≈ **1.15 requests/second (avg)**.
* Assume **peak = 10x average** → 12 requests/sec.

In real-world web systems:

* Each request may take 50–200 ms.
* Each EC2 instance (2 vCPU, 4 GB RAM) can handle ~100 concurrent requests.

---

### Step 2: Backend Architecture

```
Client → CloudFront/Cloudflare → ALB → EC2 (App) → RDS (DB) → S3 (Static Files)
```

### Step 3: Recommended EC2 Setup

| Component       | Recommended                                 |
| --------------- | ------------------------------------------- |
| Instance Type   | t3.medium (2 vCPU, 4GB RAM)                 |
| Count           | 2 instances (with load balancer)            |
| Auto Scaling    | Min=2, Max=5 (based on CPU > 70%)           |
| Storage         | 20 GB EBS (SSD)                             |
| Network         | In VPC private subnet, ALB in public subnet |
| OS              | Ubuntu 22.04 or Amazon Linux 2              |
| Process Manager | PM2 or Nginx reverse proxy                  |
| Backup          | Daily snapshot of EBS + DB backup in RDS    |

---

### Step 4: Resource Consumption (Approximation)

| Component         | RAM      | CPU    | Storage  |
| ----------------- | -------- | ------ | -------- |
| Node.js (backend) | 1–1.5 GB | 20–30% | —        |
| MongoDB or RDS    | 2–4 GB   | 50%    | 10–20 GB |
| OS + Background   | 0.5 GB   | 10%    | —        |

➡️ **Total**: ~3–4 GB RAM and 2 vCPU is sufficient per instance initially.
Auto Scaling will handle spikes automatically.

---

### Step 5: Scaling Strategy

* Scale **out** (more instances) instead of **up** (bigger instance) for reliability.
* Use **Application Load Balancer (ALB)**.
* Enable **Auto Scaling Group** with health checks.
* Set scaling rule: *Add 1 instance when CPU > 70% for 5 min.*

---

## ⚖️ 3️⃣ Load Balancers – Deep Dive

### 🔹 Why Load Balancer?

Without one:

* All requests → single EC2 → bottleneck, downtime risk.

With load balancer:

* Traffic distributed evenly.
* Handles failover automatically.
* Improves scalability and uptime.

---

### 🔹 How Load Balancing Works (Internals)

1. User hits your domain → DNS resolves to Load Balancer’s IP.
2. Load Balancer receives the HTTP request.
3. It picks a healthy EC2 target from a **target group**.
4. Request is routed and response returned to user.

---

### 🔹 Algorithms Used

| Algorithm             | Description                                   |
| --------------------- | --------------------------------------------- |
| **Round Robin**       | Distributes sequentially across all targets   |
| **Least Connections** | Chooses instance with least active requests   |
| **IP Hash**           | Same client IP always mapped to same instance |

---

### 🔹 Types of AWS Load Balancers

| Load Balancer                       | Layer                | Description                                         | Use Case              |
| ----------------------------------- | -------------------- | --------------------------------------------------- | --------------------- |
| **Application Load Balancer (ALB)** | Layer 7 (HTTP/HTTPS) | Routes based on URL/path/host headers               | Web apps, APIs        |
| **Network Load Balancer (NLB)**     | Layer 4 (TCP/UDP)    | Handles millions of reqs/sec with ultra-low latency | Real-time apps, games |
| **Gateway Load Balancer (GLB)**     | Layer 3 (Network)    | Used with security appliances                       | Firewalls, proxies    |

---

### 🔹 Which One to Use?

| Scenario                   | Recommended LB |
| -------------------------- | -------------- |
| Web App / REST API         | **ALB**        |
| Gaming / Financial Systems | **NLB**        |
| Security Gateway / VPN     | **GLB**        |

---

### 🔹 Health Checks

* Periodic pings (e.g., `/health` endpoint).
* If instance fails, it’s **removed from routing** until healthy again.

---

## ☁️ 4️⃣ Cloudflare – The Edge Shield

### 🔹 What is Cloudflare?

Cloudflare is a **global network** that:

* Speeds up your website (CDN caching)
* Protects from attacks (DDoS, SQLi, etc.)
* Provides **DNS**, **SSL**, **Firewall**, and **Load balancing** features.

---

### 🔹 Core Functions

| Feature                            | Purpose                                                                |
| ---------------------------------- | ---------------------------------------------------------------------- |
| **CDN**                            | Caches static assets (CSS, JS, images) in 300+ edge locations globally |
| **DNS**                            | Super-fast domain resolution (~12ms avg.)                              |
| **DDoS Protection**                | Blocks malicious traffic automatically                                 |
| **WAF (Web Application Firewall)** | Filters threats before reaching AWS                                    |
| **SSL/TLS**                        | Free HTTPS for all requests                                            |
| **Analytics**                      | Tracks traffic, bots, attack logs                                      |

---

### 🔹 How Cloudflare Works

```
User
 ↓
Cloudflare Edge (Cache + WAF + SSL)
 ↓
AWS Load Balancer
 ↓
EC2 Instances (App)
 ↓
Database / S3
```

### 🔹 Why We Need It

* **Performance:** Edge caching reduces latency by 40–70%.
* **Security:** DDoS protection + hiding actual EC2 IP.
* **Reliability:** Automatic rerouting during region failures.
* **Cost-saving:** Fewer requests hit AWS → lower data transfer cost.

---

## 📊 5️⃣ Monitoring, Logging, and Health

### 🔹 Monitoring with CloudWatch

* Monitors metrics for EC2, ALB, Lambda, etc.
* Metrics include:

  * CPUUtilization
  * NetworkIn / NetworkOut
  * RequestCount
  * Latency

### 🔹 Custom Metrics

* You can push app metrics like “activeUsers” or “ordersPlaced”.

Example (Node.js):

```js
const AWS = require("aws-sdk");
const cloudwatch = new AWS.CloudWatch();

await cloudwatch.putMetricData({
  MetricData: [{
    MetricName: "ActiveUsers",
    Unit: "Count",
    Value: 120
  }],
  Namespace: "MyAppMetrics"
}).promise();
```

---

### 🔹 Logging

* **CloudWatch Logs:** Application logs (stdout, errors)
* **ALB Access Logs:** Request logs → S3 bucket
* **RDS Logs:** Query & performance logs
* **Lambda Logs:** Auto-pushed to CloudWatch

---

### 🔹 Alarms & Alerts

Example rules:

* CPU > 80% → Trigger SNS email alert
* Memory > 75% → Scale EC2 instance
* Disk > 90% → Warning notification

---

### 🔹 Health Checks

* Ensures instances are alive.
* Configurable from Load Balancer or Auto Scaling Group.

Example:

```
Health Check URL: /health
Response Code: 200
Interval: 30s
Unhealthy threshold: 3
```

---

## ⚡ 6️⃣ AWS Lambda – Serverless Computing

### 🔹 Concept

Lambda runs your code **without servers**.
You don’t manage EC2, scaling, or provisioning.

### 🔹 Key Properties

| Property                | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| **Event-driven**        | Triggered by events (API Gateway, S3, DynamoDB, etc.)         |
| **Auto-scaling**        | Instantly scales to handle thousands of concurrent executions |
| **Pay-per-use**         | Billed per 100ms of execution                                 |
| **Stateless**           | Each invocation independent                                   |
| **Languages Supported** | Node.js, Python, Java, Go, C#, etc.                           |

---

### 🔹 Typical Use Cases

* API backends (via API Gateway)
* Cron jobs / scheduled tasks
* File processing (image resize, PDF parse)
* Notifications / email triggers
* Lightweight ETL pipelines

---

### 🔹 Lambda Internal Flow

```
Trigger (API Gateway / S3 / EventBridge)
   ↓
Lambda Service loads your function
   ↓
Executes code inside secure runtime sandbox
   ↓
Returns response or triggers next event
```

---

### 🔹 Hands-on Demo: Node.js Lambda Function

**Goal:** Respond with a personalized greeting.

#### Step 1: Code – `index.js`

```js
exports.handler = async (event) => {
  const name = event.queryStringParameters?.name || "World";
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}! This is AWS Lambda in action.`,
    }),
  };
};
```

#### Step 2: Create Function

* Go to **AWS Lambda Console → Create Function → Author from scratch**
* Runtime: **Node.js 18.x**
* Name: `helloLambda`
* Permissions: Create new role with basic Lambda permissions

#### Step 3: Paste code → Deploy → Test

#### Step 4: Add API Gateway Trigger

* Create REST API endpoint for `/hello`
* Deploy → You’ll get public URL like:

  ```
  https://abc123.execute-api.ap-south-1.amazonaws.com/prod/hello?name=Venu
  ```
* Open in browser →
  **Output:** `{ "message": "Hello, Venu! This is AWS Lambda in action." }`

---

## 🧱 7️⃣ Real-World Architecture (Putting It All Together)

```
        +-----------------------+
        |     Cloudflare CDN     |
        |  (DNS + WAF + SSL)     |
        +-----------+-----------+
                    |
                    v
        +-----------------------+
        |  AWS Application LB    |
        |  (Health Checks + SSL) |
        +-----------+-----------+
                    |
         +----------+----------+
         |                     |
  +--------------+     +--------------+
  | EC2 Instance |     | EC2 Instance |
  |  Node.js App |     |  Node.js App |
  +--------------+     +--------------+
          |                    |
          +---------+----------+
                    |
           +------------------+
           | Amazon RDS / S3  |
           +------------------+
                    |
           +------------------+
           | CloudWatch + SNS |
           +------------------+
                    |
           +------------------+
           | Lambda Functions |
           | (Async triggers) |
           +------------------+
```

---

## 🧩 8️⃣ Summary Table

| Concept     | Purpose              | Key AWS Service              |
| ----------- | -------------------- | ---------------------------- |
| Compute     | Running your backend | EC2 / Lambda                 |
| Scalability | Handling load        | ALB + Auto Scaling           |
| Security    | DDoS, Firewall, SSL  | Cloudflare + Security Groups |
| Storage     | Static + Persistent  | S3 + EBS + RDS               |
| Monitoring  | Logs & metrics       | CloudWatch                   |
| Alerts      | Automated responses  | SNS + CloudWatch Alarms      |

---

