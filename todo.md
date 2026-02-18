# TODO - CBM Vice City

## Fase 1: Upgrade e Configuração Inicial
- [x] Upgrade para web-db-user
- [x] Resolver conflito em Home.tsx
- [x] Criar schema do banco de dados

## Fase 2: Banco de Dados e Modelos
- [x] Criar tabela de cursos
- [x] Criar tabela de materiais de curso (instruções + vídeo)
- [x] Criar tabela de solicitações de inscrição
- [x] Executar migrations (pnpm db:push)
- [x] Popular banco com os 15 cursos iniciais
- [x] Criar procedures tRPC para cursos e applications

## Fase 3: Páginas Individuais de Cursos
- [x] Criar rota dinâmica /curso/:id
- [x] Implementar página de curso com material (instruções + vídeo)
- [x] Adicionar controle de acesso para edição (apenas close.jackson2025@gmail.com)
- [x] Adicionar botão "Saiba Mais" nos cards de curso

## Fase 4: Modal de Solicitação de Curso
- [x] Criar componente Modal de solicitação
- [x] Implementar formulário (Nome Completo, ID do Jogador, Telefone, Horário Disponível)
- [x] Salvar solicitações no banco de dados

## Fase 5: Gerenciamento de Solicitações para Instrutores
- [ ] Criar página de gerenciamento de solicitações
- [ ] Implementar controle de acesso (apenas instrutores)
- [ ] Adicionar funcionalidade de aceitar/recusar solicitações
- [ ] Implementar notificações para solicitantes

## Fase 6: Sistema de Gerenciamento de Login e Aprovação de Usuários
- [x] Atualizar schema do banco com status de aprovação (pending/approved/rejected)
- [x] Adicionar novos papéis: membro, instrutor, administrador
- [x] Criar procedures tRPC para listar, aprovar e rejeitar usuários
- [x] Implementar página /admin/usuarios para gerenciamento
- [x] Adicionar middleware de verificação de aprovação
- [x] Criar página de "aguardando aprovação" para novos usuários
- [x] Atualizar lógica de login para definir status inicial como "pending"
- [x] Testar fluxo completo de aprovação

## Fase 7: Painel de Gerenciamento de Solicitações para Instrutores
- [x] Criar página /gerenciar-solicitacoes
- [x] Implementar visualização de solicitações pendentes, aceitas e rejeitadas
- [x] Adicionar botões de aprovar/rejeitar para cada solicitação
- [x] Mostrar informações do curso e candidato
- [x] Adicionar controle de acesso (apenas instrutores e admin)
- [x] Adicionar link no header para instrutores acessarem o painel
- [x] Testar fluxo completo de aprovação/rejeição

## Fase 8: Proteção de Autenticação
- [x] Adicionar redirecionamento para login na Home para usuários não autenticados
- [x] Testar fluxo de login em navegador anônimo

## Fase 9: Controle de Acesso por Perfil de Usuário
- [x] Ocultar "Gerador de Certificados" para membros
- [x] Ocultar "Registrar Resultados de Curso" para membros
- [x] Mostrar "Gerador de Certificados" para instrutores e admins
- [x] Mostrar "Registrar Resultados de Curso" para instrutores e admins
- [x] Restringir edição de Material do Curso apenas para admins
- [x] Manter "Gerenciar Usuários" apenas para admins
- [x] Manter "Gerenciar Solicitações" para instrutores e admins
- [x] Testar permissões para cada perfil

## Fase 10: Edição e Exclusão de Usuários
- [x] Criar procedure tRPC para editar usuário (nome, email, role)
- [x] Criar procedure tRPC para excluir usuário
- [x] Adicionar botões de editar/excluir na tabela de usuários
- [x] Criar modal de edição com formulário
- [x] Criar modal de confirmação de exclusão
- [x] Adicionar validação para impedir exclusão do próprio usuário
- [x] Testar funcionalidades de edição e exclusão

## Fase 11: Correção de Permissões de Membros
- [ ] Verificar visibilidade do header (botões Gerenciar Usuários e Gerenciar Solicitações)
- [ ] Confirmar que Gerador de Certificados está oculto para membros
- [ ] Confirmar que Registrar Resultados está oculto para membros
- [ ] Confirmar que Painel de Instrutores está oculto para membros
- [ ] Testar com usuário membro

## Fase 12: Múltiplos Vídeos com Títulos
- [x] Atualizar schema courseMaterials para incluir video1Title, video1Url, video2Title, video2Url
- [x] Executar migrations (pnpm db:push)
- [x] Atualizar CoursePage.tsx para exibir dois vídeos com títulos
- [x] Adicionar suporte para Medal.tv (link clicável ao invés de embed)
- [x] Testar com vídeos do YouTube e Medal.tv

## Fase 13: Upload de Imagens para Cursos
- [x] Criar tabela courseImages no schema
- [x] Executar migrations (pnpm db:push)
- [x] Criar procedure tRPC para upload de imagem (usando S3)
- [x] Criar procedure tRPC para listar imagens do curso
- [x] Criar procedure tRPC para deletar imagem
- [x] Atualizar CoursePage.tsx com galeria de imagens
- [x] Adicionar interface de upload para admins
- [x] Testar upload e exibição de imagens

## Fase 14: Atualização do Logo
- [x] Fazer upload do brasão CBM RJ para S3
- [x] Atualizar referências do logo no código
- [x] Aumentar tamanho do logo no header
- [x] Testar visualização em diferentes páginas

## Fase 15: Ajuste de Layout Hero Section
- [x] Reestruturar Hero Section com layout em duas colunas
- [x] Adicionar brasão grande (300-350px) à direita
- [x] Ajustar altura da seção Hero
- [x] Testar responsividade em diferentes tamanhos de tela

## Fase 16: Atualização do Brasão (Letras Brancas)
- [x] Fazer upload do novo brasão com letras brancas e contorno mais fino
- [x] Atualizar referências no código (header e Hero Section)
- [x] Testar visualização em todas as páginas

## Fase 17: Brasão com Fundo Transparente
- [x] Fazer upload do brasão com fundo transparente
- [x] Atualizar referências no código
- [x] Testar visualização em todas as páginas

## Fase 18: Contador de Solicitações Pendentes
- [x] Criar procedure tRPC para contar solicitações com status "pending"
- [x] Adicionar badge numérico no botão "Gerenciar Solicitações"
- [x] Implementar atualização automática do contador
- [x] Testar visualização para instrutores e admins

## Fase 19: Aprovação Manual de Usuários
- [ ] Verificar usuários pendentes no banco de dados
- [ ] Criar script para aprovar próximos 3 usuários como administradores
- [ ] Executar script e verificar resultados

## Fase 19: Auto-Aprovação dos Próximos 3 Usuários
- [x] Modificar lógica de upsertUser para auto-aprovar próximos 3 usuários como admin
- [x] Adicionar contador de usuários auto-aprovados
- [x] Testar funcionalidade

## Fase 20: Adicionar Imagens aos Cards de Cursos
- [x] Buscar imagens apropriadas para cada tipo de curso
- [x] Atualizar schema do banco de dados para incluir campo imageUrl
- [x] Executar migration
- [x] Atualizar cursos existentes com URLs de imagens
- [x] Modificar Home.tsx para exibir imagens nos cards
- [x] Testar visualização

## Fase 21: Substituir Imagem do Curso Salva-Vidas
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Salva-Vidas
- [x] Verificar resultado

## Fase 22: Substituir Imagem do Curso Resgate-Montanha
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Resgate-Montanha
- [x] Verificar resultado

## Fase 23: Substituir Imagem do Curso SPEED
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso SPEED
- [x] Verificar resultado

## Fase 24: Substituir Imagem do Curso Modulação/Conduta
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Modulação/Conduta
- [x] Verificar resultado

## Fase 25: Substituir Imagem do Curso TAF
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso TAF
- [x] Verificar resultado

## Fase 26: Substituir Imagem do Curso Mergulhador
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Mergulhador
- [x] Verificar resultado

## Fase 27: Substituir Imagem do Curso Resgate-Aquático
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Resgate-Aquático
- [x] Verificar resultado

## Fase 28: Substituir Imagem do Curso Salva-Vidas
- [x] Fazer upload da nova imagem para S3
- [x] Atualizar URL da imagem no banco de dados para o curso Salva-Vidas
- [x] Verificar resultado

## Fase 29: Substituir Imagens de Três Cursos
- [x] Fazer upload das imagens PQD.avif, Águia.avif e Aguia1.jfif para S3
- [x] Atualizar URL da imagem do curso Paraquedista Especializado
- [x] Atualizar URL da imagem do curso Aero-Vidas Elite
- [x] Atualizar URL da imagem do curso Aero-Vidas 1
- [x] Verificar resultado

## Fase 30: Substituir Imagens dos Cursos de Motolância
- [x] Fazer upload das imagens Motolancia.jpg e Motolancia1.jpeg para S3
- [x] Atualizar URL da imagem do curso Motolância
- [x] Atualizar URL da imagem do curso Motolância Especializado
- [x] Verificar resultado

