Cliente
Um cliente da loja. As contas de clientes armazenam informações de contato do cliente, poupando os clientes logados do trabalho de fornecê-las em cada caixa.

Propriedade	Explicação
eu ia	O identificador numérico exclusivo do Cliente
nome	Nome do Cliente
e-mail	E-mail do Cliente
telefone	Número de telefone do cliente (não necessariamente o mesmo que o telefone do endereço)
identificação	Identificação do cliente (no Brasil, por exemplo, seria o CPF/CNPJ)
observação	Anotações do proprietário da loja sobre o cliente
endereço_padrão	Endereço de entrega padrão do Cliente
endereços	Lista de endereços de entrega para o Cliente
Endereço de Cobrança	Endereço de cobrança do cliente
número_de_faturamento	Número de faturamento do cliente
piso de cobrança	Piso de Faturação do Cliente
localidade_de_faturamento	Localidade de faturamento do Cliente
código_postal_de_faturamento	CEP de cobrança do Cliente
cidade_de_faturamento	Cidade de cobrança do Cliente
província_de_faturamento	Província de faturamento do Cliente
país_de_faturamento	Código do país de cobrança do cliente
extra	Um objeto JSON contendo informações personalizadas. Pode ser definido via API ou por meio de campos de formulário personalizados com o nome "extra[chave]" no formulário de cadastro do cliente na loja virtual.
total_gasto	O valor total de dinheiro que o Cliente gastou na loja
total_de_moeda_gasta	A moeda total gasta no formato ISO 4217
id_do_último_pedido	O id do último pedido do cliente
ativo	“true” se o Cliente ativou sua conta. “false” se ele/ela não ativou sua conta.
criado_em	Data em que o Cliente foi criado no formato ISO 8601
atualizado_em	Data da última atualização do Cliente no formato ISO 8601
aceita_marketing	Campo booleano. Indica se o comprador aceitou receber ofertas e novidades por e-mail. Campo somente leitura na API.
aceita_marketing_atualizado_em	Data em que o comprador atualizou sua preferência em relação ao recebimento de notícias por e-mail.
OBTER / 
Receba uma lista de todos os clientes.

Parâmetro	Explicação
desde_id	Restringir resultados após o ID especificado
criado_em_min	Mostrar clientes criados após a data ( formato ISO 8601 )
criado_no_máximo	Mostrar clientes criados antes da data ( formato ISO 8601 )
atualizado_no_min	Mostrar clientes atualizados pela última vez após a data ( formato ISO 8601 )
atualizado_no_máximo	Mostrar clientes atualizados pela última vez antes da data ( formato ISO 8601 )
página	Página para mostrar
por_página	Quantidade de resultados
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
q	Pesquisar clientes que contenham o texto fornecido em seu nome, e-mail ou identificação
e-mail	Pesquisar clientes que correspondem ao e-mail fornecido
OBTER / 
HTTP/1.1 200 OK

