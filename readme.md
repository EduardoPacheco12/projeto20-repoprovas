# <p align = "center"> RepoProvas </p>

<p align="center">
   <img src="https://images.emojiterra.com/google/android-nougat/512px/1f4da.png"/>
</p>

<p align = "center">
	<img src="https://img.shields.io/badge/author-Eduardo Oliveira Pacheco-4dae71?style=flat-square" />
</p>

## 📋 Descrição

<p>Esta é a aplicação backend do RepoProvas, um sistema de compartilhamento de provas entre estudantes!</p>
<p>Nele qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros.</p>

---

## 💻 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostgresSQL
- Prisma
- Jest

---

## 🚀 Rotas de Autenticação

### <span style="color:green"> **POST** </span> /repoprovas/sign-up

- Rota para cadastrar um novo usuário

```yml
    headers: {},
    body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
```

### <span style="color:green"> **POST** </span> /repoprovas/sign-in

- Rota para fazer login

```yml
headers: {},
body: {
	"email": "lorem@gmail.com",
	"senha": "loremipsum"
}
```

## 🚀 Rotas de Provas

### <span style="color:green"> **POST** </span> /repoprovas/tests/create

```yml
headers: { 'Authorization': 'Bearer $token' }
body:
  {
    'name': 'Projete seu planejamento',
    'pdfUrl': 'https://trello.com',
    'category': 'Projeto',
    'discipline': 'Planejamento',
    'teacher': 'Bruna Hamori',
  }
```

### <span style="color:yellow"> **GET** </span> /repoprovas/tests/disciplines

```yml
headers: { 'Authorization': 'Bearer $token' }
body: {}
```

### <span style="color:yellow"> **GET** </span> /repoprovas/tests/teachers

```yml
headers: { 'Authorization': 'Bearer $token' }
body: {}
```

---

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/EduardoPacheco12/projeto20-repoprovas
```

<p>Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias:</p>

```
npm install
```

<p>Finalizado o processo, é só inicializar o servidor:</p>

```
npm start
```
