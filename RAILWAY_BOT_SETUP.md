# Configuração do Discord Bot no Railway

Este documento descreve como configurar um container separado para o Discord bot no Railway.

## Arquitetura

- **Container 1 (Web):** Express + tRPC + Puppeteer (site web principal)
- **Container 2 (Bot):** Discord bot isolado

Ambos compartilham o mesmo banco de dados MySQL.

## Passos para Configuração

### 1. Criar Novo Serviço no Railway

1. Acesse o projeto no Railway
2. Clique em **"New Service"** ou **"+ New"**
3. Selecione **"GitHub Repo"**
4. Escolha o repositório `DecoSantosBR/BOMBEIROS-VICE`
5. Nomeie o serviço como **"Discord Bot"** ou **"cbm-lotus-bot"**

### 2. Configurar Dockerfile Customizado

1. Vá em **Settings** do novo serviço
2. Procure por **"Build"** ou **"Dockerfile Path"**
3. Configure:
   - **Dockerfile Path:** `Dockerfile.bot`
   - **Build Command:** (deixe vazio, o Dockerfile já tem tudo)

### 3. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente no novo serviço:

#### Variáveis Obrigatórias

```env
NODE_ENV=production
RAILWAY_DATABASE_URL=${{MySQL.RAILWAY_DATABASE_URL}}
DISCORD_BOT_TOKEN=<seu_token_do_discord>
DISCORD_APPLICATION_ID=<seu_application_id>
DISCORD_SERVER_ID=<seu_server_id>
DISCORD_CHANNEL_ENROLLMENTS=<id_do_canal>
DISCORD_CHANNEL_EVENTS=<id_do_canal>
DISCORD_CHANNEL_CERTIFICATES=<id_do_canal>
DISCORD_CLIENT_ID=<seu_client_id>
DISCORD_CLIENT_SECRET=<seu_client_secret>
DISCORD_REDIRECT_URI=<sua_redirect_uri>
DISCORD_WEBHOOK_RECRUITMENT=<webhook_url>
DISCORD_WEBHOOK_APPROVED=<webhook_url>
DISCORD_WEBHOOK_REJECTED=<webhook_url>
```

#### Compartilhar Banco de Dados

Para compartilhar o banco de dados MySQL entre os dois containers:

1. No serviço do bot, adicione uma **Reference Variable**
2. Selecione o serviço MySQL existente
3. Use `${{MySQL.RAILWAY_DATABASE_URL}}` como valor

### 4. Desabilitar Bot no Container Web

No serviço web principal (cbm-lotus), adicione/atualize:

```env
DISABLE_DISCORD_BOT=true
```

Isso garante que o bot roda apenas no container dedicado.

### 5. Deploy

1. Faça commit e push das mudanças para o GitHub
2. O Railway vai detectar automaticamente e fazer deploy dos dois serviços
3. Verifique os logs de ambos os containers

## Verificação

### Logs do Container Web

Deve mostrar:
```
⚠️ Discord bot DISABLED (DISABLE_DISCORD_BOT=true)
Server running on http://0.0.0.0:8080/
[KEEPALIVE] Process is alive
```

### Logs do Container Bot

Deve mostrar:
```
[Bot Standalone] Starting Discord bot...
[Discord] Bot logged in as Bombeiros Vice City#6549
[Bot Standalone] ✅ Discord bot started successfully
[Bot Standalone] Keepalive - Bot is running
```

## Recursos

### Container Web
- **Memória:** ~500MB
- **CPU:** Baixo uso
- **Porta:** 8080 (HTTP público)

### Container Bot
- **Memória:** ~300-400MB
- **CPU:** Baixo uso
- **Porta:** Nenhuma (não é servidor HTTP)

## Troubleshooting

### Bot não conecta

1. Verifique se `DISCORD_BOT_TOKEN` está correto
2. Verifique se o bot tem permissões no servidor Discord
3. Verifique os logs para erros específicos

### Banco de dados não conecta

1. Verifique se `RAILWAY_DATABASE_URL` está configurado
2. Verifique se o serviço MySQL está rodando
3. Teste a conexão com o banco manualmente

### Container morre

1. Verifique limite de memória (deve ser pelo menos 512MB)
2. Verifique logs para erros de SIGTERM
3. Aumente o limite de memória se necessário

## Manutenção

- Ambos os containers podem ser escalados independentemente
- Se um cair, o outro continua funcionando
- Logs são separados para facilitar debug
- Updates podem ser feitos em cada serviço separadamente
