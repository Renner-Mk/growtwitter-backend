# Twitter Clone API

Este projeto é uma API desenvolvida para simular funcionalidades de um Twitter, incluindo gerenciamento de usuários, tweets, seguidores e interações como likes e retweets. A API foi criada com TypeScript e Prisma, com um banco de dados relacional.

## Funcionalidades

### Usuários

- Cadastro, atualização e exclusão de usuários.
- Pesquisa de usuários por nome de usuário.

### Tweets

- Criação de tweets e retweets.
- Exclusão de tweets.
- Associação de tweets com usuários.

### Seguidores

- Seguir e deixar de seguir usuários.
- Validações para evitar seguir o mesmo usuário mais de uma vez ou seguir a si mesmo.

### Interações

- Curtir e descurtir tweets.

## Tecnologias Utilizadas

- Node.js

- Express

- TypeScript

- Prisma (ORM)

- PostgreSQL

# Rotas da API Twitter Clone

### Auth

- `POST /login` - Login do usuário.

### Usuários

- `POST /users` - Criação de usuário.
- `GET /users/:id` - Obter informações de um usuário.
- `PUT /users/:id` - Atualizar informações de um usuário.
- `DELETE /users/:id` - Excluir um usuário.

### Tweets

- `POST /user/:userId/tweet` - Criar um novo tweet.
- `POST /user/:userId/tweet/:id` - Criar um retweet.
- `GET /user/:userId/tweet` - Obter todos os tweets de um usuário.
- `GET /user/:userId/tweet/:id` - Obter detalhes de um tweet específico.
- `PUT /user/:userId/tweet/:id` - Atualizar um tweet.
- `DELETE /user/:userId/tweet/:id` - Excluir um tweet.

### Seguidores

- `POST /user/followers/:userId` - Seguir um usuário.
- `GET /user/followers/:userId` - Obter a lista de seguidores de um usuário.
- `DELETE /user/followers/:userId` - Deixar de seguir um usuário.

### Interações

- `POST /user/:userId/like/:tweetId` - Curtir um tweet.
- `GET /user/:userId/like/:tweetId` - Ver curtidas de um tweet
- `DELETE /user/:userId/like/:tweetId` - Remover curtida de um tweet.
