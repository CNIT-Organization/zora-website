FROM node:20-alpine

RUN apk add --no-cache wget

WORKDIR /app/server

COPY server/package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY server/src ./src
COPY server/data ./data

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["node", "src/index.js"]