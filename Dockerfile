FROM ghcr.io/puppeteer/puppeteer:latest

ENV NODE_ENV=production

WORKDIR /app

# Instala pnpm globalmente (sem corepack)
RUN npm install -g pnpm@10.15.1

# Copia apenas arquivos de dependência primeiro (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia resto do projeto
COPY . .

# Build
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
