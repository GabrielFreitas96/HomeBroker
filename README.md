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

<details>
  <summary  id="diagrama"><strong>Middleware de Autenticação</strong></summary>
  Todas as rotas, com exceção da /ativos e /ativos/id, necessitam de um token para realizar as ações.
  Portanto, ao fazer o login, deve se copiar token retornado. Esse token deve sr inserido no headers com a chave authorization.
  A autenticação verifica o codCliente, logo, o token de um cliente não permite realizar ações para outros usuários.

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