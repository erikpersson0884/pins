# Use the official Nginx base image
FROM nginx:latest

# Set the working directory to the Nginx default public directory
WORKDIR /usr/share/nginx/html/

# Copy your HTML, CSS, and JS files to the Nginx default public directory
COPY index.html .
COPY css/ css/
COPY js/ js/
COPY images/ images/


# Expose port 80 for web traffic
EXPOSE 80
