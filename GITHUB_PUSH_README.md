# Script de Push para GitHub

## 📋 Pré-requisitos

- GitHub CLI (`gh`) instalado e configurado
- Autenticação no GitHub via `gh auth login`

## 🚀 Uso Básico

### 1. Push com configurações padrão
```bash
./push-to-github.sh
```

Isso irá:
- Criar repositório privado chamado `site-cbm-lotus` (se não existir)
- Fazer commit com mensagem automática (data/hora)
- Fazer push para o GitHub

### 2. Push com nome de repositório personalizado
```bash
./push-to-github.sh meu-repositorio
```

### 3. Push com nome e mensagem personalizados
```bash
./push-to-github.sh site-cbm-lotus "Correção de bugs do certificado"
```

## 📝 Exemplos

### Criar novo repositório e fazer primeiro push
```bash
./push-to-github.sh site-cbm-lotus "Initial commit"
```

### Atualizar repositório existente
```bash
./push-to-github.sh site-cbm-lotus "Adicionado campo de e-mail no formulário"
```

### Push rápido com mensagem automática
```bash
./push-to-github.sh
```

## ⚙️ O que o script faz?

1. ✅ Verifica se `gh` CLI está instalado
2. ✅ Verifica autenticação no GitHub
3. ✅ Verifica se o repositório existe
4. ✅ Cria repositório privado se não existir
5. ✅ Adiciona remote 'github' se necessário
6. ✅ Adiciona todos os arquivos (`git add .`)
7. ✅ Faz commit com a mensagem fornecida
8. ✅ Faz push para o GitHub
9. ✅ Mostra URL do repositório

## 🔒 Segurança

- Repositórios são criados como **privados** por padrão
- Usa autenticação segura via GitHub CLI
- Não expõe credenciais

## 🐛 Troubleshooting

### Erro: "gh CLI não está instalado"
```bash
# Instalar gh CLI (já está instalado no sandbox)
gh --version
```

### Erro: "Você não está autenticado no GitHub"
```bash
gh auth login
```

### Erro ao fazer push
- Verifique se você tem permissão de escrita no repositório
- Verifique se o nome do repositório está correto
- Tente fazer push manualmente: `git push github main`

## 📚 Mais Informações

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Git Documentation](https://git-scm.com/doc)
