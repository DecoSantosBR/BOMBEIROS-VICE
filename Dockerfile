# Force rebuild: 2026-02-19-23:01
FROM ghcr.io/puppeteer/puppeteer:latest

USER root

ENV NODE_ENV=production

WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm@10.15.1

# Copia dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia resto do projeto
COPY . .

# Build
RUN pnpm run build

# Volta para usuário seguro
USER pptruser

EXPOSE 3000

CMD ["pnpm", "run", "start"]
