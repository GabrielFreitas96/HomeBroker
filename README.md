# Teste-Tecnico-XP

## Descrição do Projeto
<p align="left">Api para gerenciar um sistema de compra e venda de ações de uma corretora. 
Desenvolvida com o modelo MSC(Model, Service, Controller) REST, as funções são dividas entre camadas.
A model é responsável pela conexão com o bando de dados, a camada service fica responsável pela implementação da regra de negócio e a controller se encarrega de receber as requisições e devolver a resposta.
O usuário pode se cadastrar, efetuar o login.
O usuário pode fazer depósito e saques em sua carteira digital.É possivel fazer compra de ações(ativos) e também a venda, ao se comprar ou vender, o saldo do cliente é atualizado. Foi utilizado um banco de dados relacionais, o MySql para a crição das tabelas Clientes, Ativos, Contas e ClientesAtivos</p>

## Tecnologias utilizadas
<p align="left">Desenvolvido uando o NODE.JS e TypeScript</p>

* express
* bCrypt
* JsonWebToken
* eslint
* nodemon
* docker
* Mysql
* mocha
* sinon
* chai

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
  - Crie o banco de Dados com o arquivo DadosXP.sql, para isso é necesário rodar essa querys no Workbench ou utilizando uma extensão do VSCode para criar o banco.
  - Use o comando `npm run test`. para rodar os testes unitários.

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

<details>
  <summary  id="diagrama"><strong>Middleware de Autenticação</strong></summary>
  Todas as rotas, com exceção da /ativos e /ativos/id, necessitam de um token para realizar as ações.
  Portanto, ao fazer o login, deve se copiar token retornado. Esse token deve sr inserido no headers com a chave authorization.
  A autenticação verifica o codCliente, logo, o token de um cliente não permite realizar ações para outros usuários.

  Exemplo de token :
  ```
  {
    authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJuYW1lQ2xpZW50ZSI6IkdhYnJpZWwgRnJlaXRhcyIsImVtYWlsQ2xpZW50ZSI6ImdhYnJpZWxmcmVpdGFzQGdtYWlsLmNvbSIsImNvbnRhQ2xpZW50ZSI6MTIzNDUsImlhdCI6MTY1ODU5ODE0OSwiZXhwIjoxNjU4NjAxNzQ5fQ.m4TKSbFr29qIxIZKSGiV0e_e-AAyyBkGgkpBUHudQxY
  } 
  ```
  OBS: Caso a utilização seja por meio do INSOMNIA ou POSTMAN, é necessario inserir quaquer string antes do token com algum espaço para o mesmo. Conforme demonstrado no exemplo acima.
  Isso é necessário já que no Swagger, esse processo acontece com a inserção do Bearer antes do token.
  Para utilizar o Swagger, pasta acessar a rota /docs.

</details>

<details>
  <summary  id="diagrama"><strong>Desafio, Experiência  e Melhorias Futuras</strong></summary>

 <p align="left">   A experiência foi intensa, acima de tudo foi muito gratificante, desde o primeiro momento tentei me desafiar como pessoa programadora júnior que está em processo de aprendizado.
Minha ideia foi  desenvolver esse projeto usando TypeScript, uma linguagem que apreendi a pouco tempo e ainda não tenho tanta experiência. Desde o inicio tentei aproveitar a oportunidade para fazer algo novo e apreender mais. O TypeScrip traz vantagens como a tipagem de cada função, sendo possível saber o que é esperado.
Sua aplicabilidade se faz extremamente necessário quando se deseja dar escabilidade para a aplicação.

A minha ideia foi pensar na implementação de um sistema de autenticação mais eficiente como o bcrypt, biblioteca responsável por gerar uma hash no momento de cadastro do usuário e mandar essa mesma ao banco de dados. Desse modo, o banco não possui a senha do usuário literalmente, mas sim uma senha criptografada.
Outro sistema de autenticação foi a utilização  do JWT, de modo que os endpoints são acessados mediante  uso de um token, o qual é gerado no momento de fazer o login.

Na concepção desse projeto, minha idéia era possibilitar que o usuário pudesse  fazer depósitos em sua conta digital, realizar saques, fazer a operação de compra e venda de ativos, de modo que esses valores fossem verificados de 5 modos

