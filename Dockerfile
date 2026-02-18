# Dockerfile otimizado para Railway com @sparticuz/chromium
# Usando node:20-bookworm para melhor compatibilidade com Chromium
FROM node:20-bookworm

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production
ENV LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH

WORKDIR /app

# ✅ LISTA COMPLETA E CONFIÁVEL PARA CHROMIUM
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências primeiro (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm e dependências
RUN corepack enable \
  && pnpm install --frozen-lockfile

# Copiar restante do código
COPY . .

# Build args para variáveis de ambiente do frontend
ARG VITE_FRONTEND_FORGE_API_URL
ARG VITE_FRONTEND_FORGE_API_KEY
ENV VITE_FRONTEND_FORGE_API_URL=$VITE_FRONTEND_FORGE_API_URL
ENV VITE_FRONTEND_FORGE_API_KEY=$VITE_FRONTEND_FORGE_API_KEY

# Build da aplicação
RUN pnpm run build

# Railway fornece PORT automaticamente
EXPOSE 3000

# Start
CMD ["node", "dist/index.js"]
