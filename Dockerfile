FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY ["package.json", "tsconfig.json", ".env", "./"]
COPY prisma ./prisma

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm exec prisma generate

COPY . .

RUN pnpm run build

EXPOSE 3333

CMD pnpm run start