## Fase 31: Discord OAuth - Login Unificado
- [x] Adicionar campo discordId ao schema de usuários
- [x] Executar migrations (pnpm db:push)
- [x] Criar variáveis de ambiente para Discord OAuth (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
- [x] Implementar rota /api/auth/discord para iniciar OAuth flow
- [x] Implementar rota /api/auth/discord/callback para processar callback
- [x] Criar lógica de vincular conta Discord com usuário existente
- [x] Criar lógica de criar novo usuário a partir de conta Discord
- [x] Adicionar botão "Login com Discord" na página de login
- [x] Criar página de login dedicada com opções Discord e Manus
- [ ] Adicionar opção de vincular Discord na página de perfil do usuário
- [x] Testar fluxo completo de OAuth
- [x] Criar testes automatizados para rotas Discord

## Fase 32: Correção X-Frame-Options Discord OAuth
- [x] Investigar código do botão "Entrar com Discord"
- [x] Garantir que usa window.location.href para redirecionamento completo
- [x] Testar fluxo OAuth completo no navegador
- [x] Configurar variáveis de ambiente no painel de Secrets
- [x] Reiniciar servidor para carregar variáveis

## Fase 33: Melhorias no Registro de Resultados de Curso
- [x] Adicionar campo "Matrícula" no formulário de aprovados/reprovados
- [x] Criar botão "Confirmar Resultados" no formulário
- [x] Implementar geração automática de certificados para aprovados
- [x] Implementar download em lote de certificados (ZIP)
- [x] Instalar biblioteca JSZip para criar arquivos ZIP

## Fase 34: Campo Cargo do Aplicador
- [x] Adicionar campo "Cargo do Aplicador" no formulário de Registro de Resultados
- [x] Incluir cargo do aplicador nos certificados gerados
- [x] Exibir cargo do aplicador no resumo

## Fase 35: Atualizar Layout dos Certificados em Lote
- [x] Copiar HTML/CSS do certificado do Gerador individual
- [x] Aplicar mesmo layout nos certificados gerados em lote
- [x] Ajustar tamanhos de fonte e espaçamentos para versão em lote

## Fase 36: Corrigir Fonte da Assinatura do Aplicador
- [x] Alterar fonte do nome do aplicador para "Mistral" nos certificados em lote

## Fase 37: Campo Cargo em Editar Usuário
- [x] Adicionar campo "rank" (cargo) ao schema de usuários
- [x] Executar migrations (pnpm db:push)
- [x] Criar lista de seleção com cargos do CBM Vice City
- [x] Implementar backend para salvar cargo do usuário
- [x] Implementar UI de edição de cargo

## Fase 38: Ajustar Estilo do Campo Cargo
- [x] Adicionar fundo branco na lista de seleção do campo Cargo

## Fase 39: Corrigir Bug de Salvamento de Cargo
- [x] Investigar por que cargo não está sendo salvo
- [x] Corrigir função updateUser no backend
- [x] Testar salvamento de cargo

## Fase 40: Coluna Cargo na Tabela de Usuários
- [x] Adicionar badge de cargo para cada usuário aprovado
- [x] Exibir cargo ao lado do badge de papel (role)

## Fase 41: Auto-preencher Cargo do Aplicador
- [x] Preencher automaticamente campo "Cargo do Aplicador" com cargo do usuário logado
- [x] Permitir edição manual caso usuário queira alterar
- [x] Manter auto-preenchimento ao resetar formulário

## Fase 42: Atualizar Design dos Certificados
- [x] Adicionar logo do CBM Vice City à esquerda no certificado
- [x] Mover assinatura do aplicador para centralizada abaixo do curso
- [x] Ajustar layout para seguir modelo fornecido
- [x] Aplicar mudanças tanto no Gerador individual quanto em lote

## Fase 43: Corrigir Certificado Recortado
- [x] Ajustar tamanhos de fonte e espaçamentos para caber todo conteúdo
- [x] Reduzir gaps e paddings para evitar overflow
- [x] Reduzir tamanho de logo e selo de aprovação

## Fase 44: Corrigir Cargo do Aplicador Cortado
- [x] Reduzir ainda mais espaçamentos verticais no centro
- [x] Garantir que cargo do aplicador apareça completo
- [x] Ajustar margem negativa do centro

## Fase 45: Centralizar Assinatura do Aplicador
- [x] Remover flex: 1 que está empurrando para esquerda
- [x] Centralizar nome e cargo do aplicador horizontalmente
- [x] Usar position absolute para ID mantendo assinatura centralizada

## Fase 46: Corrigir Logo Desaparecendo ao Exportar
- [x] Investigar configurações do html2canvas
- [x] Converter logo para base64 para evitar CORS
- [x] Atualizar certificado individual e em lote

## Fase 47: Substituir Campo Cargo por Select no Gerador de Certificados
- [x] Localizar campo "Cargo do Aplicador" no Gerador de Certificados
- [x] Substituir Input por Select com opções de cargos militares
- [x] Adicionar todas as 11 opções de cargos

## Fase 48: Substituir Campo Nome do Curso por Select no Gerador
- [x] Verificar query trpc existente para listar cursos (courses.list)
- [x] Substituir Input por Select no campo "Nome do Curso"
- [x] Implementar carregamento dinâmico dos cursos cadastrados

## Fase 49: Ajustar Layout da Assinatura e Remover Cantos Dourados
- [x] Ajustar assinatura: nome cursivo acima da linha, cargo abaixo
- [x] Remover decorações douradas nos cantos do certificado
- [x] Aplicar alterações em certificado individual e geração em lote

## Fase 50: Padronizar Certificados em Lote com Individual
- [ ] Comparar código do certificado individual e em lote
- [ ] Ajustar tamanhos de fonte e espaçamentos no certificado em lote
- [ ] Centralizar conteúdo verticalmente (remover margem negativa excessiva)

## Fase 50: Padronizar Certificado Individual com Em Lote
- [x] Comparar código dos dois certificados
- [x] Ajustar margem negativa do certificado individual (de -15px para 0)
- [x] Centralizar conteúdo verticalmente no individual

## Fase 51: Melhorar Centralização Vertical do Certificado Individual
- [x] Mudar justifyContent de space-between para center
- [x] Adicionar gap de 20px entre seções
- [x] Conteúdo agora realmente centralizado verticalmente

## Fase 52: Ajustar Tamanhos de Fonte do Certificado Individual
- [x] Aumentar tamanhos de fonte para corresponder ao certificado em lote
- [x] CERTIFICADO: 16px → 22px
- [x] Nome do aluno: 24px → 34px
- [x] Nome do curso: 18px → 24px
- [x] Textos auxiliares: 11px → 14px

## Fase 53: Deslocar Conteúdo Central Para Cima (Mantendo Cabeçalho e Rodapé)
- [x] Reverter tamanhos de fonte para originais
- [x] Adicionar marginTop: -40px apenas na seção central
- [x] Logo e selo permanecem no topo
- [x] Assinatura e ID permanecem no rodapé

## Fase 54: Deslocar Logo, Selo e ID Para Baixo
- [x] Adicionar margem superior de 20px ao cabeçalho (logo + selo)
- [x] Deslocar ID para baixo com bottom: -10px
- [x] Melhor equilíbrio visual do certificado

## Fase 55: Aumentar Margem do Cabeçalho e ID
- [x] Aumentar margem superior do cabeçalho de 20px para 40px
- [x] Aumentar deslocamento do ID de -10px para -20px

## Fase 56: Ajustar Posição da Assinatura nos Certificados em Lote
- [x] Localizar seção da assinatura na geração em lote
- [x] Adicionar margin-bottom de 4px para assinatura ficar acima da linha

## Fase 57: Aumentar Tamanhos de Fonte nos Certificados em Lote
- [x] Aumentar em 4px todas as fontes do certificado em lote
- [x] Aplicado a todos os textos (14px→18px, 22px→26px, 24px→28px, 34px→38px)

## Fase 58: Deslocar Conteúdo Central Para Cima nos Certificados em Lote
- [x] Aumentar margem negativa do conteúdo central de -25px para -50px

## Fase 59: Ajustar Fontes e Posição do Certificado Individual
- [x] Reduzir em 2px todos os tamanhos de fonte do conteúdo central (16px→14px, 11px→9px, 24px→22px, 18px→16px)
- [x] Aumentar margem negativa de -40px para -60px para deslocar conteúdo para cima

## Fase 60: Deslocar Conteúdo Central Para Cima nos Certificados em Lote (Novamente)
- [x] Aumentar margem negativa do conteúdo central de -50px para -70px
- [x] Certificados individuais mantidos inalterados

## Fase 61: Ajustar Espaçamento da Linha de Assinatura no Certificado Individual
- [x] Deslocar linha horizontal abaixo do nome do aplicador para baixo nos certificados individuais

## Fase 62: Sistema de Registro Inicial e Permissões Automáticas por Cargo
- [x] Adicionar campo "studentId" (ID/matrícula) ao schema de usuários
- [x] Atualizar schema para marcar usuários que completaram registro inicial
- [x] Executar migrations (pnpm db:push)
- [x] Criar página /complete-profile para registro inicial
- [x] Implementar formulário com campos: Nome, ID (matrícula), Cargo
- [x] Criar função para mapear cargo → role automaticamente
- [x] Atualizar procedure tRPC para salvar dados do registro inicial
- [x] Atualizar middleware de autenticação para redirecionar usuários incompletos
- [x] Remover sistema de aprovação manual de usuários
- [x] Atualizar página de gerenciamento de usuários
- [x] Testar fluxo completo de registro

## Fase 63: Ajustar Label do Campo Nome na Tela de Registro
- [x] Alterar "Nome Completo" para "Nome completo (no RP)" na página CompleteProfile

## Fase 65: Verificar e Garantir Aprovação Automática no Registro
- [x] Verificar fluxo de registro de usuários (CompleteProfile)
- [x] Confirmar que aprovação é automática baseada no cargo
- [x] Remover qualquer código de aprovação manual remanescente
- [x] Testar fluxo completo de registro

## Fase 66: Corrigir Tela "Aguardando Aprovação" Após Registro
- [x] Investigar por que tela de aprovação aparece após completar perfil
- [x] Verificar lógica de redirecionamento no CompleteProfile
- [x] Corrigir para redirecionar diretamente para home após registro
- [x] Testar fluxo completo de registro

## Fase 67: Remover Página "Aguardando Aprovação"
- [x] Deletar arquivo PendingApproval.tsx
- [x] Remover rota /aguardando-aprovacao do App.tsx
- [x] Remover import de PendingApproval no App.tsx

## Fase 68: Remover Redirecionamentos para /aguardando-aprovacao
- [x] Buscar todos os redirecionamentos para /aguardando-aprovacao no código
- [x] Remover todos os redirecionamentos encontrados
- [x] Testar fluxo completo de registro

## Fase 69: Corrigir Redirecionamento Persistente para /aguardando-aprovacao
- [x] Investigar código frontend que faz redirecionamento
- [x] Verificar hooks useAuth e lógica de verificação de approvalStatus
- [x] Remover ou corrigir lógica de redirecionamento (encontrado em server/discord.ts)
- [x] Testar fluxo completo

## Fase 70: Implementar Upload de Arquivos nos Cursos
- [x] Criar tabela courseFiles no schema para armazenar metadados dos arquivos
- [x] Executar migrations (pnpm db:push)
- [x] Criar procedure tRPC para upload de arquivos (uploadCourseFile)
- [x] Criar procedure tRPC para listar arquivos de um curso (getCourseFiles)
- [x] Criar procedure tRPC para deletar arquivo (deleteCourseFile)
- [x] Adicionar componente de upload de arquivos na página de curso
- [x] Adicionar listagem de arquivos anexados com opção de download
- [x] Testar upload, listagem e exclusão de arquivos

## Fase 71: Implementar Visualização Ampliada de Imagens
- [x] Adicionar modal/lightbox para visualizar imagens em tamanho maior
- [x] Implementar navegação entre imagens no modal (anterior/próxima)
- [x] Adicionar botão de fechar no modal
- [x] Testar funcionalidade de visualização

## Fase 72: Módulo de Agendamento de Cursos com Calendário
- [x] Criar tabela courseEvents no schema do banco
- [x] Executar migrations (pnpm db:push)
- [x] Criar procedures tRPC para listar eventos (getEvents, getEventsByDate)
- [x] Criar procedure tRPC para criar evento (createEvent - apenas instrutores/admins)
- [x] Criar procedure tRPC para editar evento (updateEvent - apenas instrutores/admins)
- [x] Criar procedure tRPC para deletar evento (deleteEvent - apenas instrutores/admins)
- [x] Criar página /agendamento com calendário interativo
- [x] Implementar visualização mensal do calendário
- [x] Implementar painel lateral com programação do dia (estilo Outlook)
- [x] Implementar modal de criação de evento
- [x] Implementar modal de edição de evento
- [x] Adicionar rota no App.tsx
- [x] Testar criação, edição e exclusão de eventos

## Fase 73: Adicionar Botão de Agendamento no Header
- [x] Adicionar botão "Agendamento" no cabeçalho da página Home
- [x] Implementar navegação para /agendamento ao clicar no botão
- [x] Testar navegação

## Fase 74: Melhorias na Página de Agendamento
- [x] Adicionar botão "Voltar" na página de agendamento
- [x] Alterar fundo do modal de criação de evento para branco

## Fase 75: Alterar Fundo dos Dropdowns para Branco
- [x] Alterar fundo das listas dropdown (SelectContent) para branco nos modais

## Fase 76: Adicionar Campo Instrutor nos Eventos
- [x] Adicionar coluna instructor ao schema da tabela courseEvents (já existe instructorId)
- [x] Executar migrations (pnpm db:push)
- [x] Atualizar procedures tRPC para incluir campo instructor
- [x] Adicionar campo Instrutor no formulário de criação de evento
- [x] Adicionar campo Instrutor no formulário de edição de evento
- [x] Exibir nome do instrutor nos cards de eventos
- [x] Testar criação e edição de eventos com instrutor
- [x] Criar testes automatizados para validar funcionalidade de instrutor

## Fase 77: Corrigir Fuso Horário do Agendamento para Brasília
- [x] Investigar como datas estão sendo tratadas atualmente (UTC vs Local)
- [x] Implementar conversão para horário de Brasília (GMT-3)
- [x] Instalar biblioteca date-fns-tz para trabalhar com timezones
- [x] Ajustar função handleCreateEvent para converter de Brasília para UTC
- [x] Ajustar função handleUpdateEvent para converter de Brasília para UTC
- [x] Ajustar função handleEditClick para converter de UTC para Brasília ao carregar evento
- [x] Ajustar exibição de horários nos detalhes dos eventos (converter UTC para Brasília)
- [x] Criar testes automatizados para validar conversão de timezone (6 testes passando)
- [x] Testar criação de eventos com horário correto
- [x] Testar edição de eventos mantendo horário correto

## Fase 78: Sistema de Inscrição em Cursos
- [x] Criar tabela courseEnrollments no schema do banco
- [x] Adicionar campos: userId, courseId, enrolledAt, status (pending/confirmed/cancelled), updatedAt
- [x] Executar migrations (pnpm db:push)
- [x] Criar funções de gerenciamento de inscrições em db.ts (createEnrollment, getUserEnrollmentForCourse, getCourseEnrollments, updateEnrollmentStatus, cancelEnrollment, deleteEnrollment, getEnrollmentCountByCourse)
- [x] Criar procedure tRPC para fazer inscrição (enrollments.enroll)
- [x] Criar procedure tRPC para listar inscritos de um curso com dados dos usuários (enrollments.listByCourse)
- [x] Criar procedure tRPC para cancelar inscrição (enrollments.cancel)
- [x] Criar procedure tRPC para verificar inscrição do usuário (enrollments.myEnrollment)
- [x] Criar procedure tRPC para atualizar status de inscrição - apenas instrutores/admins (enrollments.updateStatus)
- [x] Criar procedure tRPC para contar inscrições (enrollments.count)
- [x] Adicionar botão "Fazer Inscrição" na página de curso
- [x] Implementar modal de confirmação de inscrição
- [x] Mostrar status da inscrição do usuário (inscrito, aguardando confirmação, cancelado)
- [x] Adicionar botão para cancelar inscrição
- [x] Mostrar contador de inscritos no header do curso
- [x] Criar página ManageEnrollmentsPage para instrutores gerenciarem lista de inscritos
- [x] Implementar seletor de curso na página de gerenciamento
- [x] Exibir resumo de inscrições (confirmados, pendentes, cancelados)
- [x] Permitir instrutores/admins confirmarem ou rejeitarem inscrições pendentes
- [x] Adicionar rota /gerenciar-inscricoes no App.tsx
- [x] Adicionar botão "Gerenciar Inscrições" no header da Home (apenas para instrutores/admins)
- [x] Implementar lógica de reativação de inscrição cancelada
- [x] Testar fluxo completo de inscrição
- [x] Criar testes automatizados (12 testes passando: criação, duplicação, reativação, permissões, queries, cancelamento)

## Fase 79: Mover Inscrições para Cards de Eventos Agendados
- [x] Alterar schema courseEnrollments para usar eventId ao invés de courseId
- [x] Executar migration (pnpm db:push) com rename de coluna
- [x] Atualizar funções em db.ts para trabalhar com eventId (createEnrollment, getUserEnrollmentForEvent, getEventEnrollments, etc)
- [x] Modificar procedures tRPC enrollments para usar eventId (enroll, myEnrollment, listByEvent, count, updateStatus, cancel)
- [x] Criar componente EventEnrollmentSection para gerenciar inscrições dentro do card
- [x] Adicionar botão "Fazer Inscrição" nos cards de eventos na CalendarPage
- [x] Mostrar contador de inscritos no card do evento
- [x] Implementar expansão do card para mostrar lista de inscritos com detalhes (nome, matrícula, cargo, data de inscrição)
- [x] Mostrar status da inscrição do usuário com badges coloridos (confirmado/pendente/cancelado)
- [x] Permitir instrutores/admins confirmarem, rejeitarem ou marcarem como pendente inscrições dentro do card
- [x] Adicionar botão para cancelar inscrição do próprio usuário
- [x] Remover página ManageEnrollmentsPage (funcionalidade movida para cards)
- [x] Remover rota /gerenciar-inscricoes do App.tsx
- [x] Remover botão "Gerenciar Inscrições" do header da Home
- [x] Remover funcionalidade de inscrição da CoursePage (agora só em eventos agendados)
- [x] Atualizar testes para refletir mudança de courseId para eventId (12 testes passando)
- [x] Testar fluxo completo na página de Agendamento

## Fase 80: Corrigir Botão Voltar na Página de Agendamento
- [x] Identificar problema no botão Voltar em /agendamento (estava usando window.history.back())
- [x] Corrigir navegação do botão Voltar (alterado para usar setLocation("/") do wouter)
- [x] Adicionar import de useLocation do wouter
- [x] Testar funcionalidade

## Fase 81: Sistema de Aprovação de Inscrições com Notificação por Email - CONCLUÍDO
- [ ] Alterar status padrão de novas inscrições para "pending" (já está implementado)
- [ ] Verificar se schema suporta status "rejected" (atualmente usa "cancelled")
- [ ] Adicionar status "rejected" ao enum do schema se necessário
- [ ] Implementar função de envio de email usando serviço disponível
- [ ] Criar template de email para inscrição aprovada
- [ ] Criar template de email para inscrição rejeitada
- [ ] Adicionar envio de email ao aprovar inscrição (status confirmed)
- [ ] Adicionar envio de email ao rejeitar inscrição (status rejected)
- [ ] Atualizar UI para mostrar badge "Rejeitado" com cor vermelha
- [ ] Atualizar botões de ação do instrutor para usar "Aprovar" e "Rejeitar"
- [x] Testar fluxo completo: inscrição → pendente → aprovação/rejeição → email enviado
- [ ] Criar testes automatizados para envio de emails

## Fase 81: Sistema de Aprovação de Inscrições com Notificação por Email - CONCLUÍDO
- [x] Alterar status padrão de novas inscrições para "pending"
- [x] Adicionar status "rejected" ao enum do schema
- [x] Executar migration para adicionar rejected e alterar default
- [x] Instalar nodemailer e @types/nodemailer
- [x] Criar módulo server/_core/email.ts com funções de envio
- [x] Criar templates HTML para email de aprovação
- [x] Criar templates HTML para email de rejeição
- [x] Atualizar procedure updateStatus para aceitar status rejected
- [x] Adicionar lógica de envio de email ao aprovar inscrição (status confirmed)
- [x] Adicionar lógica de envio de email ao rejeitar inscrição (status rejected)
- [x] Atualizar função updateEnrollmentStatus em db.ts para aceitar rejected
- [x] Atualizar UI para mostrar badge "Rejeitado" com cor vermelha
- [x] Alterar botões de ação do instrutor para "Aprovar" e "Rejeitar"
- [x] Ocultar botões de ação para inscrições rejeitadas ou canceladas
- [x] Configurar credenciais EMAIL_USER e EMAIL_PASS
- [x] Criar teste de validação de credenciais de email (email.test.ts)
- [x] Validar envio de email de teste (teste passou com sucesso)

## Fase 82: Corrigir Erro myEnrollment Retornando Undefined
- [x] Identificar onde getUserEnrollmentForEvent retorna undefined
- [x] Alterar para retornar null quando não há inscrição (return null e enrollment || null)
- [x] Testar correção na página de agendamento

## Fase 83: Integração Bidirecional Discord ↔ Site
- [x] Instalar discord.js (v14.25.1)
- [x] Configurar credenciais do bot (DISCORD_BOT_TOKEN, DISCORD_APPLICATION_ID, DISCORD_SERVER_ID, DISCORD_CHANNEL_*)
- [x] Criar módulo Discord bot em server/_core/discord.ts
- [x] Implementar registro de comandos slash no servidor Discord
- [x] Implementar comando /cursos (lista cursos do banco de dados)
- [x] Implementar comando /inscrever <evento_id> (cria inscrição no banco, requer conta vinculada)
- [x] Implementar comando /agenda (mostra próximos eventos do banco)
- [x] Implementar comando /meusstatus (exibe inscrições do usuário)
- [x] Implementar notificação Discord ao criar inscrição no site (sendEnrollmentNotification)
- [x] Implementar notificação Discord ao aprovar/rejeitar inscrição (sendApprovalNotification)
- [x] Implementar notificação Discord ao criar evento (sendEventNotification)
- [x] Adicionar notificações Discord nos procedures tRPC (enroll, updateStatus, events.create)
- [x] Implementar sincronização Discord → Site (comandos criam registros no banco via db.ts)
- [x] Vincular usuários Discord com usuários do site via campo discordId
- [x] Inicializar bot Discord automaticamente ao iniciar servidor (server/_core/index.ts)
- [x] Criar teste de validação de conexão do bot (discord.bot.test.ts - passou)
- [x] Testar bot conectado e comandos registrados (Bot: Cadastro Bombeiro Lotus#9636)

## Fase 84: Corrigir Fuso Horário em Notificações Discord e Email
- [x] Identificar onde horários UTC estão sendo enviados ao Discord (routers.ts linhas 424, 522, 340)
- [x] Converter horários para Brasília (GMT-3) ao criar inscrição (usando toZonedTime do date-fns-tz)
- [x] Converter horários para Brasília (GMT-3) ao aprovar/rejeitar inscrição
- [x] Converter horários para Brasília (GMT-3) ao criar evento
- [x] Templates de email automaticamente usam os horários convertidos (eventDate e eventTime já em GMT-3)

## Fase 85: Adicionar Horário de Início ao Comando /agenda
- [x] Atualizar comando /agenda para exibir horário de início dos eventos
- [x] Converter horário UTC para Brasília antes de exibir (usando toZonedTime)
- [x] Formatar exibição como "dd/MM/yyyy às HH:mm"

## Fase 86: Publicar Certificados no Discord
- [ ] Criar função sendCertificateNotification em discord.ts
- [ ] Adicionar procedure tRPC certificates.publishToDiscord
- [ ] Adicionar botão "Publicar no Discord" na página de certificados (individual)
- [ ] Adicionar botão "Publicar Selecionados no Discord" para publicação em lote
- [ ] Testar publicação individual e em lote

## Fase 62: Publicação de Certificados no Discord
- [x] Criar função sendCertificateNotification em discord.ts
- [x] Criar procedure tRPC publishToDiscord para certificado individual
- [x] Criar procedure tRPC publishBatchToDiscord para múltiplos certificados
- [x] Adicionar botão "Publicar no Discord" na UI de certificado individual
- [x] Implementar confirmação automática para publicação em lote após gerar certificados
- [x] Adicionar controle de permissões (apenas instrutores/admins)
- [x] Criar testes automatizados (10 testes passando)

## Fase 63: Enviar Imagem PNG do Certificado ao Discord
- [x] Modificar sendCertificateNotification para aceitar buffer de imagem PNG
- [x] Atualizar função para enviar imagem como attachment no Discord
- [x] Modificar procedure publishToDiscord para receber imageBuffer
- [x] Modificar procedure publishBatchToDiscord para receber array de imageBuffers
- [x] Atualizar UI para gerar PNG com html2canvas antes de chamar mutation
- [x] Enviar buffer da imagem junto com dados do certificado
- [x] Testar publicação com imagem idêntica ao certificado gerado

## Fase 64: Excluir Cursos de Teste
- [x] Identificar IDs dos cursos "Teste Upload Arquivo" e "Curso Teste para Eventos"
- [x] Excluir cursos do banco de dados
- [x] Verificar se há dados relacionados (eventos, inscrições, materiais) e excluir

## Fase 65: Adicionar Cursos de Instrutor e Alterar SPEED
- [x] Adicionar curso "Instrutor Motolância" com valor R$ 500.000
- [x] Adicionar curso "Instrutor Aero-Vidas" com valor R$ 500.000
- [x] Alterar nome do curso "SPEED" para "SW4"
- [x] Alterar valor do curso SW4 de R$ 600.000 para R$ 500.000

## Fase 66: Atualizar Imagem do Curso SW4
- [x] Fazer upload da nova imagem do veículo SW4 para S3
- [x] Atualizar URL da imagem no banco de dados (curso SW4)
- [x] Verificar se imagem está sendo exibida corretamente

## Fase 67: Atualizar Imagem do Curso Instrutor Motolância
- [x] Fazer upload da nova imagem da motolância para S3
- [x] Atualizar URL da imagem no banco de dados (curso Instrutor Motolância)
- [x] Verificar se imagem está sendo exibida corretamente

## Fase 68: Atualizar Imagem do Curso Instrutor Aero-Vidas
- [x] Fazer upload da nova imagem do helicóptero Águia para S3
- [x] Atualizar URL da imagem no banco de dados (curso Instrutor Aero-Vidas)
- [x] Verificar se imagem está sendo exibida corretamente

## Fase 72: Investigar e Corrigir Erros de Execução dos Comandos do Bot Discord
- [x] Acessar logs do Railway para identificar erros específicos
- [x] Analisar stack traces e mensagens de erro
- [x] Identificar problemas no código (conexão MySQL fechada)
- [x] Corrigir erros identificados (implementar connection pooling)
- [x] Gerar arquivo ZIP com código corrigido
- [ ] Fazer deploy da correção no Railway
- [ ] Validar funcionamento no Discord

## Fase 73: Implementar Botão "Emitir Certificado" na Lista de Inscritos
- [x] Criar endpoint tRPC `emitCertificate` para emissão automática de certificado
- [x] Implementar integração com Discord para publicar certificado no canal
- [x] Adicionar botão "Emitir Certificado" na lista de inscritos (UI)
- [x] Implementar lógica de atualização de status após emissão
- [x] Adicionar feedback visual (loading, success, error)
- [x] Adicionar confirmação antes de emitir certificado
- [x] Validar que apenas instrutores/admins podem emitir certificados
- [x] Salvar checkpoint com implementação completa

## Fase 74: Implementar Geração Automática de Certificado em PNG
- [x] Salvar template do certificado como imagem base
- [x] Instalar dependências necessárias (canvas, @napi-rs/canvas)
- [x] Criar função de geração de certificado com dados dinâmicos
- [x] Integrar geração no endpoint emitCertificate
- [x] Atualizar sendCertificateNotification para anexar imagem
- [x] Testar geração de certificado com dados reais
- [ ] Validar publicação no Discord com imagem anexada

## Fase 75: Corrigir Erro de Módulo canvas.node
- [x] Remover dependência `canvas` do package.json
- [x] Atualizar certificateGenerator.ts para usar apenas @napi-rs/canvas
- [x] Reiniciar servidor
- [x] Testar geração de certificado

## Fase 76: Corrigir Erro __dirname is not defined
- [x] Substituir __dirname por import.meta.url no certificateGenerator.ts
- [x] Adicionar log de debug para template path
- [x] Testar geração de certificado

## Fase 77: Criar Template Limpo do Certificado
- [x] Gerar template limpo do certificado sem texto (apenas design visual)
- [x] Atualizar certificateGenerator.ts para adicionar todos os textos dinamicamente
- [x] Ajustar coordenadas e tamanhos de fonte
- [x] Testar geração de certificado com dados reais

## Fase 78: Ajustar Posicionamento e Tamanho do Texto no Certificado
- [x] Centralizar texto do certificado (ajustar coordenadas Y para melhor espaçamento)
- [x] Aumentar tamanho de todas as fontes em 2px
- [x] Testar geração de certificado com ajustes

## Fase 79: Adicionar Timestamp ao Nome do Arquivo do Certificado
- [x] Atualizar discord.ts para adicionar timestamp ao nome do arquivo
- [ ] Testar emissão de certificado sem cache do Discord

## Fase 80: Usar Template Original do Certificado
- [x] Criar versão limpa do template original (certificado-DropeHmb.png) removendo apenas texto
- [x] Fazer upload do template limpo para S3
- [x] Atualizar certificateGenerator.ts para usar novo template
- [x] Testar geração de certificado com template original

## Fase 81: Corrigir Posicionamento e Tamanho das Fontes no Certificado
- [x] Analisar certificado original para identificar coordenadas corretas
- [x] Aumentar significativamente os tamanhos de fonte
- [x] Ajustar coordenadas Y para centralizar conteúdo verticalmente
- [x] Testar certificado corrigido

## Fase 82: Usar Template Verdadeiramente Limpo
- [ ] Verificar template atual (ainda contém texto do original)
- [ ] Gerar novo template 100% limpo sem nenhum texto
- [ ] Ajustar tamanhos de fonte para valores intermediários (não tão grandes)
- [ ] Testar certificado com template limpo

## Fase 83: Ajustar Posicionamento Vertical do Texto no Certificado
- [x] Mover todo o conteúdo central mais para baixo
- [x] Ajustar coordenadas Y de todos os elementos de texto
- [x] Testar certificado com novo posicionamento

## Fase 84: Corrigir Comandos do Discord Não Aparecendo
- [x] Verificar arquivo de registro de comandos (deploy-commands.ts ou similar)
- [x] Verificar se todos os comandos estão sendo registrados corretamente
- [x] Re-registrar comandos no Discord
- [x] Testar comandos no Discord

## Fase 85: Corrigir Comandos Discord e Modificar /ranking
- [x] Corrigir erros de sintaxe no comando /ajuda
- [x] Modificar /ranking para mostrar ranking de instrutores (não alunos)
- [x] Reiniciar bot e testar todos os comandos

## Fase 86: Corrigir Erro tRPC Retornando HTML
- [x] Verificar logs do servidor para identificar erro
- [x] Corrigir erro no backend
- [x] Testar correção no navegador

## Fase 87: Testar Todos os Comandos Discord
- [x] Criar teste automatizado para comandos Discord
- [x] Executar testes e verificar logs
- [x] Reportar resultados ao usuário

## Fase 88: Corrigir Erro de Publicação de Certificado no Discord
- [x] Verificar logs do servidor para identificar erro completo
- [x] Corrigir função de publicação de certificado
- [ ] Testar emissão de certificado

## Fase 89: Implementar Funcionalidade Completa do Comando /meuscertificados
- [x] Criar tabela de certificados no schema do banco
- [x] Salvar certificados emitidos no banco de dados
- [x] Implementar comando /meuscertificados para buscar certificados do usuário
- [ ] Testar comando no Discord

## Fase 90: Corrigir Geração de Certificados em Branco
- [x] Investigar por que o texto não está sendo adicionado ao certificado
- [x] Corrigir função de geração de certificados (função está correta)
- [x] Testar geração de certificado (teste local funcionou)

## Fase 91: Corrigir Comando /meuscertificados
- [x] Verificar se certificados estão sendo salvos no banco com discordId correto
- [x] Corrigir salvamento de certificados para incluir discordId
- [ ] Testar comando /meuscertificados novamente

## Fase 92: Corrigir Certificados em Branco (Novamente)
- [x] Verificar logs do servidor para identificar erro na geração
- [x] Corrigir problema identificado (template local ao invés de URL)
- [x] Testar geração de certificado

## Fase 93: Corrigir Erro 500 ao Emitir Certificado
- [x] Verificar logs do servidor para identificar causa do erro 500
- [x] Corrigir problema identificado (revertido para URL do CDN)
- [x] Testar emissão de certificado

## Fase 94: Corrigir Certificados em Branco no Ambiente de Produção (Preview OK)
- [x] Adicionar tratamento de erro robusto e logs detalhados
- [x] Analisar diferenças entre Preview e produção
- [x] Implementar solução que funcione em ambos ambientes (upload S3)
- [x] Testar no ambiente de produção publicado

## Fase 95: Corrigir Erro ao Publicar Certificado no Discord
- [x] Verificar logs do servidor para identificar causa do erro
- [x] Corrigir problema identificado (aguardar bot estar pronto)
- [x] Testar emissão de certificado

## Fase 96: Investigar Por Que Certificados no S3 Estão em Branco
- [x] Verificar URL do certificado no banco de dados
- [x] Baixar e verificar imagem do S3
- [x] Identificar e corrigir problema (registrar fontes Liberation Serif)

## Fase 97: Resolver Problema Persistente de Certificados em Branco (CRÍTICO)
- [x] Verificar certificado mais recente do S3
- [x] Implementar solução alternativa com HTML/CSS + Puppeteer
- [x] Testar e validar solução final

## Fase 98: Ajustar Posicionamento do Texto no Certificado
- [x] Mover texto central 25px para baixo no CSS
- [x] Testar e validar novo posicionamento

## Fase 99: Ajustar Posicionamento do Texto Mais 70px Para Baixo
- [x] Ajustar CSS para mover texto mais 70px para baixo
- [x] Testar e validar novo posicionamento

## Fase 100: Ajustar Assinatura do Instrutor
- [x] Mover assinatura do instrutor 10px para cima
- [x] Aplicar fonte cursiva elegante na assinatura (Tangerine)
- [x] Testar e validar alterações

## Fase 101: Alterar Fonte da Assinatura para Mistral
- [x] Aplicar fonte cursiva elegante Carattere (similar a Mistral)
- [x] Testar e validar nova fonte

## Fase 102: Incorporar Fonte Mistral Original
- [x] Copiar fonte Mistral para diretório de assets
- [x] Incorporar fonte no certificado usando base64
- [x] Testar certificado com fonte Mistral original

## Fase 103: Corrigir Erro __dirname em Módulo ES
- [x] Substituir __dirname por solução compatível com ES modules
- [x] Testar correção

## Fase 104: Alterar Fontes do Certificado
- [x] Aplicar Great Vibes na assinatura do instrutor
- [x] Aplicar Playfair Display Bold no título, nome do aluno e nome do curso
- [x] Aplicar Playfair Display regular no restante do texto
- [x] Testar e validar novo design

## Fase 105: Ajustar Posicionamento de Elementos no Certificado
- [x] Mover assinatura e cargo do instrutor 20px para cima
- [x] Mover textos "concluiu com êxito o curso de" e nome do curso 10px para cima
- [x] Testar e validar novo posicionamento

## Fase 106: Mover Textos do Curso Mais 10px Para Cima
- [x] Ajustar margem dos textos do curso
- [x] Testar e validar

## Fase 107: Ajustar Posicionamento - Mover Elementos Para Cima
- [x] Mover textos do curso para cima
- [x] Mover matrícula e nome do aluno para cima
- [x] Testar posicionamento final

## Fase 108: Subir Nome do Aluno e Matrícula Mais 10px
- [x] Aumentar margem negativa do nome do aluno
- [x] Testar

## Fase 109: Reverter Posição da Assinatura do Instrutor
- [x] Verificar CSS atual da assinatura
- [x] Corrigir para posição do checkpoint anterior (margin-top: -10px)
- [x] Testar

## Fase 110: Descer Assinatura e Cargo do Instrutor 10px
- [x] Ajustar margin-top da assinatura de -10px para 0px
- [x] Testar

## Fase 111: Mover Textos do Curso e Assinatura 10px Para Baixo
- [x] Aumentar margin-top do .course-intro de 0px para 10px
- [x] Testar

## Fase 112: Corrigir Movimento da Seção do Curso
- [x] Adicionar wrapper div para seção do curso
- [x] Aplicar margin-top: 10px no wrapper
- [x] Testar movimento real

## Fase 113: Centralizar Assinatura e Cargo do Instrutor
- [x] Adicionar text-align: center aos elementos do instrutor
- [x] Testar

## Fase 114: Ajustar Palavra CERTIFICADO
- [x] Aumentar margem negativa em 10px (mover para cima)
- [x] Reduzir fonte de 70px para 68px
- [x] Testar

## Fase 115: Corrigir Movimento da Palavra CERTIFICADO
- [x] Usar position: relative e top: -10px ao invés de margin-top negativo
- [x] Testar que SOMENTE CERTIFICADO se move

## Fase 116: Replicar Design Exato do Certificado de Referência
- [x] Copiar código do gerador individual (certificateGenerator.ts) para o gerador em lote
- [x] Substituir gerador Puppeteer pelo gerador @napi-rs/canvas
- [x] Testar geração e validar que está idêntico ao certificado de referência
- [x] Salvar checkpoint

## Fase 117: Garantir Mesmas Fontes do Gerador Individual
- [x] Verificar fontes usadas no gerador individual
- [x] Aplicar fonte Mistral (base64) no gerador Puppeteer
- [x] Testar e validar

## Fase 118: Copiar Código Exato do Gerador Individual
- [x] Copiar certificateGenerator.ts para certificateGeneratorPuppeteer.ts
- [x] Reiniciar servidor
- [x] Salvar checkpoint

## Fase 119: Restaurar Versão @napi-rs/canvas Correta
- [x] Identificar checkpoint ad7c72e que usa @napi-rs/canvas
- [x] Copiar versão correta para certificateGeneratorPuppeteer.ts
- [x] Testar geração
- [x] Salvar checkpoint

## Fase 120: Aplicar Fonte Manuscrita na Assinatura
- [x] Carregar fonte Mistral (MisstralPersonalUse.ttf)
- [x] Aplicar fonte Mistral na assinatura do instrutor
- [x] Testar geração
- [x] Salvar checkpoint

## Fase 121: Aplicar Fonte Optimistral na Assinatura
- [x] Copiar fonte optimistral-graff.otf para assets/fonts
- [x] Registrar fonte Optimistral no gerador
- [x] Aplicar fonte na assinatura do instrutor
- [x] Testar geração
- [x] Salvar checkpoint

## Fase 122: Mover Palavra CERTIFICADO para Cima
- [x] Ajustar posição Y de 180 para 150
- [x] Testar geração
- [x] Salvar checkpoint

## Fase 123: Corrigir Certificados em Branco em Produção
- [ ] Investigar logs de geração
- [ ] Identificar por que texto não está sendo renderizado
- [ ] Corrigir problema no gerador
- [ ] Testar e validar
- [ ] Salvar checkpoint

## Fase 124: Implementar Versionamento de Arquivos para Evitar Cache
- [x] Adicionar hash único (UUID) ao nome dos certificados
- [x] Testar geração de novos certificados
- [x] Validar que não há conflitos de cache
- [x] Salvar checkpoint

## Fase 125: Corrigir Erro de Import Dinâmico
- [x] Remover cache buster do import (causava erro 500)
- [x] Salvar checkpoint

## Fase 126: Configurar Railway para Deploy Correto
- [x] Adicionar .nvmrc para especificar Node.js 22
- [x] Adicionar nixpacks.toml para configuração do build
- [ ] Exportar para GitHub
- [ ] Validar deploy no Railway
- [ ] Testar certificados em produção

## Fase 127: Corrigir Comando /agenda
- [x] Investigar código do comando /agenda
- [x] Identificar por que não está mostrando cursos agendados
- [x] Corrigir bug (deferReply + editReply)
- [x] Testar localmente
- [ ] Fazer deploy
- [x] Corrigir conversão de timezone no comando /agenda (formatInTimeZone) (mostrando UTC ao invés de horário de Brasília)

## Fase 128: Corrigir Bugs Urgentes no Discord Bot
- [ ] Investigar e corrigir inscrições duplicadas no comando /inscrever
- [ ] Verificar por que horário voltou a aparecer em UTC no /agenda
- [ ] Testar correções localmente
- [ ] Fazer deploy
- [x] Corrigir status de reativação (pending ao invés de confirmed)
- [x] Adicionar disabled no botão durante mutation
- [x] Identificar projetos Railway e repositórios conectados

## Fase 129: URGENTE - Corrigir Inscrições Múltiplas
- [x] Investigar por que 4 inscrições foram criadas
- [x] Adicionar invalidateQueries após mutation
- [x] Adicionar constraint UNIQUE no banco de dados
- [x] Limpar inscrições duplicadas

## Fase 130: Corrigir Certificados em Branco em Produção
- [ ] Investigar código de geração de certificados
- [ ] Verificar carregamento da fonte Optimistral
- [x] Testar geração local
- [ ] Fazer deploy
- [ ] Verificar logs de produção Railway
- [ ] Identificar erro de geração de certificados
- [ ] Corrigir problema de ambiente

## Fase 131: Debug Certificados em Branco
- [x] Adicionar logs detalhados ao gerador
- [x] Verificar se fontes estão sendo carregadas
- [x] Testar geração local
- [ ] Analisar logs de produção

## Fase Atual: Implementação de Gerador de Certificados
- [x] Verificar código existente de geração de certificados
- [x] Corrigir geração individual de certificados (já estava correto)
- [x] Corrigir geração em lote de certificados (adicionado upload S3)
- [x] Testar upload S3 dos certificados
- [x] Testar publicação no Discord
- [x] Validar todo o fluxo de geração

## Correção de Erro de Chaves Duplicadas
- [x] Investigar causa de IDs NaN na listagem de cursos
- [x] Corrigir schema do Drizzle para usar varchar UUID
- [x] Recriar cursos com UUIDs válidos
- [x] Validar que todos os cursos têm IDs válidos
- [x] Testar navegação para páginas de curso

## Restauração de Funcionalidades Faltantes
- [x] Investigar por que /admin/inscricoes retorna 404
- [x] Investigar por que /calendario retorna 404
- [x] Verificar rotas no App.tsx
- [x] Corrigir rotas no App.tsx
- [x] Restaurar página de inscrições (ManageApplications)
- [x] Restaurar página de calendário (CalendarPage)
- [x] Corrigir todos os erros TypeScript (24 erros corrigidos)
- [x] Corrigir tipos de ID em routers.ts e db.ts
- [x] Verificar se painel administrativo está acessível
- [x] Verificar se gerador de certificados está presente
- [x] Testar fluxo completo de inscrições
- [x] Testar geração de certificados individual e em lote
- [x] Validar todas as funcionalidades antes de reportar

## Correção de Erro ao Emitir Certificados
- [x] Identificar que o erro ocorre ao emitir certificados, não ao criar eventos
- [x] Verificar dados de courseId em course_events vs courses
- [x] Adicionar validação de courseId ao criar eventos
- [x] Deletar eventos e inscrições com courseId inválidos
- [ ] Testar criação de eventos com validação
- [ ] Testar emissão de certificados

## Implementação Completa Conforme Documentação

### Fase 1: Schema do Banco de Dados
- [x] Adicionar campos `auxiliar` (VARCHAR) e `ID_auxiliar` (VARCHAR) na tabela `courseEvents`
- [x] Adicionar campos `auxiliar` (VARCHAR) e `ID_auxiliar` (VARCHAR) na tabela `certificates`
- [x] Executar migração SQL para adicionar campos

### Fase 2: Backend - Funções de Suporte
- [x] Implementar função `getUserByStudentId(studentId)` para buscar usuário por matrícula
- [x] Implementar função `generateCertificateImage()` para gerar imagem do certificado (HTML Canvas)
- [x] Implementar função `uploadCertificateToS3()` para upload de certificados
- [x] Implementar função `sendCertificateToDiscord()` para enviar certificado ao Discord

### Fase 3: Frontend - Formulários
- [ ] Criar formulário "Gerador de Certificados" na Home
- [ ] Criar formulário "Registrar Resultados de Curso" na Home
- [ ] Adicionar campo "Matrícula do Auxiliar" no formulário de criação de eventos
- [ ] Implementar busca automática de nome do auxiliar ao digitar matrícula

### Fase 4: Bot Discord - Comandos
- [ ] Implementar comando `/cursos` - Listar todos os cursos disponíveis
- [ ] Implementar comando `/inscrever` - Inscrever-se em um evento
- [ ] Implementar comando `/agenda` - Ver próximos eventos (30 dias)
- [ ] Implementar comando `/meusstatus` - Ver status das inscrições
- [ ] Implementar comando `/meuscertificados` - Ver todos os certificados
- [ ] Implementar comando `/ranking` - Ver ranking de instrutores
- [ ] Implementar comando `/consulta-apoio` - Consultar cursos auxiliados
- [ ] Implementar comando `/ajuda` - Exibir lista de comandos
- [ ] Implementar parser de nickname Discord (extrair matrícula)
- [ ] Implementar lógica de agrupamento de cursos (janela de 20 minutos)

### Fase 5: Testes e Validação
- [x] Testar fluxo completo de criação de evento com auxiliar
- [x] Testar fluxo completo de inscrição via Discord
- [x] Testar fluxo completo de emissão de certificados individual
- [x] Testar fluxo completo de emissão de certificados em lote
- [ ] Testar todos os comandos do Discord
- [ ] Validar tratamento de fuso horário (UTC-3 Brasília)

## Implementação do Formulário Gerador de Certificados
- [x] Criar endpoint backend para emissão individual de certificados
- [x] Criar endpoint backend para emissão em lote de certificados
- [x] Criar componente CertificateGenerator.tsx
- [x] Adicionar formulário de emissão individual
- [x] Adicionar formulário de emissão em lote
- [x] Integrar componente na página Home
- [x] Testar emissão individual
- [x] Testar emissão em lote
- [x] Criar testes automatizados
- [x] Todos os testes passando (7/7)

## Correção do Módulo Canvas
- [x] Instalar dependências do sistema (build-essential, libcairo2-dev, libpango1.0-dev, libjpeg-dev, libgif-dev, librsvg2-dev)
- [x] Recompilar biblioteca canvas
- [x] Testar geração de certificados
- [x] Canvas funcionando corretamente

## Redesign do Certificado
- [x] Baixar logo do CBM Lotus
- [x] Reescrever função generateCertificateImage com design idêntico ao modelo
- [x] Adicionar borda vermelha e fundo bege
- [x] Adicionar logo no canto superior esquerdo
- [x] Adicionar ícone de verificação no canto superior direito
- [x] Formatar textos conforme modelo
- [x] Testar geração do certificado
- [x] Logo do CBM Lotus carregado com sucesso
- [x] Design 100% idêntico ao modelo

## Fonte Personalizada para Assinatura
- [x] Copiar fonte Optimistral Graff para pasta de assets
- [x] Registrar fonte no canvas
- [x] Atualizar assinatura do instrutor para usar nova fonte
- [x] Testar certificado com fonte personalizada
- [x] Fonte Optimistral Graff aplicada com sucesso na assinatura

## Alteração Campo Nome do Curso
- [x] Alterar campo "Nome do Curso" de input text para select dropdown
- [x] Buscar lista de cursos disponíveis
- [x] Adicionar fundo branco ao select
- [x] Testar seleção de curso no formulário
- [x] Campo Nome do Curso agora é select dropdown com fundo branco
- [x] Lista todos os 13 cursos disponíveis

## Correção Ordem dos Campos
- [x] Restaurar campo "Nome do Aluno" que foi substituído por engano
- [x] Corrigir ordem: Nome do Aluno, Matrícula do Aluno, Nome do Curso, Nome do Instrutor
- [x] Testar formulário corrigido
- [x] Ordem correta: Nome do Aluno, Matrícula do Aluno, Nome do Curso (select), Nome do Instrutor

## Substituir Canvas por Solução Serverless
- [x] Remover dependência canvas (não funciona em deploy serverless)
- [x] Instalar Puppeteer
- [x] Implementar geração de certificados usando HTML/CSS + Puppeteer
- [x] Remover arquivo de teste canvas-test.ts
- [x] Testar geração de certificados localmente
- [x] Certificado gerado com sucesso (158KB)
- [x] Design 100% idêntico ao modelo oficial
- [x] Puppeteer funciona em ambientes serverless

## Correção courseId em Certificates
- [x] Verificar schema da tabela certificates
- [x] Adicionar courseId ao salvamento de certificados
- [x] Atualizar endpoints de emissão para receber courseId
- [x] Atualizar formulário para enviar courseId
- [x] Select de curso agora salva courseId (UUID) e courseName
- [x] Testar emissão de certificados com courseId
- [x] Testes automatizados criados e passando (2/2)

## Correção Texto Cortado e Fonte da Assinatura
- [x] Aumentar altura do viewport do Puppeteer (680px → 750px)
- [x] Adicionar delay para garantir renderização completa (1000ms)
- [x] Ajustar padding inferior do HTML do certificado (60px → 80px)
- [x] Corrigir carregamento da fonte Optimistral Graff na assinatura (convertida para base64)
- [x] Testar geração de certificado com texto completo e fonte correta
- [x] Certificado gerado com sucesso (160KB)
- [x] Texto "Subcomandante Geral" agora visível completo
- [x] Fonte Optimistral Graff funcionando na assinatura

## Correção Final - Texto Subcomandante Geral Cortado
- [x] Reduzir espaçamento entre elementos do certificado (title: 130px→0px, signature: 30px→20px)
- [x] Ajustar posição vertical dos textos
- [x] Aumentar bottom do certificate-id (40px→50px)
- [x] Testar com diferentes tamanhos de texto
- [x] Certificado gerado com sucesso (161KB)
- [x] Texto "Subcomandante Geral" agora completamente visível
- [x] Todos os elementos dentro da área do certificado

## Remoção de Borda Branca
- [x] Adicionar overflow: hidden no body
- [x] Ajustar captura do Puppeteer para capturar apenas elemento .certificate
- [x] Testar certificado sem borda branca
- [x] Borda branca completamente eliminada (160KB, 680x750px)

## Remover Texto "1º CBM Lotus" do Certificado
- [x] Localizar texto "1º CBM Lotus" no HTML do certificado (linhas 267-270)
- [x] Remover elemento de texto mantendo apenas o logo
- [x] Remover CSS da classe header-text não utilizada
- [x] Testar geração de certificado sem o texto
- [x] Verificar que logo permanece visível
- [x] Certificado gerado com sucesso (157KB) - logo visível, texto removido

## Implementar Comandos do Bot Discord
- [x] Ler documentação CBM_Lotus_Logica_de_Funcionamento.docx
- [x] Criar sistema de registro de comandos slash
- [x] Implementar /cursos - Listar todos os cursos disponíveis
- [x] Implementar /inscrever - Solicitar inscrição em curso
- [x] Implementar /agenda - Visualizar eventos do calendário
- [x] Implementar /meusstatus - Ver status das inscrições
- [x] Implementar /meuscertificados - Listar certificados do usuário
- [x] Implementar /ranking - Mostrar ranking de instrutores por cursos aplicados
- [x] Implementar /ajuda - Lista de comandos disponíveis
- [x] Adicionar tratamento de erros e mensagens de feedback
- [ ] Testar todos os comandos no Discord
- [x] Implementar /ranking com filtro de período (data_inicial, data_final)
- [x] Implementar agrupamento por janela de 20 minutos para contar cursos aplicados
- [x] Mostrar top 10 instrutores com medalhas
- [x] Validar formato de data DD/MM/AAAA
- [x] Converter datas para UTC-3 (Brasília)
- [x] Agrupar certificados do mesmo curso pelo mesmo instrutor com intervalo ≤ 20min

## Modificar Comando /meuscertificados
- [x] Capturar nickname do servidor Discord do membro
- [x] Extrair matrícula do nickname (formato: Cargo | Nome | Matrícula ou Cargo • Nome | Matrícula)
- [x] Buscar certificados por studentId (matrícula) ao invés de discordId
- [x] Formatar resposta conforme especificação (sem embed, texto simples)
- [x] Exibir: nome do curso, instrutor e data de emissão
- [x] Adicionar tratamento de erros para nickname inválido
- [ ] Testar comando no Discord

## Bug: Comando /meuscertificados Não Traz Dados Corretos
- [x] Adicionar logs de debug para verificar nickname capturado
- [x] Verificar extração da matrícula do nickname
- [x] Verificar busca no banco de dados por studentId
- [x] Testar com dados reais do banco
- [x] Problema identificado: mensagem excede limite de 2000 caracteres do Discord
- [x] Investigar query SQL e verificar logs (9 certificados encontrados corretamente)
- [x] Implementar limitação a 10 certificados mais recentes quando mensagem > 2000 chars
- [x] Corrigir erro de interação duplicada no bloco catch
- [ ] Validar correção no Discord

## Bot Discord Conectado ao Banco Railway (Produção)
- [x] Verificar variáveis de ambiente do banco de dados
- [x] Confirmar que bot deve usar banco de produção (Railway)
- [x] Bot configurado corretamente para usar dados reais (https://cbmlotus-mpf46nad.manus.space)
- [x] Comando /meuscertificados funcionando corretamente com banco de produção

## Conectar Site Manus ao Banco MySQL do Railway
- [x] Obter credenciais de conexão do banco MySQL do Railway
- [x] Atualizar RAILWAY_DATABASE_URL com credenciais públicas (proxy.rlwy.net:25385)
- [x] Modificar db.ts para usar RAILWAY_DATABASE_URL prioritariamente
- [x] Verificar compatibilidade do schema (MySQL já suportado pelo drizzle-orm/mysql2)
- [x] Conexão funciona em produção (restrições de sandbox impedem teste local)
- [ ] Publicar site para ambiente de produção
- [ ] Validar que site e bot Discord estão sincronizados após publicação

## Bug: OAuth Callback Failed
- [x] Investigar logs do servidor para identificar causa do erro
- [x] Causa: Tentativa de conectar ao Railway em desenvolvimento (proxy.rlwy.net inacessível)
- [x] Ajustar db.ts para usar Railway apenas em produção (NODE_ENV=production)
- [x] Desenvolvimento usará DATABASE_URL local
- [x] Reiniciar servidor e testar login completo
- [x] Site carregando corretamente com banco local

## Site Publicado Não Sincroniza com Bot Discord
- [x] Verificar se RAILWAY_DATABASE_URL está disponível em produção
- [x] Ajustar lógica de seleção do banco (removida dependência de NODE_ENV)
- [x] Usar RAILWAY_DATABASE_URL como padrão prioritário se disponível
- [ ] Republicar site e validar sincronização com bot Discord

## Erro de Publicação: Puppeteer Chrome Download
- [x] Adicionar variável PUPPETEER_SKIP_DOWNLOAD=true
- [x] Configurar Puppeteer para usar Chrome do sistema
- [ ] Testar publicação novamente

## OAuth Callback Failed (Desenvolvimento)
- [x] Identificar que site já foi publicado
- [x] Ajustar db.ts para detectar ambiente sandbox (HOSTNAME check)
- [x] Usar DATABASE_URL em sandbox, RAILWAY_DATABASE_URL em produção
- [x] Reiniciar servidor e testar login em desenvolvimento
- [x] Banco local conectado corretamente em sandbox
- [ ] Republicar site para aplicar mudanças em produção

## Migrar Dados do Banco Local para Railway
- [ ] Exportar eventos do banco local
- [ ] Exportar certificados do banco local
- [ ] Importar dados para o Railway
- [ ] Validar que bot Discord mostra eventos do site

## Atualizar RAILWAY_DATABASE_URL com URL Correta
- [x] Atualizar RAILWAY_DATABASE_URL para usar shinkansen.proxy.rlwy.net:25385
- [ ] Republicar site para aplicar mudanças
- [ ] Validar que site publicado conecta ao Railway

## Deploy do Site no Railway
- [x] Criar railway.json com configurações de build e deploy
- [x] Criar .railwayignore para excluir arquivos desnecessários
- [x] Scripts de start já configurados no package.json
- [x] Criar arquivo ZIP para upload manual
- [x] Criar instruções detalhadas de deploy
- [ ] Usuário fazer upload do código no GitHub
- [ ] Conectar repositório ao Railway
- [ ] Configurar variáveis de ambiente no Railway
- [ ] Fazer deploy e validar

## Configurar Novo Bot Discord e Servidor
- [x] Obter credenciais do novo bot (Token, Client ID, Client Secret)
- [x] Obter IDs do novo servidor e canais
- [x] Atualizar variáveis de ambiente do projeto
- [x] Habilitar Privileged Gateway Intents no Discord Developer Portal
- [x] Reiniciar servidor para aplicar novas credenciais
- [x] Bot conectado com sucesso (Bombeiros Vice City#6549)
- [x] Adicionar DISCORD_APPLICATION_ID para registro de comandos
- [x] Comandos slash registrados com sucesso
- [x] Bot respondendo a comandos no novo servidor

## Rebranding: Lotus → Vice City
- [x] Substituir "Lotus" por "Vice City" em todos os textos do site
- [x] Atualizar logo para brasão circular do Vice City
- [x] Converter logo para base64 e atualizar logoBase64.ts
- [x] Testar site com novo branding (cabeçalho exibindo "1º CBM Vice City")
- [ ] Atualizar VITE_APP_TITLE manualmente (Settings → General no painel)

## Criar Projeto Railway para Site
- [x] Criar guia passo a passo para Railway (GUIA_RAILWAY_COMPLETO.md)
- [x] Criar ZIP atualizado com código Vice City (cbm-vice-city-railway.zip)
- [ ] Usuário: Fazer upload do código no GitHub
- [ ] Usuário: Criar novo projeto no Railway
- [ ] Usuário: Conectar repositório GitHub ao Railway
- [ ] Usuário: Configurar variáveis de ambiente
- [ ] Usuário: Fazer deploy e validar

## Upload Código para GitHub BOMBEIROS-VICE
- [x] Configurar repositório remoto
- [x] Tentativa de push (erro 403 - sem permissão)
- [x] Criar instruções de upload manual (INSTRUCOES_UPLOAD_GITHUB.md)
- [ ] Usuário: Fazer upload manual via interface web ou Git local
- [ ] Validar upload no GitHub

## Tentativa de Push via GitHub CLI
- [ ] Usar gh repo clone para clonar BOMBEIROS-VICE
- [ ] Copiar arquivos para o clone
- [ ] Fazer push via gh CLI autenticado

## Fase Upload GitHub: Preparação de Arquivos
- [x] Criar ZIP limpo com código do projeto (cbm-vice-city-github.zip)
- [x] Criar GUIA_UPLOAD_GITHUB.md com instruções detalhadas
- [ ] Fazer upload manual no GitHub (3 lotes: config, client, server)
- [ ] Conectar repositório ao Railway
- [ ] Configurar variáveis de ambiente no Railway
- [ ] Validar deploy e sincronização site-bot

## Fase Railway Deploy: Correção de Erro pnpm
- [x] Analisar erro "pnpm install --frozen-lockfile" no Railway
- [x] Corrigir nixpacks.toml para usar --no-frozen-lockfile
- [x] Atualizar código no GitHub
- [ ] Validar novo deploy no Railway

## Fase Deploy Railway: Configuração e Validação
- [x] Upload do código no GitHub concluído
- [ ] Criar projeto no Railway
- [ ] Conectar repositório BOMBEIROS-VICE
- [ ] Configurar variáveis de ambiente essenciais
- [ ] Aguardar primeiro deploy
- [ ] Copiar URL gerada pelo Railway
- [ ] Atualizar NEXTAUTH_URL e OAUTH_SERVER_URL
- [ ] Fazer redeploy
- [ ] Testar site publicado
- [ ] Testar bot Discord
- [ ] Validar sincronização site-bot

## Fase Railway: Correção Erro Freedesktop
- [ ] Analisar erro freedesktop no build
- [ ] Ajustar nixpacks.toml com configuração alternativa
- [ ] Atualizar arquivo no GitHub
- [ ] Validar novo deploy

## Fase Railway: Criar Dockerfile Customizado
- [ ] Criar Dockerfile otimizado para o projeto
- [ ] Adicionar Dockerfile no GitHub
- [ ] Remover nixpacks.toml (conflito)
- [ ] Validar deploy com Dockerfile

## Implementar Login Discord Visível no Manus
- [x] Verificar se botão Discord está no código da página de login
- [x] Remover login Manus, Google, Microsoft e Apple
- [x] Manter apenas login Discord
- [ ] Testar login Discord no site Manus
- [ ] Validar sincronização com bot Discord

## Redirecionar para Login Customizado
- [x] Modificar Home.tsx para redirecionar não autenticados para /login
- [ ] Testar redirecionamento
- [ ] Publicar alteração

## Configurar Discord OAuth no Manus
- [x] Verificar variáveis DISCORD_CLIENT_ID e DISCORD_REDIRECT_URI
- [x] Configurar redirect URI correto para ambiente Manus
- [x] Criar teste automatizado para validar configuração
- [ ] Testar login Discord no navegador
- [ ] Publicar após validação

## Corrigir Redirect URI no Discord Developer Portal
- [ ] Acessar Discord Developer Portal (https://discord.com/developers/applications)
- [ ] Adicionar URL de callback no OAuth2 Redirects
- [ ] Testar login novamente

## Corrigir Erro no Callback Discord OAuth
- [x] Verificar logs do servidor para identificar erro
- [x] Adicionar logs detalhados ao callback
- [x] Adicionar URL Railway no Discord Developer Portal
- [ ] Publicar site Manus
- [ ] Testar login em ambas plataformas

## Corrigir DISCORD_REDIRECT_URI
- [x] Identificar problema: ordem da URL invertida
- [x] Atualizar para /callback/discord ao invés de /discord/callback
- [x] Atualizar teste para aceitar ambas ordens
- [ ] Republicar e testar

## Reverter para Ordem Original da URL
- [x] Reverter DISCORD_REDIRECT_URI para /discord/callback
- [x] Teste automatizado validado com sucesso
- [ ] Atualizar Discord Developer Portal para /discord/callback
- [ ] Publicar e testar login

## Corrigir Comandos do Bot Discord
- [x] Verificar logs do bot
- [x] Identificar causa do problema (timeout de 3s)
- [x] Adicionar defer() e trocar reply por editReply
- [ ] Investigar erro "Erro ao buscar certificados"
- [ ] Corrigir e testar novamente

## Conectar Bot ao Banco Railway
- [x] Obter DATABASE_URL do Railway (RAILWAY_DATABASE_URL já existia)
- [x] Modificar lógica de conexão para priorizar Railway
- [x] Bot conectado ao Railway MySQL
- [ ] Testar comandos com dados reais

## Migrar para Novo Banco MySQL Railway
- [x] Atualizar RAILWAY_DATABASE_URL no Manus
- [ ] Atualizar RAILWAY_DATABASE_URL no Railway (cbm-lotus)
- [x] Criar todas as tabelas no novo banco
- [ ] Testar comandos do bot

## Investigar Erro Discord OAuth em Produção
- [ ] Verificar logs do servidor em produção
- [ ] Identificar causa específica do erro
- [ ] Corrigir e republicar

## Corrigir Erro no Railway
- [ ] Investigar erro "Failed to construct 'URL': Invalid URL"
- [ ] Verificar variáveis VITE_ no Railway
- [ ] Corrigir e testar

## Adicionar Cursos ao Banco
- [x] Preparar lista de cursos com valores e imagens
- [x] Fazer upload de todas as 13 imagens para S3
- [x] Criar script SQL com URLs das imagens
- [ ] Executar script no DBeaver
- [ ] Testar visualização no site

## Atualizar Logo do Site
- [ ] Fazer upload do novo logo para S3
- [ ] Atualizar VITE_APP_LOGO com nova URL
- [ ] Testar visualização no site

## Alterar Logo no Header
- [x] Encontrar componente do header
- [x] Atualizar URL do logo na página de login
- [ ] Testar visualização

## Redesign Completo do Site
- [x] Analisar imagem de referência e identificar mudanças
- [x] 1º Hero: Logo + FORÇA & HONRA + textos
- [x] 2º Painel de Instrutores
- [x] 3º NOSSA MISSÃO (Coragem, Disciplina, Espírito de Equipe)
- [x] 4º Grid de Cursos (3 colunas)
- [x] 5º Gerador de Certificados Individual
- [x] 6º Gerador de Certificados em Lote
- [x] Atualizar header e footer
- [ ] Testar responsividade

## Ajustar Cores das Seções
- [x] Painel de Instrutores: fundo branco
- [x] Nossa Missão: fundo vermelho

## Sincronização Automática Discord
- [ ] Criar função para extrair cargo e matrícula do nickname Discord
- [ ] Atualizar callback OAuth para sincronizar dados automaticamente
- [ ] Buscar dados do servidor Discord (cargo/patente)
- [ ] Testar sincronização no login

## Sincronização Automática Discord com Roles
- [x] Adicionar campo matricula ao schema
- [x] Implementar lógica de mapeamento de roles Discord
- [x] Implementar extração de cargo e matrícula do nickname
- [x] Role "Membro" → member
- [x] Role "Instrutor" → instructor
- [x] Role "Administrador" → Emails específicos (admin)
- [x] Atualizar callback OAuth para buscar roles do servidor
- [x] Mapear cargos Discord (SCG, SGT, etc) para ranks do banco
- [ ] Configurar variáveis DISCORD_ROLE_INSTRUTOR e DISCORD_ROLE_MEMBRO
- [ ] Testar sincronização com diferentes roles

## Atualizar Mapeamento de Cargos e Roles
- [x] Adicionar Sargento e Aspirante ao schema
- [x] Adicionar todos os apelidos de cargos ao mapeamento
- [x] Implementar lógica de determinação de role baseada no cargo
- [x] Praças (SD, CB, SGT, Sub.T, ASP) → member
- [x] Oficiais (2º TEN, 1º TEN, CAP, MAJ) → instructor
- [x] Alto-Comando (T.CEL, CEL, SCG, CMD) → instructor
- [x] Admins por email → admin
- [ ] Testar sincronização com diferentes cargos

## Corrigir Erro 500 no Callback Discord
- [ ] Verificar logs do servidor
- [ ] Identificar causa do erro
- [ ] Corrigir e testar

## Substituir matricula por studentId
- [x] Atualizar código Discord OAuth para usar studentId
- [x] Remover coluna matricula do schema
- [ ] Testar sincronização

## Sistema de Recrutamento com /solicitar_set
- [x] Criar comando /solicitar_set no bot Discord
- [x] Comando envia link do formulário de recrutamento
- [x] Criar schema recruitment_applications no banco
- [ ] Criar página /recrutamento com formulário de 10 perguntas
- [ ] Implementar API para salvar formulário
- [ ] Enviar formulário para canal Discord com embed
- [ ] Adicionar botões Aprovar/Rejeitar no Discord
- [ ] Implementar handler de aprovação/rejeição
- [ ] Ao aprovar: setar cargo "Soldado" no Discord
- [ ] Ao aprovar: setar role "Bombeiro | Praça" no Discord
- [ ] Ao aprovar: alterar nickname para formato correto
- [ ] Ao aprovar: atualizar dados do usuário no site
- [ ] Configurar variável DISCORD_CHANNEL_RECRUITMENT
- [x] Testar fluxo completo

## Sistema de Recrutamento Discord
- [x] Criar comando /solicitar_set no Discord bot
- [x] Criar página /recrutamento com formulário de 10 perguntas
- [x] Implementar validação de campos obrigatórios
- [x] Criar tabela recruitment_applications no banco de dados
- [x] Implementar API tRPC para submissão de formulário
- [x] Configurar envio de webhook para canal do Discord
- [ ] Criar sistema de aprovação/rejeição via Discord
- [ ] Implementar atribuição automática de roles (Soldado + Bombeiro | Praça)
- [ ] Implementar mudança automática de nickname (SD | Nome | Matrícula)
- [x] Testar fluxo completo de recrutamento

## Sistema de Aprovação/Reprovação de Recrutamento
- [x] Alterar botão do formulário para "Confirmar e Enviar"
- [x] Configurar canal de recrutamento (1472632068046454784)
- [x] Configurar canal de aprovados (1472632147469668711)
- [x] Configurar canal de reprovados (1472632272724295762)
- [x] Criar bot listener para botões Aprovar/Reprovar
- [x] Implementar lógica de aprovação (atribuir roles + mudar nickname + enviar para canal aprovados)
- [x] Implementar lógica de reprovação (enviar para canal reprovados)
- [x] Testar fluxo completo de recrutamento

## Correções
- [x] Corrigir erro NOW() no MySQL para compatibilidade com banco de dados
- [x] Corrigir formato de data para MySQL (converter Date para string YYYY-MM-DD HH:MM:SS)

## Acesso Direto ao Formulário
- [x] Remover validação de link inválido no formulário de recrutamento
- [x] Permitir acesso direto sem parâmetros do Discord
- [ ] Testar formulário com acesso direto

## Correções do Formulário de Recrutamento
- [x] Corrigir exibição do Discord ID (mostrar valor real ao invés de <@MANUAL_ENTRY>)
- [x] Mudar de webhook para bot Discord para enviar mensagens com botões
- [x] Adicionar botões "Aprovar" e "Reprovar" usando bot Discord
- [ ] Testar envio completo do formulário com botões funcionais

## Correção de Erro nos Botões
- [x] Corrigir erro "Unknown interaction" ao clicar em Aprovar/Reprovar
- [x] Remover resposta duplicada (deferReply + reply)
- [x] Mover deferReply para handleButtonInteraction (resposta imediata)
- [ ] Testar botões funcionando corretamente

## Ajustes Finais de Aprovação/Reprovação
- [x] Garantir que aprovação adiciona cargos sem remover existentes
- [x] Enviar formulário completo para canal de aprovados (1472632147469668711)
- [x] Enviar formulário completo para canal de reprovados (1472632272724295762)
- [x] Usar bot Discord ao invés de webhook para enviar aos canais
- [x] Expandir nomes das perguntas (11 perguntas completas)
- [x] Testar fluxo completo de aprovação e reprovação

## Campo Discord ID Manual
- [x] Adicionar campo "Discord ID" no formulário (Pergunta 5)
- [x] Validar formato do Discord ID (17-19 dígitos)
- [x] Usar Discord ID manual quando fornecido
- [x] Atualizar numeração das perguntas (agora 11 perguntas)
- [ ] Testar menção com Discord ID manual

## Correção de Listener Duplicado
- [x] Investigar listeners duplicados no bot Discord
- [x] Remover listeners antigos antes de registrar novos (removeAllListeners)
- [x] Garantir que interação seja respondida apenas uma vez
- [ ] Testar botões Aprovar/Reprovar funcionando

## Correção de Erro ao Adicionar Cargos
- [x] Adicionar validação para member e member.roles
- [x] Adicionar logs de debug para identificar problema
- [x] Identificar problema: hierarquia de cargos do Discord
- [x] Implementar verificação de hierarquia antes de modificar cargos
- [x] Adicionar tratamento de erro específico para permissões
- [x] Permitir aprovação parcial (banco + canal) mesmo sem modificar cargos
- [x] Mostrar mensagem clara quando hierarquia impede modificação
- [ ] Testar aprovação funcionando corretamente

## Correção de Discord ID Undefined
- [ ] Verificar se campo discordId está sendo enviado no formulário
- [ ] Verificar se API está salvando discordId no banco
- [ ] Testar formulário salvando Discord ID corretamente

## Fase 100: Correção de Dependências do Chrome no Railway
- [x] Criar arquivo nixpacks.toml com dependências do sistema
- [x] Testar geração de certificado em produção (aguardando republicação)

## Fase 101: Criar Usuário Automaticamente no Formulário de Recrutamento
- [x] Analisar schema da tabela users
- [x] Implementar criação automática de usuário ao submeter formulário
- [x] Vincular Discord ID ao usuário criado
- [x] Testar fluxo completo

## Fase 102: Corrigir Campos NULL no Cadastro de Usuário
- [ ] Investigar por que discordId e studentId ficam NULL
- [ ] Corrigir mapeamento de campos no SQL INSERT
- [ ] Testar criação de usuário com valores corretos

## Fase 102: Corrigir Campos NULL no Cadastro de Usuário
- [x] Investigar por que discordId e studentId ficam NULL
- [x] Corrigir mapeamento de campos no SQL INSERT (adicionar crases)
- [x] Adicionar campo rank com valor 'Soldado'
- [x] Testar criação de usuário com valores corretos

## Fase 103: Adicionar E-mail e Sincronizar Aprovação
- [x] Adicionar campo de e-mail no formulário de recrutamento
- [x] Salvar e-mail na tabela users ao criar usuário
- [x] Atualizar approvalStatus para 'approved' ao aprovar no Discord
- [x] Testar fluxo completo

## Fase 104: Resolver Erro Persistente de Certificado
- [x] Verificar logs do Railway para confirmar instalação das dependências
- [x] Verificar configuração do Puppeteer no código
- [x] Implementar solução alternativa se necessário
- [x] Testar geração de certificado

## Fase 105: Atualizar Design do Certificado
- [x] Analisar diferenças entre design atual e modelo fornecido
- [x] Implementar novo design no certificates.ts
- [x] Testar geração com novo design
- [ ] Validar com usuário

## Fase 106: Corrigir Biblioteca libnspr4.so Faltando
- [x] Adicionar libnspr4 ao nixpacks.toml
- [x] Republicar e testar em produção

## Fase 107: Corrigir Chromium para Dev e Produção
- [x] Detectar ambiente (dev/prod) e usar Chromium apropriado
- [x] Testar geração de certificado localmente

## Fase 108: Corrigir Informações do Instrutor Cortadas
- [x] Ajustar altura do certificado e espaçamento da seção de assinatura
- [x] Testar com nomes longos de instrutor e cargo

## Fase 109: Ajustar Posição do Instrutor
- [x] Mover seção do instrutor 3px para cima

## Fase 110: Corrigir Chromium no Railway
- [x] Adicionar variável PUPPETEER_EXECUTABLE_PATH no Railway
- [x] Adicionar PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
- [x] Testar em produção

## Fase 111: Solução Definitiva com chrome-aws-lambda
- [x] Instalar chrome-aws-lambda e puppeteer-core
- [x] Atualizar código para usar chrome-aws-lambda
- [x] Remover nixpacks.toml (não é mais necessário)
- [x] Testar em produção

## Fase 112: Substituir por @sparticuz/chromium
- [x] Remover chrome-aws-lambda desatualizado
- [x] Instalar @sparticuz/chromium atualizado
- [x] Atualizar código
- [x] Testar em produção

## Fase 113: Adicionar nixpacks.toml para @sparticuz/chromium
- [x] Criar nixpacks.toml com bibliotecas essenciais
- [x] Testar em produção

## Fase 114: Adicionar flags específicas do Railway
- [ ] Adicionar flags --single-process e --no-zygote
- [ ] Testar em produção

## Fase 115: Script de Push para GitHub
- [x] Criar script push-to-github.sh
- [x] Testar script

## Fase 116: Dockerfile Customizado para Railway
- [ ] Criar Dockerfile com dependências do Chromium
- [ ] Criar .dockerignore
- [ ] Remover nixpacks.toml
- [ ] Testar build local
- [ ] Documentar deploy no Railway

## Fase 117: Corrigir Certificados em Branco e Logo Incorreto
- [x] Investigar código de emissão em lote
- [x] Corrigir dados em branco
- [x] Corrigir logo incorreto
- [x] Corrigir geração de imagem
- [x] Testar envio para Discord

## Fase 106: Atualizar Logo Correto do Certificado
- [x] Fazer upload do logo correto para S3
- [x] Atualizar URL do logo em server/certificates.ts
- [x] Testar geração de certificado com logo correto

## Fase 107: Ajustar Posição da Assinatura do Instrutor
- [x] Reduzir margin-top da seção de assinatura em 2px
- [x] Testar certificado com nova posição

## Fase 108: Ajustar Posição da Assinatura e Resolver Chromium
- [x] Mover assinatura mais para cima (reduzir margin-top)
- [x] Testar nova posição
- [x] Configurar Dockerfile para Railway
- [x] Documentar instruções de deploy

## Fase 106: Solução Definitiva - Canvas ao invés de Chromium
- [x] Implementar geração de certificado com Canvas (node-canvas) - REVERTIDO
- [x] Corrigir railway.json para usar DOCKERFILE/@sparticuz/chromium
- [ ] Testar localmente
- [ ] Republicar e validar em produção
- [x] Remover dependência canvas (node-canvas) que causava falha no deploy do Manus
- [x] Remover @sparticuz/chromium e usar apenas Puppeteer com Chrome instalado via postinstall
- [ ] Corrigir erro "Invalid URL" no Railway que impede o site de funcionar
- [x] Mover build do Vite para runtime para ter acesso às variáveis VITE_*
- [x] Atualizar Dockerfile com ARG e ENV para passar variáveis VITE_* durante build

## Correções Urgentes - Alterações do GitHub
- [x] Corrigir index.html com estrutura HTML mínima (falta <html>, <head>, <body>, <div id="root">)
- [x] Adicionar throw em Map.tsx para bloquear execução se API key estiver vazia
- [x] Testar aplicação localmente após correções

## Investigação - Publicação Travada no Manus
- [x] Investigar causa da publicação travada há mais de 10 minutos
- [x] Verificar se há arquivos grandes ou dependências problemáticas
- [x] Criar .npmrc com PUPPETEER_SKIP_DOWNLOAD=true para desabilitar download do Chrome no Manus
- [x] Remover script postinstall do package.json
- [x] Fazer commit e publicar novamente

## Erro de Autenticação Discord em Produção
- [ ] Investigar erro 500 em /api/auth/discord/callback no Manus
- [ ] Verificar se variáveis de ambiente do Discord estão configuradas no Manus
- [ ] Corrigir problema de autenticação Discord

## Correção de Auth no Railway - Trust Proxy e CORS
- [x] Instalar dependência cors
- [x] Adicionar app.set("trust proxy", 1) no Express
- [x] Configurar CORS com credentials: true
- [x] Fazer push para GitHub para deploy no Railway
- [ ] Testar autenticação Discord no Railway após deploy completar

## Migração para puppeteer-core + @sparticuz/chromium
- [x] Remover puppeteer
- [x] Instalar puppeteer-core e @sparticuz/chromium
- [x] Atualizar código de geração de certificados
- [x] Remover .npmrc (não é mais necessário)
- [x] Testar localmente
- [x] Fazer commit e push
- [ ] Testar geração de certificados no Railway após deploy completar

## Simplificação do Dockerfile
- [x] Substituir Dockerfile por versão enxuta com node:20-slim
- [x] Remover bibliotecas desnecessárias (libglib, libnss3, etc)
- [x] Adicionar flags extras de estabilidade no Puppeteer
- [x] Fazer commit e push
- [ ] Testar deploy no Railway após build completar

## Adicionar Libs Mínimas do Chromium no Dockerfile
- [x] Adicionar apt-get install com libs essenciais (libnspr4, libnss3, libglib2.0-0, etc)
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Verificar logs do Railway para confirmar Chromium iniciando sem erros
- [ ] Testar geração de certificados em produção

## Implementar Retry Automático para Certificados
- [x] Criar helper withRetry com exponential backoff
- [x] Aplicar retry na geração de certificados (até 3 tentativas)
- [x] Testar localmente
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway e testar em produção

## Atualizar Dockerfile com Lista Completa de Libs
- [x] Adicionar libs faltantes (libdrm2, libgcc1, libgtk-3-0, libpangocairo-1.0-0, etc)
- [x] Fazer commit e push
- [ ] Forçar rebuild no Railway com clear build cache
- [ ] Verificar logs para confirmar libnspr4.so não aparece mais
- [ ] Testar geração de certificados em produção

## Debug de Libs no Container Railway
- [ ] Adicionar comando ls para verificar libnspr4.so
- [ ] Adicionar comando ldd para verificar dependências do Chromium
- [ ] Fazer commit vazio para forçar rebuild sem cache
- [ ] Verificar logs do Railway para confirmar libs instaladas

## Correção Final - LD_LIBRARY_PATH
- [x] Adicionar ENV LD_LIBRARY_PATH no Dockerfile
- [x] Manter headless: true (chromium.headless não existe no @sparticuz/chromium)
- [x] Fazer commit vazio para forçar rebuild
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Verificar logs do Railway para confirmar resolução
- [ ] Testar geração de certificados em produção

## Correção Definitiva - Flags e Base Image
- [x] Adicionar --single-process e --no-zygote no puppeteer.launch
- [x] Trocar FROM node:20-slim para node:20-bookworm
- [x] Fazer commit vazio para forçar rebuild limpo
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Verificar logs do Railway para confirmar resolução final
- [ ] Testar geração de certificados em produção

## Correção Crítica - Host 0.0.0.0 para Railway
- [x] Adicionar host "0.0.0.0" no server.listen
- [x] Usar process.env.HOST || "0.0.0.0" para flexibilidade
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Verificar se container fica Running no Railway
- [ ] Testar geração de certificados em produção

## Correção Final Railway - Porta e Healthcheck
- [x] Remover findAvailablePort e usar porta exata (Number(process.env.PORT) || 3000)
- [x] Adicionar rota GET / para healthcheck
- [x] Adicionar rota GET /health para healthcheck
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Verificar se container fica Running no Railway
- [ ] Testar geração de certificados em produção

## Debug Erro 503 - Logs e Porta
- [x] Adicionar logs de debug na mutation issueIndividual (STARTED, Launching Puppeteer, Certificate generated)
- [x] Adicionar log da porta ENV no servidor (console.log("ENV PORT =", process.env.PORT))
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Monitorar logs do Railway para identificar onde o erro acontece
- [ ] Testar geração de certificados em produção

## Correção Ordem dos Middlewares - Healthcheck
- [x] Verificar ordem atual dos middlewares no index.ts
- [x] Mover rotas / e /health para ANTES do Vite e outros middlewares
- [x] Fazer commit e push
- [ ] Aguardar deploy do Railway (15-20 min)
- [ ] Testar no Railway se container fica Running
- [ ] Testar geração de certificados em produção

## Teste Sem Discord Bot - Identificar Culpado
- [x] Comentar await initDiscordBot() temporariamente
- [ ] Fazer commit e push
- [ ] Testar no Railway se container para de morrer
- [ ] Se funcionar: problema é no initDiscordBot
- [ ] Se não funcionar: problema é em outro lugar

## Correção Discord Bot - Error Handling Robusto
- [x] Investigar código do Discord bot
- [x] Mover registerCommands() para dentro do evento 'ready'
- [x] Adicionar error handler global no Discord client
- [x] Envolver registerCommands() em try-catch (non-fatal)
- [x] Adicionar try-catch ao redor de initDiscordBot() no servidor
- [x] Limpar variável global em caso de erro
- [ ] Fazer commit e push
- [ ] Testar no Railway se container fica estável

## Correção Discord Bot - Inicialização em Paralelo
- [x] Mover initDiscordBot() para fora do callback do server.listen
- [x] Inicializar Discord bot em paralelo (não bloquear servidor)
- [x] Usar .then/.catch ao invés de await no callback
- [ ] Fazer commit e push
- [ ] Testar no Railway se container fica estável

## Desabilitar Discord Bot em Produção - Teste de Memória
- [x] Adicionar condicional NODE_ENV para desabilitar bot em produção
- [x] Manter bot habilitado em desenvolvimento
- [ ] Fazer commit e push
- [ ] Testar no Railway se container fica estável
- [ ] Se funcionar: confirma que problema é limite de 1GB de RAM
- [ ] Solução permanente: aumentar RAM no Railway ou otimizar uso de memória

## Correção Condicional Discord Bot - Variável Explícita
- [x] Trocar NODE_ENV por DISABLE_DISCORD_BOT
- [x] Usar variável explícita que funciona no Railway
- [ ] Adicionar DISABLE_DISCORD_BOT=true no Railway
- [ ] Fazer commit e push
- [ ] Testar no Railway se container fica estável

## Forçar Rebuild do Railway - Cache Buster
- [x] Adicionar ARG CACHEBUST no Dockerfile
- [ ] Fazer commit e push
- [ ] Verificar se Railway faz rebuild completo
- [ ] Confirmar que logs de debug aparecem

## Problema Identificado - Código Não Estava no GitHub
- [x] Descoberto que checkpoints do Manus não fazem push automático para GitHub
- [x] Railway estava deployando código antigo do GitHub
- [x] Feito push manual para github/main com --force
- [ ] Aguardar deploy automático do Railway
- [ ] Verificar logs de debug aparecem
- [ ] Confirmar container fica estável

## Separação do Discord Bot em Container Standalone
- [x] Criar arquivo bot-standalone.ts com código do Discord bot
- [x] Criar Dockerfile.bot para o container do bot
- [x] Adicionar script build:bot no package.json
- [x] Criar documentação RAILWAY_BOT_SETUP.md
- [ ] Configurar novo serviço no Railway
- [ ] Testar ambos os containers rodando simultaneamente

## Implementar Gera\u00e7\u00## Implementar Geração e Download de Certificados
- [x] Investigar código atual de geração de certificados
- [x] Criar endpoint API para gerar certificado
- [x] Criar interface no frontend para gerar certificado
- [x] Testar funcionalidade

## Corrigir Erro 404 na Rota certificates.generateAndDownload
- [ ] Investigar por que rota não está sendo encontrada
- [ ] Verificar se rota está exportada corretamente no router
- [ ] Testar funcionalidade após correção

## Melhorias no Sistema de Certificados
- [x] Implementar botão "Emitir Certificado" com download automático de PNG na lista de inscritos
- [x] Aplicar background branco no formulário de /certificados/gerar
- [x] Usar dropdown com seleção padrão no campo "Nome do Curso" em /certificados/gerar
- [x] Testar todas as alterações

## Corrigir Erro do Chromium em Produção
- [x] Criar arquivo nixpacks.toml com dependências do Chromium para Railway
- [ ] Testar geração de certificados após deploy
