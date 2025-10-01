# API
API Techman
- Node.js
- Express
- Prisma
- MySQL

## Passos para rodar o projeto localmente
1. Após clonar o repositório acesse a pasta `./web` abra com **VsCode** e em um terminal `bash` ou `cmd`
2. Rode `npm install` para instalar as dependências
3. Crie um arquivo `.env` com o conteúdo a seguir:
```js
DATABASE_URL="mysql://root@localhost:3306/techman"
PORT=4000
```
4. De start no SGBD **MySQL**
5. Altere o SGBD no `prosma/schema.prisma` para 'mysql'
```js
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
6. Rode `npx prisma migrate dev --name init` para criar as tabelas no banco de dados.
7. Rode `npm run dev` para iniciar o servidor em modo de desenvolvimento.