1) O usuário não pode comprar mais ações que aquelas  disponíveis na corretora, essa regra foi também aplicada para o cenário em que número de ações a serem compradas é igual a oferta de ações da corretora.  Essa ideia é uma implementação pensando que na realidade é quase impossível que um cliente compre todas as ações de um determinado ativo  disponíveis em uma corretora, mas caso ele tente fazer a compra, não será possível.

2) Fazer a verificação de que o usuário só pode vender o número de ações que ele possui, nesse caso ele não pode “operar vendido”, quando o cliente vende mais ações de um determinado ativo que ele possui.
Outro ponto é a verificação do saldo em conta e o valor da operação a ser realizada. Não  é permitido ao usuário efetuar uma compra que tivesse valor maior que seu saldo disponível em carteira.

3) O terceiro ponto é garantir que o saldo do cliente esteja sempre atualizado  nas operações de compra e venda de ações. A cada compra ou venda, um novo saldo é calculado e armazenado na tabela de Contas

4) Quarto ponto é a atualização do número de ativo que cada cliente possui. Quando um cliente vendesse um determinado número de acões de um ativo, a tabela ClientesAtivo deverá ser atualizado com o novo valor. E quando ele quiser vender todas as ações que possui de determinado ativo, a linha que corresponde a essa operação deverá ser excluída da tabela ClientesAtivos. Outro cenário considerado é que o cliente não pode vender um ativo que ele não possui.

5) Para depósitos e saques, os valores são válidados, o cliente não pode fazer depositos nulos ou negativos. Para o saque, não é possível sacar um valor maior que o saldo disponível em conta.

Uma dificuldade encontrada por mim foi a utilização do TypeScript, por ser algo relativamente novo para mim, comecei a apreender aproximadamente há  duas semanas . A solução para isso foi me dedicar mais aos estudos, observar as tipagens exigidas, construção de interfaces para serem utilizadas no código. Os testes unitários se mostraram desafiadores, uma vez que eu estava acostumado a fazer testes em JS. Para realização dos testes unitários em TS tive de recorrer a ajuda do google, no primeiro momento não obtive muito exito em entender como deveria ser feito. A melhor opção foi direcionar as buscas para os repositórios do Git Hub, onde consegui melhor entendimento e consegui produzir uma solução para a realização dos testes.
Em virtude do tempo, não consegui cobrir a aplicação com 100% de testes unitários.


Os próximos passos para aprimoramento dessa aplicação saõ: melhorar os testes unitários de forma a cobrir 100% das camadas, criação de testes de integração, criação de um front-end, deploy da aplicação com o Banco de Dados.
Além disso a costrução de uma tabela que fique responsável por aramazenar o histórico  de compras e vendas já realizados pelos usuários
</p>

</details>

## EndPoints da API e os Verbos


<details>
  <summary  id="diagrama"><strong>/cliente</strong></summary>

  #### POST  /cliente
  Adiciona um Cliente na tabela de clientes e também insere uma conta na tabela de Contas, salva a senha criptografada no banco de dados (bCrypt)
  
  Body a ser enviado na requisição
  ```
  {
    "nameCliente": "Fernando Ribeiro",
    "emailCliente": "fernando@outlook.com",
    "passwordCliente": "123456",
    "contaCliente": 78910
  }
  ```
  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo
	
> nameCliente :
* não pode  ser nulo ou undefined
* deve ser string
* dever ter pelo menos 8 caracteres

> contaCliente : 
* não pode  ser nulo ou undefined
* deve ser um numero
* não deve existir no banco de dados 
> emailCliente :
* não pode  ser nulo ou undefined
* deve ser uma string
* deve passar pelo formato regex @ e .com

> passwordCliente : 
* não pode  ser nulo ou undefined
* deve ser uma string
* deve ter pelo menos 6 caracteres 
> O retorno será algo do tipo :
  ```[
	{
		"codCliente": 4,
		"nameCliente": "Fernado Ribeiro",
		"emailCliente": "fernando@outlook.com",
		"contaCliente": 78910
	}
]
  ```
  Caso o usuário já tenha uma conta cadastrada, o retorno será do tipo:
  ```
 {
	"message": "A \"contaCliente\" 78910 already exists"
 }
  ```
</details>


