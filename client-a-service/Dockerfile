# Build Stage 
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/main"]