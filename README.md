# Desafio Cientec

## Aplicação web para cadastro de pessoas físicas

Stack utilizada: MySQL, Node.js, (HTML, CSS, JS)

O backend foi feito utilizando a biblioteca HTTP.
Nenhum framework foi utilizado nesse projeto.

### Como Rodar o Projeto

#### Pré-requisitos

- MySQL instalado e rodando
- Node.js instalado

### Configuração do Banco de Dados

1. Crie um banco de dados no MySQL:

   ```sql
   CREATE DATABASE cadastro_cidadaos;
   ```

   ```sql
   CREATE TABLE cidadaos (
   id int NOT NULL AUTO_INCREMENT,
   nome varchar(255) NOT NULL,
   cpf char(11) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE KEY cpf (cpf)
    ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   ```

2. Configure o arquivo `.env` na raiz do backend com as seguintes informações:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_NAME=cadastro_cidadaos
   ```

### Instalando Dependências

1. Navegue até a pasta `backend` e instale os pacotes:
   ```bash
   cd backend
   npm install
   ```

### Iniciando o Servidor

Execute o comando:

```bash
npm run start
```

### Executando o Frontend

Basta abrir o arquivo `index.html` no navegador.

---

Agora o projeto estará pronto para uso!

## Endpoints da API

A aplicação disponibiliza os seguintes endpoints para interação com os dados dos cidadãos:

- **Buscar cidadãos**  
  **Método:** `GET`  
  **Endpoint:** `/api/v1/cidadaos`  
  **Descrição:** Retorna a lista de cidadãos cadastrados.  
  **Query Parameters:**

  - `id` (opcional): Filtra cidadãos pelo id cadastrado.
  - `nome` (opcional): Filtra cidadãos pelo nome.
  - `cpf` (opcional): Filtra cidadãos pelo CPF.

- **Cadastrar cidadão**  
  **Método:** `POST`  
  **Endpoint:** `/api/v1/cidadaos/create`  
  **Descrição:** Insere um novo cidadão no banco de dados.

---
