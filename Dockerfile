# Imagem oficial com Chromium pronto
FROM ghcr.io/puppeteer/puppeteer:latest

ENV NODE_ENV=production

WORKDIR /app

# Copia apenas dependências primeiro (cache melhor)
COPY package.json pnpm-lock.yaml ./

# Ativa corepack e instala deps
RUN corepack enable \
 && corepack prepare pnpm@10.15.1 --activate \
 && pnpm install --frozen-lockfile

# Copia o resto do projeto
COPY . .

# Build
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
