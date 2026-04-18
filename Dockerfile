FROM node:20-bookworm-slim

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# Copy package files first for layer caching
COPY package.json pnpm-workspace.yaml .npmrc* ./
COPY artifacts/forge-education/package.json ./artifacts/forge-education/

# Copy remaining source
COPY . .

# Install all deps (dev needed for build)
RUN pnpm install --no-frozen-lockfile

# Rebuild native bindings for this platform (fixes @tailwindcss/oxide)
RUN pnpm rebuild

# Build frontend
RUN pnpm --filter @workspace/forge-education run build

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "artifacts/forge-education/server/index.js"]
