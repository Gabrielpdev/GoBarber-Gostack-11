# Recuperação de Senha ✅
**Requisitos Funcionais (RF)**
 -> O usuario deve poder recuperar sua senha informando o seu email; ✅
 -> O usuario deve receber um email com instrições de recuperaçao de senha; ✅
 -> O usuario deve poder resetar sua senha; ✅

**Requisitos não funcionanis (RNF)**
-> Utilizar Mailtrap para testar envios em ambiente de dev; ✅
-> Utilizar Amazon SES para envios em produção; ✅
-> O envio de email deve acontecer em segundo plano (background job); ✅

**Regra de Negocio (RN)**
-> O link enviado por email para resetar senha, deve expirar em 2h; ✅
-> O usuario precisa confirmar a nova senha ao resetar sua senha; ✅

# Atualização do perfil ✅
**Requisitos Funcionais (RF)**
->  O usuario deve poder atualizar seu nome, email e senha ✅

**Regra de Negocio (RN)**
-> O usuario não pode alterar seu email para um email já utilizado ✅
-> Para atualizar sua senha o usuario deve informar a senha antiga ✅
-> Para atualizar sua senha o usuario deve confirmar sua nova senha ✅

# Agendamento de serviços

**Requisitos Funcionais (RF)**
-> O usuario deve poder listar todos prestadores de serviço cadastrados
-> O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
-> O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador
-> O usuario deve realizar um novo agendamento com um prestador

**Requisitos não funcionanis (RNF)**
-> A listagem de prestadores de serviço deve ser armazenada em cache

**Regra de Negocio (RN)**
-> Cada agendamento deve durar 1h exatamente
-> Os agendamentos devem estar disponiveis entre 8H e 18H (primeiro as 8h e ultimo as 17h)
-> O usuario nao pode agendar horario já ocupafo
-> O usuario nao pode agendar horario que ja passou
-> O usuario nao pode agendar um serviço consigo mesmo

# Painel do prestador

**Requisitos Funcionais (RF)**
-> O usuario deve poder listar seus agendamentos de um dia especifico
-> O prestador deve receber um notificaçao sempre que hover um novo agendamento
-> O prestador deve poder visualizar as notificaçoes nao lidas

**Requisitos não funcionanis (RNF)**
-> Os agendamentos do prestador no dia devem ser armazenados em cache.
-> As notificações do prestador devem ser armazenadas no MongoDB.
-> As notificações do prestador devem ser enviadas em tempo-real utilizado Socket.io.

**Regra de Negocio (RN)**
-> A notificaçao deve ter um status de nao-lida ou lida para que o prestador possa controlar