[
    {
      "created_at": "2013-01-03T09:11:51-03:00",
      "email": "john.doe@example.com",
      "id": 101,
      "identification": "28776255670",
      "last_order_id": 9001,
      "name": "John Doe",
      "note": null,
      "phone": null,
      "total_spent": "89.00",
      "total_spent_currency": "USD",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "billing_address": "Evergreen Terrace",
      "billing_city": "Springfield",
      "billing_country": "US",
      "billing_floor": null,
      "billing_locality": null,
      "billing_number": "742",
      "billing_phone": "555-123-0413",
      "billing_province": "Oregon",
      "billing_zipcode": "97475",
      "extra": {
        "number_of_children": "2",
        "gender": "male"
      },
      "default_address": {
        "address": "Evergreen Terrace",
        "city": "Springfield",
        "country": "US",
        "created_at": "2013-01-03T09:11:51-03:00",
        "default": true,
        "floor": null,
        "id": 1234,
        "locality": null,
        "number": "742",
        "phone": "555-123-0413",
        "province": "Oregon",
        "updated_at": "2013-03-10T11:13:01-03:00",
        "zipcode": "97475"
      },
      "addresses": [
        {
          "address": "Evergreen Terrace",
          "city": "Springfield",
          "country": "US",
          "created_at": "2013-01-03T09:11:51-03:00",
          "default": true,
          "floor": null,
          "id": 1234,
          "locality": null,
          "number": "742",
          "phone": "555-123-0413",
          "province": "Oregon",
          "updated_at": "2013-03-10T11:13:01-03:00",
          "zipcode": "97475"
        }
      ]
    },
    {
      "created_at": "2013-04-07T09:11:51-03:00",
      "email": "john.doe@example.com",
      "id": 112,
      "identification": "28776255671",
      "last_order_id": null,
      "name": "Zé Ninguém",
      "note": null,
      "phone": "392502584",
      "total_spent": "0.00",
      "total_spent_currency": "USD",
      "updated_at": "2013-04-08T11:11:51-03:00",
      "billing_address": "Evergreen Terrace",
      "billing_city": "Springfield",
      "billing_country": "US",
      "billing_floor": null,
      "billing_locality": null,
      "billing_number": "742",
      "billing_phone": "555-123-0413",
      "billing_province": "Oregon",
      "billing_zipcode": "97475",
      "extra": {
        "number_of_children": "2",
        "gender": "male"
      },
      "default_address": {
        "address": "Praça Roberto Gomes Pedrosa",
        "city": "São Paulo",
        "country": "BR",
        "created_at": "2013-04-07T09:11:51-03:00",
        "default": true,
        "floor": null,
        "id": 1234,
        "locality": "Morumbi",
        "number": "1",
        "phone": "11 3749-8000",
        "province": "São Paulo",
        "updated_at": "2013-04-08T11:13:01-03:00",
        "zipcode": "05653-070"
      },
      "addresses": [
        {
          "address": "Praça Roberto Gomes Pedrosa",
          "city": "São Paulo",
          "country": "BR",
          "created_at": "2013-04-07T09:11:51-03:00",
          "default": true,
          "floor": null,
          "id": 1234,
          "locality": "Morumbi",
          "number": "1",
          "phone": "11 3749-8000",
          "province": "São Paulo",
          "updated_at": "2013-04-08T11:13:01-03:00",
          "zipcode": "05653-070"
        }
      ]
    }
]

OBTER /clientes?since_id= 
HTTP/1.1 200 OK

[
    {
      "created_at": "2013-01-03T09:11:51-03:00",
      "email": "john.doe@example.com",
      "id": 101,
      "identification": "28776255670",
      "last_order_id": 9001,
      "name": "John Doe",
      "note": null,
      "phone": null,
      "total_spent": "89.00",
      "total_spent_currency": "USD",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "billing_address": "Evergreen Terrace",
      "billing_city": "Springfield",
      "billing_country": "US",
      "billing_floor": null,
      "billing_locality": null,
      "billing_number": "742",
      "billing_phone": "555-123-0413",
      "billing_province": "Oregon",
      "billing_zipcode": "97475",
      "extra": {
        "number_of_children": "2",
        "gender": "male"
      },
      "default_address": {
        "address": "Evergreen Terrace",
        "city": "Springfield",
        "country": "US",
        "created_at": "2013-01-03T09:11:51-03:00",
        "default": true,
        "floor": null,
        "id": 1234,
        "locality": null,
        "number": "742",
        "phone": "555-123-0413",
        "province": "Oregon",
        "updated_at": "2013-03-10T11:13:01-03:00",
        "zipcode": "97475"
      },
      "addresses": [
        {
          "address": "Evergreen Terrace",
          "city": "Springfield",
          "country": "US",
          "created_at": "2013-01-03T09:11:51-03:00",
          "default": true,
          "floor": null,
          "id": 1234,
          "locality": null,
          "number": "742",
          "phone": "555-123-0413",
          "province": "Oregon",
          "updated_at": "2013-03-10T11:13:01-03:00",
          "zipcode": "97475"
        }
      ]
    }
]

