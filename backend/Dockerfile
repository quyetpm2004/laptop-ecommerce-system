FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

EXPOSE 8000
CMD ["node", "-r", "ts-node/register", "-r", "tsconfig-paths/register", "./src/app.ts"]
