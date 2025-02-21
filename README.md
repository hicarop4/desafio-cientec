# Desafio Cientec

## Aplicação web para cadastro de pessoas físicas

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

Agora o projeto estará rodando corretamente!
