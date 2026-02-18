# Dockerfile otimizado para Railway com suporte a Chromium
# Base Debian (bookworm) para melhor compatibilidade
# FORCE REBUILD: 2026-02-18-v6-WITH-BUILD-ARGS
FROM node:22.13.0-bookworm

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Forçar rebuild quando necessário
RUN echo "Build timestamp: $(date)" > /tmp/build-timestamp.txt

# -------------------------------------------------
# Dependências do sistema (Chromium / Puppeteer)
# -------------------------------------------------
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc-s1 \
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
    lsb-release \
    wget \
    xdg-utils \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------------------------
# Instalar pnpm
# -------------------------------------------------
RUN npm install -g pnpm

# -------------------------------------------------
# Diretório de trabalho
# -------------------------------------------------
WORKDIR /app

# -------------------------------------------------
# Copiar dependências primeiro (melhor cache)
# -------------------------------------------------
COPY package.json pnpm-lock.yaml* ./

# Instalar deps
RUN pnpm install --frozen-lockfile

# -------------------------------------------------
# Copiar restante do código
# -------------------------------------------------
COPY . .

# -------------------------------------------------
# Build args (caso ainda use VITE_ no frontend)
# NÃO quebra se não existirem
# -------------------------------------------------
ARG VITE_FRONTEND_FORGE_API_URL
ARG VITE_FRONTEND_FORGE_API_KEY
ENV VITE_FRONTEND_FORGE_API_URL=$VITE_FRONTEND_FORGE_API_URL
ENV VITE_FRONTEND_FORGE_API_KEY=$VITE_FRONTEND_FORGE_API_KEY

# -------------------------------------------------
# Build da aplicação (Vite + backend)
# -------------------------------------------------
RUN pnpm run build

# -------------------------------------------------
# Ambiente de produção
# -------------------------------------------------
ENV NODE_ENV=production

# Railway fornece PORT automaticamente
EXPOSE 3000

# -------------------------------------------------
# Start
# -------------------------------------------------
CMD ["node", "dist/index.js"]
