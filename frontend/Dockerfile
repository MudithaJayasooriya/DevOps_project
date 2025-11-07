# frontend/Dockerfile

# Use official Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Pass environment variables to Vite
ENV VITE_API_URL=http://backend:3001

# Start Vite dev server, accessible to host network
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
