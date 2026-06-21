# Nutrivida — Parte 2

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Ter o MongoDB rodando localmente
# (instale em https://www.mongodb.com/try/download/community)

# 3. Iniciar o servidor
npm run dev   # com nodemon (auto-restart)
# ou
npm start     # sem auto-restart

# 4. Acessar
# http://localhost:3000
```

---

## Estrutura do projeto

```
nutrivida/
├── server.js              ← Servidor principal
├── package.json
├── models/
│   ├── Usuario.js         ← Model do MongoDB (usuários)
│   ├── Contato.js         ← Model do MongoDB (mensagens)
│   └── Fazenda.js         ← Model do MongoDB (fazendas)
├── routes/
│   ├── home.js            ← Rotas da home e sobre
│   ├── auth.js            ← Rotas de login/cadastro
│   ├── contato.js         ← Rotas do formulário de contato
│   ├── problemas.js       ← Rotas da página de problemas
│   └── fazendas.js        ← Rotas CRUD de fazendas
├── views/
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── sobre.ejs
│   ├── cadastro.ejs
│   ├── login.ejs
│   ├── contato.ejs
│   ├── mensagens.ejs
│   ├── problemas.ejs
│   ├── fazendas.ejs
│   └── fazenda-form.ejs
└── public/
    ├── css/style.css
    ├── js/home.js
    └── img/
```

---

## Tabela de Rotas — Ligação Fetch (Front-end) ↔ Rota Back-end

| Método | Rota               | Onde é chamada (fetch)       | O que faz                          |
|--------|--------------------|------------------------------|------------------------------------|
| GET    | /                  | Navegação direta             | Renderiza home.ejs                 |
| GET    | /sobre             | Navegação direta             | Renderiza sobre.ejs                |
| GET    | /problemas         | Navegação direta             | Renderiza problemas.ejs com dados  |
| GET    | /problemas/api     | fetch em problemas.ejs       | Retorna problemas em JSON          |
| GET    | /fazendas          | Navegação direta             | Renderiza fazendas.ejs com dados   |
| GET    | /fazendas/nova     | Navegação direta             | Renderiza formulário de fazenda    |
| POST   | /fazendas          | fetch em fazenda-form.ejs    | Cadastra nova fazenda no MongoDB   |
| GET    | /fazendas/api      | fetch (opcional)             | Retorna todas as fazendas em JSON  |
| GET    | /fazendas/api/:id  | fetch (opcional)             | Retorna uma fazenda pelo ID        |
| PUT    | /fazendas/api/:id  | fetch (disponível)           | Atualiza fazenda no MongoDB        |
| DELETE | /fazendas/api/:id  | fetch em fazendas.ejs        | Remove fazenda do MongoDB          |
| GET    | /contato           | Navegação direta             | Renderiza contato.ejs              |
| POST   | /contato           | fetch em contato.ejs         | Salva mensagem no MongoDB          |
| GET    | /contato/mensagens | Navegação direta             | Lista mensagens recebidas          |
| DELETE | /contato/:id       | fetch em mensagens.ejs       | Remove mensagem do MongoDB         |
| GET    | /auth/cadastro     | Navegação direta             | Renderiza cadastro.ejs             |
| POST   | /auth/cadastro     | fetch em cadastro.ejs        | Cria novo usuário no MongoDB       |
| GET    | /auth/login        | Navegação direta             | Renderiza login.ejs                |
| POST   | /auth/login        | fetch em login.ejs           | Autentica usuário e cria sessão    |
| GET    | /auth/logout       | Link direto                  | Encerra sessão do usuário          |
| GET    | /auth/usuarios     | fetch (disponível)           | Lista usuários em JSON (sem senha) |

---

## Banco de dados — MongoDB

**Collections criadas automaticamente:**
- `usuarios` — nome, email, senha (criptografada com bcrypt)
- `contatos` — nome, email, telefone, mensagem, data
- `fazendas` — nome, localização, tipo, descrição, usuário (referência), data

**Por que MongoDB?**
O MongoDB é um banco NoSQL orientado a documentos. Diferente do MySQL (relacional, tabelas/colunas fixas), o Mongo armazena dados em formato JSON flexível. Para esse projeto é vantajoso porque:
- Fácil integração com Node.js via Mongoose
- Esquema flexível para adicionar campos sem migrations
- Ideal para projetos em desenvolvimento onde o modelo muda bastante

---

## Páginas do projeto (5+)

1. **Home** (`/`) — carrossel de imagens + informações da empresa
2. **Problemas** (`/problemas`) — lista de desafios renderizada pelo servidor via EJS
3. **Fazendas** (`/fazendas`) — lista de fazendas do banco com opção de deletar
4. **Sobre Nós** (`/sobre`) — informações do time
5. **Contato** (`/contato`) — formulário que envia dados ao servidor via fetch POST
6. **Cadastro** (`/auth/cadastro`) — cria conta com validação no front e back
7. **Login** (`/auth/login`) — autenticação com sessão
8. **Mensagens** (`/contato/mensagens`) — lista mensagens recebidas
