# Use Nginx as the base image
FROM nginx:alpine

# Remove default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files
COPY ./dist/web-app-authentication /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTPS port
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
# Copy SSL certificates
COPY ssl/cert.pem /etc/nginx/cert.pem
COPY ssl/key.pem /etc/nginx/key.pem