<details>
  <summary  id="diagrama"><strong>/login</strong></summary>

  #### POST  /login
  Efetua o login de usuário, gerando um token de autenticação, a comparação de senha é feita com a biblioteca bcrypt
  
  Body a ser enviado na requisição
  ```
  {
    "contaCliente": 78910
    "passwordCliente": "123456",
    
  }
  ```
  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo
	

> contaCliente : 
* não pode  ser nulo ou undefined
* deve ser um numero
* caso não exista no banco de dados

> passwordCliente : 
* não pode  ser nulo ou undefined
* deve ser uma string
* deve ter pelo menos 6 caracteres 

> Verifica se a conta inserida está cadastrada, caso não esteja cadastrada, retorna a mensagem
```
 {
	"mesage": "A \"contaCliente\" ${contaCliente} was not found"
 }
 ```

> Caso a senha inserida esteja incorreta: 
  ```
  {
	  "message": "Invalid password"
  }
  ```
> Caso a senha inserida esteja correta, retorna o token :
  ```
  {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjo0LCJuYW1lQ2xpZW50ZSI6IkZlcm5hZG8gUmliZWlybyIsImVtYWlsQ2xpZW50ZSI6ImZlcm5hbmRvQG91dGxvb2suY29tIiwiY29udGFDbGllbnRlIjo3ODkxMCwiaWF0IjoxNjU4NDM2MTAzLCJleHAiOjE2NTg0Mzk3MDN9.LnuD6VEAa3gSHopjUbW0HuUAYp1WR_wZz_WPW2Po1rc"
  }
  ```
#### Obs: esse token deve ser usado nas requisições de saque, depósito, compra e venda de ativos e quando se desejar retornar os ativos de cada cliente. 
</details>

