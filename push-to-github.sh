#!/bin/bash

# Script para fazer push do código para o GitHub
# Uso: ./push-to-github.sh [nome-do-repositorio] [mensagem-de-commit]

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Push para GitHub ===${NC}"

# Verificar se gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Erro: gh CLI não está instalado${NC}"
    exit 1
fi

# Verificar se está autenticado
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Erro: Você não está autenticado no GitHub${NC}"
    echo "Execute: gh auth login"
    exit 1
fi

# Parâmetros
REPO_NAME=${1:-"site-cbm-lotus"}
COMMIT_MSG=${2:-"Update: $(date '+%Y-%m-%d %H:%M:%S')"}

echo -e "${YELLOW}Repositório:${NC} $REPO_NAME"
echo -e "${YELLOW}Mensagem de commit:${NC} $COMMIT_MSG"

# Verificar se o repositório já existe no GitHub
echo -e "\n${YELLOW}Verificando se o repositório existe...${NC}"
if gh repo view "$REPO_NAME" &> /dev/null; then
    echo -e "${GREEN}✓ Repositório encontrado${NC}"
    REPO_EXISTS=true
else
    echo -e "${YELLOW}⚠ Repositório não encontrado${NC}"
    REPO_EXISTS=false
fi

# Criar repositório se não existir
if [ "$REPO_EXISTS" = false ]; then
    echo -e "\n${YELLOW}Criando repositório privado no GitHub...${NC}"
    gh repo create "$REPO_NAME" --private --source=. --remote=github
    echo -e "${GREEN}✓ Repositório criado${NC}"
else
    # Adicionar remote se não existir
    if ! git remote | grep -q "github"; then
        REPO_URL=$(gh repo view "$REPO_NAME" --json url -q .url)
        git remote add github "$REPO_URL"
        echo -e "${GREEN}✓ Remote 'github' adicionado${NC}"
    fi
fi

# Verificar status do Git
echo -e "\n${YELLOW}Status do Git:${NC}"
git status --short

# Adicionar todos os arquivos
echo -e "\n${YELLOW}Adicionando arquivos...${NC}"
git add .

# Fazer commit
echo -e "${YELLOW}Fazendo commit...${NC}"
if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠ Nenhuma mudança para commitar${NC}"
else
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✓ Commit realizado${NC}"
fi

# Fazer push
echo -e "\n${YELLOW}Fazendo push para GitHub...${NC}"
git push github main 2>&1 || git push github master 2>&1 || {
    # Se falhar, tentar criar branch main e fazer push
    git branch -M main
    git push -u github main
}

echo -e "\n${GREEN}✓ Push concluído com sucesso!${NC}"
echo -e "${GREEN}Repositório:${NC} https://github.com/$(gh api user -q .login)/$REPO_NAME"
