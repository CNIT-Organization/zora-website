# ==========================================
# STAGE 1: Build the React application
# ==========================================
FROM node:20-alpine AS builder

ARG VITE_API_URL=http://localhost:8080/api
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    npm run build

# ==========================================
# STAGE 2: Production server with Nginx
# ==========================================
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
