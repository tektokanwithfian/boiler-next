# syntax=docker/dockerfile:1.4
FROM node:lts-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY  . .

# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install -g pnpm
RUN pnpm add sharp

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=PUBLISHABLE_KEY_VALUE

RUN pnpm build

FROM base
WORKDIR /app

ENV NODE_ENV production

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static
COPY --from=builder --chown=1001:1001 /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
