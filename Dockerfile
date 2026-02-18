# Dockerfile otimizado para Railway com suporte a Chromium
# Usa Debian (bookworm) ao invés de Alpine para melhor compatibilidade com Chromium
FROM node:22-bookworm

# Instalar dependências do sistema necessárias para o Chromium
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

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (melhor cache)
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
# Nota: @sparticuz/chromium baixará o Chromium automaticamente
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Definir ambiente de produção
ENV NODE_ENV=production

# Expor porta (Railway define automaticamente via variável PORT)
EXPOSE 3000

# Comando de inicialização: build primeiro (com variáveis de ambiente), depois start
CMD ["sh", "-c", "pnpm run build && node dist/index.js"]
