# ---------------------------------------------------
# Multi-Stage Dockerfile for InfiMeet (Coolify & Production Ready)
# ---------------------------------------------------

# Stage 1: Build Frontend (Vite + React)
FROM node:20-alpine AS frontend-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# ---------------------------------------------------
# Stage 2: Production Server Runtime
# ---------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
ENV JITSI_DOMAIN=meet.infispark.in
ENV JITSI_URL=https://meet.infispark.in
ENV DEMO_PARTICIPANTS_ENABLED=true
ENV DEMO_PARTICIPANTS_COUNT=40

# Copy server dependencies and install production packages
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Copy server source code
COPY server/ ./

# Copy built frontend assets into server's static public folder
COPY --from=frontend-builder /app/client/dist ./public

EXPOSE 5000

CMD ["node", "server.js"]
