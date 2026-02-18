# Dockerfile otimizado para Railway com @sparticuz/chromium
# Versão enxuta - não precisa de libs pesadas do sistema
FROM node:20-slim

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production

WORKDIR /app

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
