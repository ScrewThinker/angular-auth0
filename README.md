Web App Authentication - DevOps Showcase

Overview

This project is an Angular-based authentication application built with Angular 15.2.0. The main purpose of this project is to showcase DevOps skills, including Dockerization, SSL configuration, GitHub Actions pipeline setup, and deployment on an EC2 instance.

Prerequisites

Ensure you have the following installed before running the application:

Node.js (v18.20.3 or later)

npm (Node Package Manager)

Docker (for containerization)

An AWS EC2 instance (for deployment)

Installation and Running Locally

To run the project on your local machine:

Clone the repository:

git clone <repo-url>
cd <repo-name>

Install dependencies:

npm install

Start the application:

npm start

Open the application in your browser at:

http://localhost:4200

Docker Setup

This project includes a Dockerfile and Nginx configuration file for containerization and hosting. Since Auth0 requires HTTPS, an SSL certificate is generated and configured within the EC2 instance.

Dockerfile

The Dockerfile defines how to containerize the Angular application with Nginx:

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

Nginx Configuration

The nginx.conf file handles redirection from HTTP to HTTPS and serves the Angular application:

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

Setting Up CI/CD Pipeline with GitHub Actions

A GitHub Actions workflow automates the process of building, testing, and pushing the Docker image to Docker Hub.

GitHub Actions Workflow

The following Node.js CI pipeline is used:

name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.20.3]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: package-lock.json
      - run: npm ci
      - run: npm run build --if-present

      # Install dependencies for headless Chrome
      - name: Install Chrome dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y \
            fonts-liberation \
            libappindicator3-1 \
            libasound2-dev \
            libatk-bridge2.0-0 \
            libatk1.0-0 \
            libcups2 \
            libdbus-1-3 \
            libgdk-pixbuf2.0-0 \
            libnspr4 \
            libnss3 \
            libx11-xcb1 \
            libxcomposite1 \
            libxrandr2 \
            xdg-utils

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
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/web-app-authentication:latest .

      - name: Push Docker image to Docker Hub
        run: |
          docker push ${{ secrets.DOCKER_USERNAME }}/web-app-authentication:latest

Deployment on EC2 Instance

Steps to Deploy on EC2:

Create an EC2 instance with Ubuntu.

Install Docker:

sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

Generate SSL Certificate on EC2:

sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
-keyout /etc/nginx/ssl/selfsigned.key \
-out /etc/nginx/ssl/selfsigned.crt

Pull and Run Docker Image:

docker pull <dockerhub-username>/web-app-authentication:latest
docker run -d -p 80:80 -p 443:443 <dockerhub-username>/web-app-authentication:latest

Access the application using the public IP:

https://<EC2_PUBLIC_IP>

Auth0 Configuration

Since Auth0 requires a secure origin (HTTPS), ensure that the callback URL is correctly configured in your Auth0 dashboard:

Navigate to Auth0 Dashboard → Applications → Your App

Under Allowed Callback URLs, add:

https://<EC2_PUBLIC_IP>

Under Allowed Web Origins, add:

https://<EC2_PUBLIC_IP>

Conclusion

This project demonstrates an end-to-end DevOps pipeline involving:

Angular development and local setup

Dockerization and Nginx configuration

CI/CD automation using GitHub Actions

Deployment on EC2 with SSL configuration

Auth0 authentication setup with HTTPS

🚀 Now, you can access your application securely over HTTPS! 🎉

