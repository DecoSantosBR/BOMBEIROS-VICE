-- ============================================================================
-- Script SQL para DBeaver - Tabela recruitment_applications
-- Corpo de Bombeiros Militar - Vice City
-- ============================================================================
-- Instruções:
-- 1. Abra o DBeaver e conecte ao banco de dados Railway
-- 2. Abra uma nova janela SQL (Ctrl+] ou SQL Editor)
-- 3. Cole este script completo
-- 4. Execute todo o script (Ctrl+Alt+X ou botão "Execute SQL Script")
-- ============================================================================

-- Selecionar o banco de dados correto (ajuste se necessário)
-- USE seu_banco_de_dados;

-- Verificar se a tabela já existe
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN '⚠️  ATENÇÃO: Tabela recruitment_applications JÁ EXISTE!'
        ELSE '✅ Tabela não existe. Prosseguindo com criação...'
    END AS status_verificacao
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
  AND table_name = 'recruitment_applications';

-- Criar tabela recruitment_applications
CREATE TABLE IF NOT EXISTS recruitment_applications (
    -- Identificação
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID único da aplicação',
    
    -- Dados do Discord
    discord_id VARCHAR(255) NOT NULL COMMENT 'ID do Discord do candidato',
    discord_username VARCHAR(255) NOT NULL COMMENT 'Username do Discord do candidato',
    
    -- Dados pessoais
    nome VARCHAR(255) NOT NULL COMMENT 'Nome completo do candidato',
    id_vice_city VARCHAR(50) NOT NULL COMMENT 'ID do Vice City do candidato',
    telefone VARCHAR(50) NOT NULL COMMENT 'Telefone do candidato',
    idade VARCHAR(10) NOT NULL COMMENT 'Idade do candidato',
    
    -- Respostas do formulário
    interesse TEXT COMMENT 'Por que quer entrar no CBM',
    possui_microfone VARCHAR(10) NOT NULL COMMENT 'Possui microfone? (sim/não)',
    regras_ilegais TEXT COMMENT 'Resposta sobre regras ilegais',
    ordem_superior TEXT COMMENT 'Resposta sobre ordem superior',
    tiroteio TEXT COMMENT 'Resposta sobre tiroteio',
    multiplas_ocorrencias TEXT COMMENT 'Resposta sobre múltiplas ocorrências',
    
    -- Controle
    status VARCHAR(50) DEFAULT 'pending' COMMENT 'Status: pending, approved, rejected',
    created_at DATETIME NOT NULL COMMENT 'Data e hora da submissão',
    
    -- Índices para performance
    INDEX idx_discord_id (discord_id) COMMENT 'Busca rápida por Discord ID',
    INDEX idx_status (status) COMMENT 'Filtro por status',
    INDEX idx_created_at (created_at) COMMENT 'Ordenação por data'
    
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  COMMENT='Tabela de aplicações de recrutamento do CBM Vice City';

-- Verificar criação
SELECT '✅ Tabela recruitment_applications criada/verificada com sucesso!' AS resultado;

-- Mostrar estrutura da tabela
DESCRIBE recruitment_applications;

-- Contar registros existentes
SELECT 
    COUNT(*) AS total_registros,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pendentes,
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS aprovados,
    SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS reprovados
FROM recruitment_applications;

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================
