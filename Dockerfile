# Use Nginx as the base image
FROM nginx:alpine

# Remove default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Create SSL directory in Nginx container
RUN mkdir -p /etc/nginx/ssl/

# Copy built Angular files
COPY ./dist/web-app-authentication /usr/share/nginx/html

# Copy SSL certificates
COPY ssl/selfsigned.crt /etc/nginx/ssl/selfsigned.crt
COPY ssl/selfsigned.key /etc/nginx/ssl/selfsigned.key

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for HTTP and HTTPS
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]