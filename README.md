# Teste-Tecnico-XP

## Descrição do Projeto
<p align="center">Api para gerenciar um sistema de compra e venda de ações de uma corretora.
O usuário pode fazer deposito e saques em sua carteira digital.É possivel fazer compra de ações(ativos) e também a venda, ao se comprar ou vender, o salo do cliente é atualizado.</p>

## Tecnologias utilizadas
<p align="left">Desenvolvido uando o NODE.JS e TypeScript</p>

*express
*bCrypt
*JsonWebToken
*eslint
*nodemon
*docker

## Instalando e Rodando a 
  <summary><strong>🐳Utilizando o Docker</strong></summary><br />
  
  ## Com Docker
 

  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `teste_XP` e outro chamado `teste_XP_db`.
  - A partir daqui você pode rodar o container `teste_XP` via CLI ou abri-lo no VS Code com a extensão do Docker.

  > Use o comando `docker exec -it teste_XP bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install` 


<details>
