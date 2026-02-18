# Deploy com Docker no Railway

## 📋 Visão Geral

Este projeto agora usa um **Dockerfile customizado** ao invés de Nixpacks para garantir que todas as dependências do Chromium sejam instaladas corretamente no Railway.

## 🐳 Mudanças Implementadas

### 1. Dockerfile
- **Base**: `node:22-bookworm-slim` (Debian ao invés de Alpine)
- **Dependências**: 35+ bibliotecas do sistema para Chromium
- **Build**: Otimizado com cache de dependências
- **Runtime**: `@sparticuz/chromium` baixa Chromium automaticamente

### 2. .dockerignore
- Exclui `node_modules`, `dist`, logs, screenshots
- Reduz tamanho da imagem Docker
- Acelera build

### 3. Removido
- ❌ `nixpacks.toml` - Não é mais necessário com Docker

## 🚀 Como Fazer Deploy

### Opção 1: Deploy Automático (Recomendado)

1. **Republicar no Manus**
   ```bash
   # Clique em "Publish" no Management UI
   ```

2. **Railway detecta Dockerfile automaticamente**
   - Railway verá o `Dockerfile` na raiz do projeto
   - Fará build usando Docker ao invés de Nixpacks
   - Instalará todas as dependências corretamente

3. **Aguardar build completo**
   - Primeiro build: **8-12 minutos**
   - Builds subsequentes: 3-5 minutos (com cache)
   - Railway baixa Chromium (~50MB) automaticamente

4. **Testar certificado**
   - Após deploy concluir, teste a geração de certificado
   - Deve funcionar sem erros de bibliotecas

### Opção 2: Deploy Manual via Railway CLI

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login no Railway
railway login

# 3. Link com projeto existente
railway link

# 4. Deploy
railway up
```

### Opção 3: Deploy via GitHub

```bash
# 1. Fazer push para GitHub
./push-to-github.sh site-cbm-lotus "Deploy com Docker"

# 2. Conectar Railway ao GitHub
# - Vá em Railway → Settings → GitHub
# - Conecte o repositório
# - Railway fará deploy automaticamente em cada push
```

## 🔧 Configurações do Railway

### Variáveis de Ambiente Necessárias

As seguintes variáveis já devem estar configuradas no Railway:

```env
# Banco de dados
RAILWAY_DATABASE_URL=...

# JWT
JWT_SECRET=...

# Discord
DISCORD_BOT_TOKEN=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
# ... outras variáveis Discord

# OAuth
OAUTH_SERVER_URL=...

# Analytics
VITE_ANALYTICS_ENDPOINT=...
VITE_ANALYTICS_WEBSITE_ID=...

# App
VITE_APP_TITLE=...
VITE_APP_LOGO=...
```

### Variáveis NÃO Necessárias

❌ **Remova estas variáveis se existirem:**
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`
- `PUPPETEER_EXECUTABLE_PATH`
- `PUPPETEER_SKIP_DOWNLOAD`

O `@sparticuz/chromium` gerencia tudo automaticamente.

## 📊 Monitoramento do Build

### Logs do Railway

```bash
# Via CLI
railway logs

# Ou no Dashboard do Railway
# Deploy → Logs
```

### O que esperar nos logs:

```
✓ Building Docker image
✓ Installing system dependencies (apt-get)
✓ Installing Node.js dependencies (pnpm)
✓ Building application (pnpm run build)
✓ @sparticuz/chromium downloading Chromium
✓ Starting application
✓ Server listening on port 3000
```

## 🐛 Troubleshooting

### Build falha com erro de memória

```bash
# No Railway Dashboard:
# Settings → Resources → Increase Memory
# Recomendado: 2GB+ para build com Chromium
```

### Chromium ainda não funciona

```bash
# Verificar logs do Railway para:
# - Erros de download do Chromium
# - Erros de bibliotecas faltando
# - Timeout no primeiro acesso

# Solução: Aguardar 2-3 minutos após deploy
# O Chromium precisa ser extraído na primeira execução
```

### Build muito lento

```bash
# Normal no primeiro build (8-12 min)
# Builds subsequentes usam cache Docker

# Para acelerar:
# 1. Não mude package.json frequentemente
# 2. Use cache de dependências do Railway
```

## ✅ Verificação de Sucesso

Após o deploy, teste:

1. **Homepage carrega** ✓
2. **Login funciona** ✓
3. **Gerar certificado individual** ✓
4. **Certificado baixa sem erros** ✓

## 📝 Notas Importantes

- **Primeiro build é lento**: Normal, Railway instala tudo do zero
- **Chromium é baixado em runtime**: @sparticuz/chromium faz isso automaticamente
- **Imagem Docker final**: ~800MB (Node + Chromium + deps)
- **Memória recomendada**: 1GB+ (2GB ideal)

## 🔄 Rollback

Se algo der errado:

```bash
# Via Manus Management UI
# Dashboard → Rollback para checkpoint anterior

# Ou via Railway
# Deployments → Selecione deploy anterior → Redeploy
```

## 📚 Referências

- [Railway Docker Deployments](https://docs.railway.app/deploy/dockerfiles)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)
- [Puppeteer Troubleshooting](https://pptr.dev/troubleshooting)
