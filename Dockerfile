FROM node:20-alpine AS builder

ARG VITE_API_URL=https://zora-edu.ae/api
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env
RUN npm run build

FROM caddy:2-alpine

RUN apk add --no-cache wget
WORKDIR /srv

COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]