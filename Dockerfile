FROM node:26-alpine

WORKDIR /app

RUN npm install --global pnpm@11.5.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV NODE_ENV=production

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]