<details>
  <summary  id="diagrama"><strong>/ativos</strong></summary>

  #### GET /ativo
  Busca todos os ativos disponivéis na tabela Ativo para serem comercializadas retorno do tipo:

  ```
    [
      {
        "codAtivo": 1,
        "nameAtivo": "QUAT",
        "qtdeAtivo": 1000,
        "valor": "10.00"
      },
      {
        "codAtivo": 2,
        "nameAtivo": "Gol",
        "qtdeAtivo": 2000,
        "valor": "20.00"
      },
      {
        "codAtivo": 3,
        "nameAtivo": "Armac",
        "qtdeAtivo": 3000,
        "valor": "30.00"
      },
      {
        "codAtivo": 4,
        "nameAtivo": "Azul",
        "qtdeAtivo": 4000,
        "valor": "40.00"
      }
    ]
  ```
  #### GET  /ativo:id
  Busca o ativo correspondente ao id passado na rota
  ```
  [
    {
      "codAtivo": 1,
      "nameAtivo": "QUAT",
      "qtdeAtivo": 1000,
      "valor": "10.00"
    }
  ]

```
  Caso o id não correponda a nenhum produto retorna a mensagem:
  ```
  {
    "message": "O id ${codAtivo} was not found"
  }

  ```
  #### GET no endpoint /ativo/cliente:id
  Nesse caso, necessita de uim token de autenticação do cliente referente ao id
  Retorna todos os ativos que pertencem ao cliente do id enviado, essa rota precisa de um token, deve ser inserir o mesmo nas rotas

   ```
    [
    {
      "codCliente": 1,
      "codAtivo": 1,
      "nameAtivo": "QUAT",
      "qtdeClienteAtivo": 10,
      "valor": "10.00"
    },
    {
      "codCliente": 1,
      "codAtivo": 2,
      "nameAtivo": "Gol",
      "qtdeClienteAtivo": 20,
      "valor": "20.00"
    },
    {
      "codCliente": 1,
      "codAtivo": 3,
      "nameAtivo": "Armac",
      "qtdeClienteAtivo": 5,
      "valor": "30.00"
    },
    {
      "codCliente": 1,
      "codAtivo": 4,
      "nameAtivo": "Azul",
      "qtdeClienteAtivo": 2,
      "valor": "40.00"
    }
  ]

  ```
  Caso o cliente não tenha ativos comprados retorna a mensagem
  ```
  {
	  "message": "O id 4 was not found with any assets"
  }
  ```
  </details>

  <details>
  <summary  id="diagrama"><strong>/conta</strong></summary>

  #### PUT /conta/deposito

  Body a ser enviado na requisição
  ```
  {
  "codCliente":  4
  "valor":  10000 
  }

  ```
  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero

  > valor:
  * não pode  ser nulo ou undefined
  * deve ser um numero
  * deve ser maior que 0

  Se o cod do cliente enviado não estiver cadastrado retorna:
  ```
  {
    "message": "O id ${codCliente} was not found"
  }
  
  ```
  Se tudo der certo apresenta o retorno do saldo do Cliente

  ```
  {
    "codCliente":  4
    "valor":  10000 
  }
  ```
  #### PUT /conta/saque

  Body a ser enviado na requisição
  ```
  {
  "codCliente":  4
  "valor":  10000 
  }

  ```
  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero

  > valor:
  * não pode  ser nulo ou undefined
  * deve ser um numero
  * deve ser maior que 0

  Se o cod do cliente enviado não estiver cadastrado retorna a mensagem:
  ```
  {
    "message": "O id ${codCliente} was not found"
  }
  
  ```
  Se o valor a ser sacado for maior que o saldo disponível retorna a mensagem:
  ```
  {
	"message": "Insufficient Funds"
  }
  ```
  Se tudo der certo apresenta o retorno do saldo do Cliente
  ```
  {
    "codCliente":  4
    "valor":  0 
  }
  ```
  </details>

  <details>
  <summary  id="diagrama"><strong>/ivestimento</strong></summary>

  #### POST /investimento/comprar

      Body a ser enviado na requisição

      ```
        {
        "codCliente": 1,
        "codAtivo": 4,
        "qtdeAtivo": 100
        }

      ```
  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero

  > valor:
  * não pode  ser nulo ou undefined
  * deve ser um numero
  * deve ser maior que 0

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero
  Quando a qtdeAtivo a ser comprada  é igual a quantidade disponível da corretora, ou maior, a operação não é realizada, retornando uma mensagem:
  ```
  {
	"message": "\"qtdeAtivo\" ${qtdeAtivo} is invalid to buy"
  }
  ```
  Quando valor da operação a ser realizada não pode ser  paga pelo saldo do usuário,
  nesse caso a relação, (qtdeAtivos X valor unitário) < saldo do usuário
  ```
  {
	"message": "Insufficient Funds"
  }
  ```
  Quando a operação é realizada, as seguintes tabelas são atualizadas e respsota volta com [{}]
  Atualiza o saldo na tabelas de Contas [saldo = saldo Anterior -  (qtdeAtivos X valor unitário)] 
  Atualiza  a qtdeAtivos na Tabela ClientesAtivos   qtdeClienteAtivos = qtdeAnterior + qtdeComprada
  Atualiza a qtdeAtivo na Tabela de Ativos  qtdeAtivos =  qtdeAtivosAnterior – qtdeComprada

  ```
  [
	{}
  ]
  ```
  #### PUT /investimento/vender
  Body a ser enviado na requisição

  ```
  {
    "codCliente": 1,
    "codAtivo": 4,
    "qtdeAtivo": 100
  }
  ```

  > Middleware de Verificação: verifica os dados enviados na requisição, e retorna mensagem caso não atedam aos critérios abaixo

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero

  > valor:
  * não pode  ser nulo ou undefined
  * deve ser um numero
  * deve ser maior que 0

  > codCliente: 
  * não pode  ser nulo ou undefined
  * deve ser um numero

  Quando qtdeAtivo a ser vendida é maior que a quantidade que o usuário possui, retorna a mensagem:

  ```
  {
	"message": "\"qtdeAtivo\" #{qtdeAtivos} is invalid for sell"
  }
  ```
  Quando o cliente deseja vender um ativo que ele não possui, retorna a mensagem:
  
  ```
  {
	"message": "O id of client 4 or id of asset was not found"
  }
  ```
  Quando a operação é realizada as seguintes tabelas são atualizadas e respsota volta com [{}]
  Atualiza o saldo na tabelas de Contas, saldo do cliente [saldo = saldo Anterior +  (qtdeAtivosVendidos X valor unitário)] 
  Atualiza  a qtdeAtivos na Tabela ClientesAtivos, ou exclui, caso o cliente venda todos os seus ativos
  Atualiza a qtdeAtivo na Tabela de Ativos qtdeAtivos =  qtdeAtivosAnterior + qtdeVendida

  ```
  [
	{}
  ]
  ```
  </details>
