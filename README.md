# Compassolisa :oncoming_automobile:

A compass.uol entrou em um novo ramo de mercado, a compassolisa um seguimento de aluguel de  todos os tipos de carros.

____

### Como baixar e configurar

- **Requisitos**: NPM e Node.js
- Porta padrão: **3000**
- **Coloque** seus **dados** referentes ao banco de dados em um **arquivo .env**, seguindo o **exemplo** que consta no arquivo **.env.example**.

### Passo a passo - no terminal: 🏃

1. Clonar o repositório:

   ```
   git clone https://github.com/FtxDante/api-compassolisa.git
   ```

2. Instalar as dependências:

   ```
   npm install
   ```
3. Após clonar e instalar as dependências:

   ```
   npm start
   ```

Agora o servidor está ouvindo a portal 3000 do localhost.

### Como usar o servidor: 

## ❑ Autenticação :closed_lock_with_key:

:white_circle:**POST** /authenticate:

 Nesta rota o cliente conseguirá obter o token que garante sua identidade. Token será necessário para acesso em algumas outras rotas da API. Cliente deverá passar no body um json contendo e-mail e senha previamente cadastrados na rota POST /people.

**Obs:** O token será recebido no header da resposta.

Na rota `localhost:3000/api/v1/authenticate` passe o e-mail e senha cadastrado.

```js
//Exemplo:
{
"email": "joazinho@email.com",
"senha": "123456"
}
```



## ❑ Car :car:

:large_blue_circle: **POST /car:** 

Nesta rota o cliente poderá cadastrar um carro com as seguintes informações: modelo, cor, ano, acessórios e quantidade de passageiros.

 :warning:**Atenção:** 

* Todos os campos devem ser preenchidos,
* O ano do carro não pode ser menor que 1950 e maior que 2022,
* Os acessórios não podem se repetir.

Na rota `localhost:3000/api/v1/car` :

```js
//Exemplo:
{
    "modelo": "GM S10 2.8",
    "cor": "branco",
    "ano": 2018,
    "acessorios": [
        {"descricao": "painel-solar"},
        {"descricao": "cambio-automatico"}
    ],
    "quantidadePassageiros": 5
}

```



:large_blue_circle: **GET /car**

Nesta rota o cliente poderá ver todos os carros cadastrados no banco de dados. É possível realizar busca por parâmetros passados pela própria url.

``` Exemplo: car?cor=azul``` irá retornar todos os carros com a cor azul. 

Existe **paginação**, você pode controlar dessa maneira: ```car?page=10&&limit=50```

**OBS: **Token necessário

Na rota `localhost:3000/api/v1/car` :

```json
{
  "cars": [
    {
      "_id": "618d8157ff8f027ddecfe182",
      "modelo": "Corsa",
      "cor": "azul",
      "ano": 2018,
      "acessorios": [
        {
          "_id": "61916ecbc07c7dab0d9b41f7",
          "descricao": "painel-solar"
        }
      ],
      "quantidadePassageiros": 5
    }
  ],
  "total": 999,
  "limit": 1,
  "offset": 1,
  "offsets": 999
}
```



:large_blue_circle: **DELETE/car**

Nesta rota o cliente poderá apagar um carro cadastrado no banco de dados.

Em caso de sucesso o resultado será body vazio com status 204.

**OBS: Token necessário**

Na rota `localhost:3000/api/v1/car/:id` :

```json
// Nada será retornado
```

:large_blue_circle: **PUT/car/{id}**  

Nesta rota o cliente poderá editar as informações cadastradas em um carro.

**OBS: Token necessário** 

Na rota `localhost:3000/api/v1/car/:id` :

```js
//Exemplo:
{
    "_id": "61748a5a95eca4d41496e989",
    "modelo": "corolla"
    "cor": "azul",
    "ano": 2021,
    "acessorios": [
        {"descricao": "cambio-automatico"}
    ],
    "quantidadePassageiros": 5,
    "__v": 0
}
```



:large_blue_circle: **GET /car/{id}**

Nesta rota o cliente poderá ver as informações cadastradas do carro com id passado no parâmetro. 

**OBS: Token necessário**

Na rota `localhost:3000/api/v1/car/:id` :

```js
//Exemplo:
{
    "_id": "61748a5a95eca4d41496e989",
    "modelo": "corolla"
    "cor": "azul",
    "ano": 2021,
    "acessorios": [
        {"descricao": "cambio-automatico"}
    ],
    "quantidadePassageiros": 5,
    "__v": 0
}
```

---



## ❑ People :couple:

:red_circle: **POST /people**

Nesta rota o cliente poderá cadastrar uma pessoa com as seguintes informações: nome, cpf, data de nascimento, e-mail, senha, habilitado.

 :warning: **Atenção:** 

* Todos os campos devem ser preenchidos,
* A pessoa deverá ter no mínimo 18 anos a partir da data de cadastro,
* CPF / e-mail deve ser válido,
* A senha deverá ter no mínimo 6 dígitos,
* Habilitado deverá ser sim ou não.

Na rota `localhost:3000/api/v1/people` :

```js
//Exemplo:
{
"nome": "joao da cruz",
"cpf": "131.147.860-49",
"data_nascimento": "03/03/2000",
"email": "joazinho@email.com",
"senha": "123456",
"habilitado": "sim"
}

```



:red_circle: **GET /people**

Nesta rota o cliente poderá ver todos as pessoas cadastradas no banco de dados. É possível realizar busca por parâmetros passados pela própria url.

