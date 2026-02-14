# backend/Dockerfile

# Use official Node.js 20 Alpine image
FROM node:20-alpine

# Install build dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3001

# Set environment variable for production
ENV NODE_ENV=production

# Start the backend
CMD ["node", "index.js"]
