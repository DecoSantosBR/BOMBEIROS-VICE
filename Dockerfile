# Dockerfile otimizado para Railway com @sparticuz/chromium
# Versão enxuta com libs mínimas necessárias
FROM node:20-slim

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production

WORKDIR /app

# ✅ LIBS MÍNIMAS PARA CHROMIUM (ESSENCIAL)
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
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxrender1 \
    libxshmfence1 \
    wget \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências primeiro (melhor cache)
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm e dependências
RUN corepack enable \
  && pnpm install --frozen-lockfile

# Copiar restante do código
COPY . .

# Build args para variáveis de ambiente do frontend (opcional)
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