OBTER /clientes/{id 
Receba um único cliente

Parâmetro	Explicação
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
OBTER /clientes/ 
HTTP/1.1 200 OK

{
  "created_at": "2013-01-03T09:11:51-03:00",
  "email": "john.doe@example.com",
  "id": 101,
  "identification": "28776255670",
  "last_order_id": 9001,
  "name": "John Doe",
  "note": null,
  "phone": null,
  "total_spent": "89.00",
  "total_spent_currency": "USD",
  "updated_at": "2013-03-11T09:14:11-03:00",
  "billing_address": "Evergreen Terrace",
  "billing_city": "Springfield",
  "billing_country": "US",
  "billing_floor": null,
  "billing_locality": null,
  "billing_number": "742",
  "billing_phone": "555-123-0413",
  "billing_province": "Oregon",
  "billing_zipcode": "97475",
  "extra": {
    "number_of_children": "2",
    "gender": "male"
  },
  "default_address": {
    "address": "Evergreen Terrace",
    "city": "Springfield",
    "country": "US",
    "created_at": "2013-01-03T09:11:51-03:00",
    "default": true,
    "floor": null,
    "id": 1234,
    "locality": null,
    "number": "742",
    "phone": "555-123-0413",
    "province": "Oregon",
    "updated_at": "2013-03-10T11:13:01-03:00",
    "zipcode": "97475"
  },
  "addresses": [
    {
      "address": "Evergreen Terrace",
      "city": "Springfield",
      "country": "US",
      "created_at": "2013-01-03T09:11:51-03:00",
      "default": true,
      "floor": null,
      "id": 1234,
      "locality": null,
      "number": "742",
      "phone": "555-123-0413",
      "province": "Oregon",
      "updated_at": "2013-03-10T11:13:01-03:00",
      "zipcode": "97475"
    }
  ]
}

POST / 
Criar um novo cliente

POST / 
Parâmetro	Explicação
enviar_email_convite	Enviar um e-mail para notificar o cliente sobre seu registro
senha	Senha do usuário
{
    "name": "First Last",
    "email": "first.last@example.com",
    "phone": "+55 11 9 1234-5678",
    "addresses": [
      {
        "address": "My Street",
        "city": "My City",
        "country": "BR",
        "locality": "Morumbi",
        "number": "123",
        "phone": "+55 11 9 1234-5678",
        "province": "São Paulo",
        "zipcode": "05653-071"
      }
    ],
    "send_email_invite": true,
    "password": "mysupersecretpassword"
}

HTTP/1.1 201 Created

{
  "created_at": "2013-06-01T09:11:51-03:00",
  "email": "john.doe+modified@example.com",
  "id": 101,
  "identification": "28776255670",
  "last_order_id": 9001,
  "name": "John Doe",
  "note": null,
  "total_spent": "89.00",
  "total_spent_currency": "USD",
  "updated_at": "2013-06-01T09:11:51-03:00",
  "billing_address": null,
  "billing_city": null,
  "billing_country": null,
  "billing_floor": null,
  "billing_locality": null,
  "billing_number": null,
  "billing_phone": null,
  "billing_province": null,
  "billing_zipcode": null,
  "extra": {
    "number_of_children": "2",
    "gender": "male"
  },
  "default_address": {
    "address": "My Street",
    "city": "My City",
    "country": "BR",
    "created_at": "2013-06-01T09:11:51-03:00",
    "default": true,
    "floor": null,
    "id": 1240,
    "locality": null,
    "number": "123",
    "phone": "11 1234-5678",
    "province": "São Paulo",
    "updated_at": "2013-06-01T09:11:51-03:00",
    "zipcode": "05653-071"
  },
  "addresses": [
    {
      "address": "My Street",
      "city": "My City",
      "country": "BR",
      "created_at": "2013-06-01T09:11:51-03:00",
      "default": true,
      "floor": null,
      "id": 1240,
      "locality": null,
      "number": "123",
      "phone": "11 1234-5678",
      "province": "São Paulo",
      "updated_at": "2013-06-01T09:11:51-03:00",
      "zipcode": "05653-071"
    }
  ]
}

COLOQUE /clientes/{id 
Modificar um cliente existente

COLOQUE /clientes/ 
{
  "created_at": "2013-01-03T09:11:51-03:00",
  "email": "john.doe+modified@example.com",
  "id": 101,
  "identification": "28776255670",
  "last_order_id": 9001,
  "name": "John Doe",
  "note": null,
  "phone": "911",
  "total_spent": "89.00",
  "total_spent_currency": "USD",
  "billing_address": "Evergreen Terrace",
  "billing_city": "Springfield",
  "billing_country": "US",
  "billing_floor": null,
  "billing_locality": null,
  "billing_number": "742",
  "billing_phone": "555-123-0413",
  "billing_province": "Oregon",
  "billing_zipcode": "97475",
  "extra": {
    "number_of_children": "2",
    "gender": "male"
  },
  "updated_at": "2013-03-11T09:14:11-03:00",
  "default_address": {
    "address": "Evergreen Terrace",
    "city": "Springfield",
    "country": "US",
    "created_at": "2013-01-03T09:11:51-03:00",
    "default": true,
    "floor": null,
    "id": 1234,
    "locality": null,
    "number": "742",
    "phone": "555-123-0413",
    "province": "Oregon",
    "updated_at": "2013-03-10T11:13:01-03:00",
    "zipcode": "97475"
  },
  "addresses": [
    {
      "address": "Evergreen Terrace",
      "city": "Springfield",
      "country": "US",
      "created_at": "2013-01-03T09:11:51-03:00",
      "floor": null,
      "id": 1234,
      "locality": null,
      "number": "742",
      "phone": "555-123-0413",
      "province": "Oregon",
      "updated_at": "2013-03-10T11:13:01-03:00",
      "zipcode": "97475"
    }
  ]
}

HTTP/1.1 200 OK

{
  "created_at": "2013-01-03T09:11:51-03:00",
  "email": "john.doe+modified@example.com",
  "id": 101,
  "identification": "28776255670",
  "last_order_id": 9001,
  "name": "John Doe",
  "note": null,
  "phone": "911",
  "total_spent": "89.00",
  "total_spent_currency": "USD",
  "updated_at": "2013-06-01T09:14:11-03:00",
  "billing_address": "Evergreen Terrace",
  "billing_city": "Springfield",
  "billing_country": "US",
  "billing_floor": null,
  "billing_locality": null,
  "billing_number": "742",
  "billing_phone": "555-123-0413",
  "billing_province": "Oregon",
  "billing_zipcode": "97475",
  "extra": {
    "number_of_children": "2",
    "gender": "male"
  },
  "default_address": {
    "address": "Evergreen Terrace",
    "city": "Springfield",
    "country": "US",
    "created_at": "2013-01-03T09:11:51-03:00",
    "default": true,
    "floor": null,
    "id": 1234,
    "locality": null,
    "number": "742",
    "phone": "555-123-0413",
    "province": "Oregon",
    "updated_at": "2013-03-10T11:13:01-03:00",
    "zipcode": "97475"
  },
  "addresses": [
    {
      "address": "Evergreen Terrace",
      "city": "Springfield",
      "country": "US",
      "created_at": "2013-01-03T09:11:51-03:00",
      "default": true,
      "floor": null,
      "id": 1234,
      "locality": null,
      "number": "742",
      "phone": "555-123-0413",
      "province": "Oregon",
      "updated_at": "2013-03-10T11:13:01-03:00",
      "zipcode": "97475"
    }
  ]
}

EXCLUIR /clientes/{id 
Excluir um cliente

Importante: Não é possível excluir clientes com pedidos associados.

EXCLUIR /clientes/ 
HTTP/1.1 200 OK

{}

HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Unprocessable Entity",
    "description": "Cannot delete a customer with orders"
}