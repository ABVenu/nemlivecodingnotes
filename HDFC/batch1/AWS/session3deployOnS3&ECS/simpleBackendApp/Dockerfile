# ---------------------------
# 1️⃣ Base image
# ---------------------------
FROM node:18

# ---------------------------
# 2️⃣ Set working directory
# ---------------------------
# WORKDIR /app

# ---------------------------
# 3️⃣ Copy package.json and install deps
# ---------------------------
COPY package*.json ./
RUN npm install

# ---------------------------
# 4️⃣ Copy all project files
# ---------------------------
COPY . .

# ---------------------------
# 5️⃣ Expose backend port
# ---------------------------
EXPOSE 8080

# ---------------------------
# 6️⃣ Run the server
# ---------------------------
CMD ["node", "server.js"]
