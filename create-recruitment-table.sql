-- Script SQL para criar tabela recruitment_applications
-- Execute este script no Railway MySQL para criar a tabela de recrutamento

-- Criar tabela recruitment_applications se não existir
CREATE TABLE IF NOT EXISTS recruitment_applications (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID único da aplicação',
  discord_id VARCHAR(255) NOT NULL COMMENT 'ID do Discord do candidato',
  discord_username VARCHAR(255) NOT NULL COMMENT 'Username do Discord do candidato',
  nome VARCHAR(255) NOT NULL COMMENT 'Nome completo do candidato',
  id_vice_city VARCHAR(50) NOT NULL COMMENT 'ID do Vice City do candidato',
  telefone VARCHAR(50) NOT NULL COMMENT 'Telefone do candidato',
  idade VARCHAR(10) NOT NULL COMMENT 'Idade do candidato',
  interesse TEXT COMMENT 'Por que quer entrar no CBM',
  possui_microfone VARCHAR(10) NOT NULL COMMENT 'Possui microfone? (sim/não)',
  regras_ilegais TEXT COMMENT 'Resposta sobre regras ilegais',
  ordem_superior TEXT COMMENT 'Resposta sobre ordem superior',
  tiroteio TEXT COMMENT 'Resposta sobre tiroteio',
  multiplas_ocorrencias TEXT COMMENT 'Resposta sobre múltiplas ocorrências',
  status VARCHAR(50) DEFAULT 'pending' COMMENT 'Status da aplicação (pending/approved/rejected)',
  created_at DATETIME NOT NULL COMMENT 'Data e hora da submissão',
  INDEX idx_discord_id (discord_id) COMMENT 'Índice para busca por Discord ID',
  INDEX idx_status (status) COMMENT 'Índice para busca por status',
  INDEX idx_created_at (created_at) COMMENT 'Índice para ordenação por data'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela de aplicações de recrutamento do CBM';

-- Verificar se a tabela foi criada
SELECT 'Tabela recruitment_applications criada com sucesso!' AS resultado;

-- Mostrar estrutura da tabela
DESCRIBE recruitment_applications;