``` Exemplo: people?habilitado=nao``` irá retornar todos as pessoas não habilitadas. 

Existe **paginação**, você pode controlar dessa maneira: ```people?page=10&&limit=50```

Na rota `localhost:3000/api/v1/people` :

```json
{
  "people": [
    {
      "_id": "6182b7f03e2927bb76db0778",
      "nome": "joaozinho ciclan2o",
      "cpf": "101.892.220-26",
      "data_nascimento": "2001-03-03T03:00:00.000Z",
      "email": "joazinho4@email992223.com",
      "habilitado": "sim"
    }
  ],
  "total": 999,
  "limit": 100,
  "offset": 1,
  "offsets": 999
}
```



:red_circle: **DELETE/people**

Nesta rota o cliente poderá apagar uma pessoa cadastrada no banco de dados.

Na rota `localhost:3000/api/v1/people/:id` :

Em caso de sucesso o resultado será body vazio com status 204.

```json
// Nada será retornado
```



:red_circle: **PUT/people/{id}**  

Nesta rota o cliente poderá editar as informações de uma pessoa cadastrada. 

**Obs: ** É necessário passar todos os campos.

Na rota `localhost:3000/api/v1/people/:id`:

```js
//Exemplo:
{
"nome": "joao da cruz e espada",
"cpf": "131.147.860-49",
"data_nascimento": "03/03/2000",
"email": "joazinho@email.com",
"senha": "123456",
"habilitado": "nao"
}
```



:red_circle: **GET/people/{id}**  

Nesta rota o cliente poderá ver as informações cadastradas de uma pessoa com id passado no parâmetro. 

Na rota `localhost:3000/api/v1/people/:id` :

```js
//Exemplo:
{
    "_id": "617db5b8b7cac0d01c776a6f",
    "nome": "Daniel Jorge",
    "cpf": "268.720.730-63",
    "data_nascimento": "2000-03-03T03:00:00.000Z",
    "email": "grand2121d@chase.com",
    "habilitado": "nao"
}
```

## Rental :office:

:radio_button: **POST/rental **

Nesta Rota o cliente poderá cadastrar uma locadora com as seguintes informações: nome, cnpj, atividades, endereço.

:warning: **Atenção**

* Todos os campos devem ser preenchidos, **exceto** o complemento.

* Somente um isFilial deve ser false,

* CNPJ deve ser válido,

* O endereço **pode** contar mais de um item.

* Não deve haver CNPJs duplicados

  Na rota `localhost:3000/api/v1/rental` :

  ```json
  {
      "nome": "Localiza Rent a Car",
      "cnpj": "16.670.085/0001-55",
      "atividades": "Aluguel de Carros E Gestão de Frotas",
      "endereco": [
          {
              "cep": "96200-200",
              "number":"1234",
              "isFilial": false
          },
          {
              "cep": "94813-200",
              "number":"994",
              "isFilial": true
          }
      ]
  }
  ```

  

:radio_button: **GET/rental**

Nesta rota o usuário poderá ver todos as locadoras cadastradas no banco de dados. É possível realizar busca por parâmetros passados pela própria url.

Exemplo: `rental?nome=Localiza Rent a Car` irá retornar todas as locadoras com esse nome. 

Existe **paginação**, você pode controlar dessa maneira: ```rental?page=10&&limit=50```

Na rota `localhost:3000/api/v1/rental` :

```json
// Exemplo: 
{
    "locadoras": [
        {
        "id": "123",
        "nome": "Localiza Rent a Car",
        "cnpj": "16.670.085/0001-55",
        "atividades": "Aluguel de Carros E Gestão de Frotas",
        "endereco": {
            "cep": "96200-200",
            "logradouro": "Rua General Canabarro",
            "complemento": "",
            "bairro": "Centro",
            "number":"1234",
            "localidade": "Rio Grande",
            "uf": "RS"
        }
    }
    ],
    "total": 1,
    "limit": 100,
    "offset": 1,
    "offsets": 1
}
```

:radio_button: **GET/rental/{id}**

Nesta Rota o usuário será capaz de ver uma locadora a partir do endereço passado no parâmetro.

Na rota `localhost:3000/api/v1/rental/:id` :

```json
//Exemplo de resposta
{
    "id": "123",
    "nome": "Localiza Rent a Car",
    "cnpj": "16.670.085/0001-55",
    "atividades": "Aluguel de Carros E Gestão de Frotas",
    "endereco": [{
        "cep": "96200-200",
        "logradouro": "Rua General Canabarro",
        "complemento": "",
        "bairro": "Centro",
        "number":"1234",
        "localidade": "Rio Grande",
        "uf": "RS"
    	}
  	]
}
```

:radio_button: **PUT/rental/{id}**

:warning: **Atenção**

* Qualquer campo pode ser alterado

* Caso o ID seja diferente do padrão deve retornar 400, informando o erro.

* Assim como as regras do cadastrar valem para o update.

Na rota `localhost:3000/api/v1/rental/:id` :

```json
{
    "id": "123",
    "nome": "Localiza Rent a Car",
    "cnpj": "16.670.085/0001-55",
    "atividades": "Aluguel de Carros E Gestão de Frotas",
    "endereco": [{
        "cep": "96200-200",
        "logradouro": "Rua General Canabarro",
        "complemento": "",
        "bairro": "Centro",
        "number":"1234",
        "localidade": "Rio Grande",
        "uf": "RS"
    }]
}
```

##### Esperamos que a API lhe seja útil !
