# 🌐 Web App Authentication - DevOps Showcase 🚀

## 🔥 Overview
This project is an **Angular 15.2.0** based authentication application that demonstrates **DevOps** skills, including:
- 🐳 **Dockerization**
- 🔐 **SSL Configuration**
- ⚙️ **GitHub Actions CI/CD Pipeline**
- ☁️ **Deployment on AWS EC2**

![CI/CD Pipeline](./path-to-your-image.png)

## 📌 Prerequisites
Before running the application, ensure you have the following installed:
✅ **Node.js** (v18.20.3 or later)  
✅ **npm** (Node Package Manager)  
✅ **Docker** (for containerization)  
✅ **AWS EC2 Instance** (for deployment)  

---

## 🏗️ Installation & Running Locally
### 1️⃣ Clone the Repository
```sh
git clone <repo-url>
cd <repo-folder>
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Application
```sh
npm start
```

### 4️⃣ Open the Application in Your Browser
```sh
http://localhost:4200
```

---

## 🐳 Docker Setup
This project includes a **Dockerfile** and **Nginx configuration** for containerization and hosting. 
Since **Auth0 requires HTTPS**, an **SSL certificate** is generated and configured within the EC2 instance.

### 📦 Dockerfile
```dockerfile
# Use Nginx as the base image
FROM nginx:alpine

# Remove default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files
COPY ./dist/web-app-authentication /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY ssl/selfsigned.crt /etc/nginx/ssl/selfsigned.crt 
COPY ssl/selfsigned.key /etc/nginx/ssl/selfsigned.key

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Expose HTTPS and HTTP ports
EXPOSE 443 80
```

### 📜 Nginx Configuration (`nginx.conf`)
```nginx
http {
    include mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name _;

        # Redirect HTTP to HTTPS
        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name _;

        ssl_certificate /etc/nginx/ssl/selfsigned.crt;
        ssl_certificate_key /etc/nginx/ssl/selfsigned.key;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri /index.html;
        }
    }
}
```

---

## ⚙️ Setting Up CI/CD Pipeline with GitHub Actions
This workflow automates building, testing, and pushing the Docker image to **Docker Hub**.

### 🚀 GitHub Actions Workflow (`.github/workflows/main.yml`)
```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.20.3]
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: package-lock.json
      - run: npm ci
      - run: npm run build --if-present

      # Install Chrome dependencies for tests
      - name: Install Chrome dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y fonts-liberation libappindicator3-1 libasound2-dev \
            libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 \
            libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxrandr2 xdg-utils

      # Run tests
      - name: Run tests
        run: npm test -- --watch=false --browsers=ChromeHeadless

      # Docker build and push
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker image
        run: docker build -t ${{ secrets.DOCKER_USERNAME }}/web-app-authentication:latest .

      - name: Push Docker image to Docker Hub
        run: docker push ${{ secrets.DOCKER_USERNAME }}/web-app-authentication:latest
```

---

## ☁️ Deployment on EC2 Instance
### 1️⃣ Create an EC2 Instance (Ubuntu)

### 2️⃣ Install Docker on EC2
```sh
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

### 3️⃣ Generate SSL Certificate on EC2
```sh
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt
```

### 4️⃣ Pull & Run Docker Image
```sh
docker pull <your-docker-username>/web-app-authentication:latest
docker run -d -p 80:80 -p 443:443 <your-docker-username>/web-app-authentication:latest
```

### 5️⃣ Access the Application 🖥️
```sh
https://<EC2_PUBLIC_IP>
```

---

## 🔐 Auth0 Configuration
Since **Auth0** requires a **secure origin (HTTPS)**, configure it in your Auth0 dashboard:

✅ **Allowed Callback URLs:**
```
https://<EC2_PUBLIC_IP>
```
✅ **Allowed Web Origins:**
```
https://<EC2_PUBLIC_IP>
```

---

## 🎯 Conclusion
This project successfully showcases:
✅ **Angular development & local setup**
✅ **Dockerization & Nginx configuration**
✅ **CI/CD automation using GitHub Actions**
✅ **Deployment on AWS EC2 with SSL**
✅ **Auth0 authentication with HTTPS**

🚀 Now, you can access your application securely over HTTPS! 🎉

---

💡 **Like this project? Give it a ⭐ on GitHub!** 💡
