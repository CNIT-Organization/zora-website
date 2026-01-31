FROM node:20-alpine AS builder

ARG VITE_API_URL=http://localhost:8080/api
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    npm run build

FROM node:20-alpine

RUN npm install -g http-server && npm cache clean --force

WORKDIR /srv

COPY --from=builder /app/dist /srv

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

CMD ["npx", "http-server", "/srv", "-p", "3000", "-c-1"]