# Dockerfile otimizado para Railway com Chromium completo
FROM node:22-bookworm

# Instalar Chromium e TODAS as suas dependências via apt
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/* \
    && which chromium || echo "Chromium not found in PATH" \
    && ls -la /usr/bin/chromium* || echo "No chromium in /usr/bin" \
    && ln -sf $(which chromium) /usr/bin/chromium || true

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (melhor cache)
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências Node.js
# IMPORTANTE: Não baixar Chrome do Puppeteer, usar o Chromium do sistema
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN pnpm install --frozen-lockfile

# CRÍTICO: Remover qualquer cache do Puppeteer que possa ter sido criado
RUN rm -rf /root/.cache/puppeteer

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Definir ambiente de produção
ENV NODE_ENV=production

# Definir caminho do Chromium para o Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expor porta (Railway define automaticamente via variável PORT)
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/index.js"]
