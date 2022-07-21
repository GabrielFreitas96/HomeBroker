# Teste-Tecnico-XP

## Descrição do Projeto
<p align="left">Api para gerenciar um sistema de compra e venda de ações de uma corretora. O usuário pode se cadastrar, efetuar o login,
O usuário pode fazer deposito e saques em sua carteira digital.É possivel fazer compra de ações(ativos) e também a venda, ao se comprar ou vender, o salo do cliente é atualizado. Foi utilizado um banco de dados relacionais, o MySql para a crição das tabelas Cleintes, Ativos, Contas e ClientesAtivos</p>

## Tecnologias utilizadas
<p align="left">Desenvolvido uando o NODE.JS e TypeScript</p>

*express
*bCrypt
*JsonWebToken
*eslint
*nodemon
*docker
*Mysql

## Instalando e Rodando a API
  <summary><strong>🐳Utilizando o Docker</strong></summary><br />
  
  ## Com Docker
 >Clone o repositorio e entre na pasta teste-XP  `cd teste-XP`

  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `teste_XP` e outro chamado `teste_XP_db` a api irá rodar no localhost:3000.
  - A partir daqui você pode rodar o container `teste_XP` via CLI ou abri-lo no VS Code com a extensão do Docker.

  > Use o comando `docker exec -it teste_XP bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install` 
  - Use o comando `npm run dev`. para subir a aplicação, esse comando deve ser executado no terminal do Docker
  - Crie o banco de Dados com o arquivo DadosXP.sql, para isso é necesário rodar essa querys no Workbench ou utilizando uma extensão do VSCode.

## Utilizando a API
> Para melhor utilização, tenha em mente a utilização atráves do insomnia ou Postman, para fazer as requisições.
> O token é gerado no momento em que se faz o login POST /login. OBS: Ao cadastrar um cliente novo, não será gerado um token,apenas ao se fazer o login.
> A maior parte das requisições requer a utilização de um token no headers. A chave a ser criada no header é `authorization` e nela deve se inserir o Token gerado no momento de fazer o Login.


<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Contrução das tabelas e seus relacionamentos para desenvolvimento desse projeto:

  ![DER](./Modelagem.png)
</details>

## EndPoints da API e os Verbos


<details>
  <summary  id="diagrama"><strong>/user</strong></summary>

  #### POST no endpoint /user
  Adiciona um Cliente na tabela de clientes e também insere uma conta na tabela de Contas
  
  Body a ser enviado na requisição
  ```
  {
    "nameCliente": "Fernando Ribeiro",
    "emailCliente": "fernando@outlook.com",
    "passwordCliente": "123456",
    "contaCliente": 78910
  }
  ```
  
</details>


