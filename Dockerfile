# for multistage docker image
# Stage 1: Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the project
COPY . .
RUN npm run build

# Stage 2: Minimal Node.js for serving static files
FROM node:20-alpine AS runner

WORKDIR /app

# Install a small static file server (like serve)
RUN npm install -g serve

# Copy only the built app from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the static build folder
CMD ["serve", "-s", "dist", "-l", "3000"]
