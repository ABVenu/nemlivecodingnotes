```javascript
let counter = 1;
setInterval(() => {
  console.log(`Counter: ${counter}`);
  counter++;
}, 1000);
```

```Dockerfile
FROM node:22.20.0-alpine
WORKDIR /app
COPY index.js .
CMD ["node", "index.js"]
```
```bash
docker build -t node-docker-test .
docker run node-loop
```

```bash
nvm deactivate
node -v
```

```bash
nvm install 22.20.0
```

### Pushing Into Docker Hub

## **1️⃣ Create a Docker Hub Account**

* Go to [https://hub.docker.com](https://hub.docker.com)
* Sign up for a free account

---

## **2️⃣ Login to Docker Hub from Terminal**

```bash
docker login
```

* Enter **username** and **password**
* You should see: `Login Succeeded`

---

## **3️⃣ Tag Your Local Image**

Docker images are identified by **repository name** and **tag**.
Assuming your local image is `loop-demo`:

```bash
docker tag loop-demo <dockerhub-username>/loop-demo:v1
```

* `<dockerhub-username>` → your Docker Hub username
* `loop-demo` → repository name on Docker Hub
* `v1` → image tag (version)

---

## **Push Image to Docker Hub**

```bash
docker push <dockerhub-username>/loop-demo:v1
```

* Docker uploads your image to Docker Hub
* Once done, anyone can pull it using:

```bash
docker pull <dockerhub-username>/loop-demo:v1
```

---

## **Run the Image from Docker Hub**

```bash
docker run <dockerhub-username>/loop-demo:v1
```

---
1. **Docker Hub acts like GitHub for containers** → share ready-to-run images
2. **No need for Node on host** → container includes everything
3. **Pull & Run** → anyone anywhere can run the same container
4. Tagging with **version** ensures proper version control for images

