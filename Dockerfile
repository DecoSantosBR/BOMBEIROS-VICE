# Force rebuild: 2026-02-20-00:15-autodetect
FROM node:22-slim

ENV NODE_ENV=production

WORKDIR /app

# Instala pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# Copia dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia resto do projeto
COPY . .

# Build
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
