Ordem
Um pedido é criado quando um cliente conclui o processo de finalização da compra. Pedidos também podem ser criados pela API.

Receba todos os pedidos

Obter um pedido

Criar um pedido

Atualizar um pedido

Obtenha um histórico de valores de pedidos

Obtenha um histórico de edições de pedidos

Pagar um pedido

Fechar um pedido

Reabrir um pedido

Cancelar um pedido

Criar uma fatura

Ler uma fatura

Propriedade	Explicação
eu ia	O identificador numérico exclusivo do Pedido. É diferente denumber
símbolo	Especifica a localização do Pedido
id_da_loja	ID da loja à qual o pedido pertence
e-mail de contato	E-mail do comprador
telefone_de_contato	Telefone do comprador
identificação_de_contato	Identificação do comprador (CPF/CNPJ/DNI/CUIT)
número	Identificador numérico único para um Pedido, usado pelo proprietário da loja e pelos clientes. É sequencial e começa em 100.
concluído_em	Objeto que contém informações sobre a data de criação do Pedido. É a mesma data que a data de criação, mas em um tipo de dado diferente.
atributos	Uma lista com os atributos personalizados para este pedido
cliente	Cliente que comprou este Pedido. Somente fornecido se o escopo 'read_customers' estiver definido para o aplicativo.
produtos	Lista dos produtos adquiridos pela customer. Os conteúdos são explicados abaixo e os valores válidos são os correspondentes ao momento em que os produtos foram adquiridos
observação	Nota do cliente sobre o pedido
nota do proprietário	Nota do proprietário da loja sobre o pedido
cupom	Lista de cupons aplicados ao pedido
desconto	Valor total do desconto aplicado ao preço do pedido
subtotal	Preço do pedido antes do envio
total	Preço total do pedido, incluindo frete e descontos
total_usd	Preço total do pedido em dólares americanos
moeda	A moeda total gasta no formato ISO 4217
linguagem	Idioma do pedido usado pelo cliente durante o processo de finalização da compra
portal	ID do provedor de pagamento que processou a transação de pagamento do pedido.
id_do_gateway	[Somente leitura] ID de transação externa usada pelo provedor de pagamento.
nome_do_gateway	[Somente leitura] Nome do provedor de pagamento do pedido.
link_de_gateway	URL da página de detalhes da transação (no site do aplicativo de pagamentos). Pode ser nulo se o aplicativo de pagamento não tiver definido esta URL ou se for um método de pagamento personalizado.
Endereço para envio	Endereço de entrega do cliente para onde o pedido será enviado
nome_de_faturamento	Nome de cobrança do pedido
telefone de cobrança	Telefone de cobrança do pedido
Endereço de Cobrança	Endereço de cobrança do pedido
número_de_faturamento	Número de faturamento do pedido
piso de cobrança	Piso de faturamento para o pedido
localidade_de_faturamento	Localidade de faturamento do pedido
código_postal_de_faturamento	CEP de cobrança do pedido
cidade_de_faturamento	Cidade de cobrança do pedido
província_de_faturamento	Província de cobrança do pedido
país_de_faturamento	Código do país de cobrança do pedido
tipo_de_cliente_de_faturamento	Tipo de cliente de cobrança (pessoa física ou jurídica)
nome_da_empresa_de_faturamento	Nome da empresa de cobrança
regime_fiscal_de_faturamento	O ( Regime Fiscal de Faturamento ) é usado apenas no es_MX, e o padrão é 601. Para outros países, o padrão é nulo
uso_da_fatura_de_faturamento	O ( Uso da Fatura ) é usado apenas em es_MX, e o padrão é G01. Para outros países, o padrão é nulo
nome_comercial_de_faturamento	Nome comercial de cobrança
registro_de_estado_de_faturamento	Registro estadual de cobrança
tipo_de_documento_de_faturamento	Tipo de documento de cobrança
extra	Um objeto JSON contendo informações personalizadas. Pode ser definido via API ou por meio de campos de formulário personalizados com o nome "extra[chave]" no formulário de checkout do carrinho na vitrine.
vitrine	Origem do pedido. Os valores possíveis são "store" (pedido criado na vitrine), "meli" (pedido importado do Mercado Livre), "api" (pedido criado via API), "form" (pedido criado no painel administrativo com a funcionalidade de rascunho de pedidos) ou "pos" (pedido criado via aplicativo de ponto de venda).
checkout_habilitado	Descontinuado
peso	Peso total do pedido, em quilogramas
cancelado_em	Data em que o pedido foi cancelado no formato ISO 8601
fechado_em	Data em que o pedido foi fechado (arquivado) no formato ISO 8601
ler_em	Data em que o pedido foi marcado como lido no formato ISO 8601
status	Status do pedido. Os valores possíveis são "aberto", "fechado" ou "cancelado".
status_de_pagamento	Status de pagamento do pedido. Os valores possíveis são "autorizado", "pendente", "pago", "parcialmente_pago", "abandonado", "reembolsado", "parcialmente_reembolsado" ou "cancelado".
status_de_envio	Status de envio do pedido. Os valores possíveis são "desembalado", "enviado" (significa "atendido"), "não enviado" (significa "não atendido", possível apenas em Pedidos com remessas e não em Pedidos Digitais), "entregue", "parcialmente_embalado" (significa que pelo menos 1 Pedido de Atendimento foi embalado), "parcialmente_atendido" (significa que pelo menos 1 Pedido de Atendimento foi enviado).
detalhes do pagamento	Um objeto JSON contendo detalhes de pagamento.
pago_em	Data em que o pedido foi pago no formato ISO 8601 .
motivo_do_cancelamento	Motivo pelo qual o proprietário da loja cancelou um pedido. Os valores possíveis são "cliente", "fraude", "estoque" ou "outro".
criado_em	Data em que o Pedido foi criado no formato ISO 8601. É a mesma data que a data completed_at, mas em um tipo de dado diferente.
atualizado_em	Data da última atualização do Pedido no formato ISO 8601
detalhes do cliente	Detalhes do cliente para análise.
total_pago_pelo_cliente_incluindo_taxas	O total pago pelo cliente com base no valor relatado nas Transações com o Cliente, incluindo taxas, se houver.
id do aplicativo	Se o pedido foi criado via API por um aplicativo, ID do aplicativo. Caso contrário, nulo.
mesmo_endereço_de_cobrança_e_envio	"true" se o endereço de cobrança e o endereço de entrega forem iguais, "false" caso contrário.
total_pago_pelo_cliente	O valor total pago pelo Cliente no Pedido. Importante : este valor pode não ser igual ao total do Pedido (como em Pedidos não pagos ou parcialmente pagos). Além disso, a transação do Pedido pode não corresponder a este valor, visto que alguns Pedidos (por exemplo, Pedidos criados por meio de Rascunhos de Pedidos) não possuem transações associadas, assim como os Pedidos de Edição, que permitem modificar o preço do Pedido sem afetar a Transação associada. Por fim, este preço pode aumentar ou diminuir dependendo das edições do Pedido. Consulte o Webhook de Pedidos/Editados se desejar ser notificado sobre essas alterações.
realizações	Uma lista das Ordens de Atendimento da Ordem. Consulte a Página de Recursos da Ordem de Atendimento para referência do conteúdo. Consulte o aggregatesparâmetro para obter mais informações.
O productscampo tem o seguinte conteúdo:

Propriedade	Explicação
eu ia	ID do item. Um valor que identifica exclusivamente este produto no pedido.
id_do_produto	Produto adquirido
id_variante	Variante do produto adquirida
nome	Nome do produto no momento da compra
preço	Preço do produto no momento da compra
quantidade	Quantidade comprada
peso	Peso do produto no momento da compra
largura	Largura do produto no momento da compra
altura	Altura do produto no momento da compra
profundidade	Profundidade do produto no momento da compra
Frete grátis	Indica se o produto tem frete grátis ou não.
problemas	Possíveis problemas que podem ocorrer com um pedido. O conteúdo é explicado abaixo.
propriedades	Uma matriz com valores de campos personalizados
Importante: Em nossa API, é possível obter o mesmo product_iditem variant_idem itens de linha diferentes.
Por que isso acontece? Por exemplo, um pedido pode ter duas unidades da mesma variante, mas cada uma com campos personalizados diferentes.
É por isso que duas unidades ( quantity) não são enviadas no mesmo item de linha, mas sim como unidades separadas com valores diferentes na propertiesmatriz.

O products.idtem um valor incremental, o que significa que excede os limites de um int32tipo e pode exigir suporte para tipos de dados maiores, como int64. É crucial que o backend acomode campos com intervalos estendidos para evitar exceções que possam interromper a importação correta de informações.

O issuescampo tem o seguinte conteúdo:

Propriedade	Explicação do valor	Explicação do problema
estoque não reclamado	Quantidade de itens reclamados pelo usuário com estoque insuficiente	Isso pode acontecer devido a uma condição de corrida enquanto o usuário tenta pagar o pedido e outro usuário compra o mesmo item.
 Atendimento
O fulfillment_orderscampo é uma lista de Ordens de Atendimento conforme definido aqui .

Por padrão, apenas os IDs dos Pedidos de Atendimento são retornados. Para obter os detalhes, é possível usar a API de Pedidos de Atendimento ou adicionar o parâmetro aggregates=fulfillment_orderspara incluir os detalhes completos na resposta. Veja os exemplos abaixo .

 do pagamento
O payment_detailscampo tem o seguinte conteúdo:

Propriedade	Tipo	Explicação
método	Corda	Método de pagamento selecionado.
empresa_de_cartão_de_crédito	Corda	Empresa de cartão de crédito.
parcelas	Inteiro	Quantidade de parcelas.
OBTER / 
Receba uma lista de todos os Pedidos. Confira nossas recomendações sobre as melhores práticas para recuperar informações de pedidos na seção de Perguntas Frequentes abaixo.

Importante: Nossa API retorna até 30 resultados por padrão. Para recuperar um número maior de resultados, você deve usar os parâmetros de paginação ( pagee per_page).

Parâmetro	Explicação
desde_id	Restringir resultados após o ID especificado
status	Exibe pedidos com um determinado estado. Os valores possíveis são "qualquer" (padrão), "aberto", "fechado" ou "cancelado".
canais	Restringir os resultados ao canal de vendas especificado. Os valores possíveis são "form" (pedido de rascunho criado via administrador ou API), "store" (pedido criado na vitrine), "api" (pedido criado via API - não inclui pedidos de rascunho), "meli" (pedido importado do Mercado Livre) ou "pos" (pedido criado via aplicativo de ponto de venda).
status_de_pagamento	Exibir pedidos com um determinado status de pagamento. Os valores possíveis são "qualquer" (padrão), "pendente", "autorizado", "pago", "abandonado", "reembolsado" ou "cancelado".
status_de_envio	Exibe pedidos com um determinado status de envio. Os valores possíveis são "qualquer" (padrão), "desembalado", "não atendido" (significa "não enviado") ou "atendido" (significa "enviado").
criado_em_min	Mostrar pedidos criados após a data ( formato ISO 8601 )
criado_no_máximo	Mostrar pedidos criados antes da data ( formato ISO 8601 )
atualizado_no_min	Mostrar pedidos atualizados pela última vez após a data ( formato ISO 8601 )
atualizado_no_máximo	Mostrar pedidos atualizados pela última vez antes da data ( formato ISO 8601 )
total_min	Mostrar pedidos com valor total maior ou igual ao valor especificado
total_máx.	Mostrar pedidos com valor total menor ou igual ao valor especificado
IDs do cliente	Restringir resultados aos IDs de clientes especificados (separados por vírgula)
página	Página para mostrar
por_página	Quantidade de resultados
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
q	Pesquisar pedidos pelo número fornecido; ou contendo o texto fornecido no nome do cliente ou e-mail
id do aplicativo	Mostrar pedidos criados por um determinado aplicativo
métodos de pagamento	Mostrar pedidos com um determinado método de pagamento
provedor_de_pagamento	Mostrar pedidos com um determinado provedor de pagamento
agregados	Um valor possível: fulfillment_orders. Habilita um array chamado fulfillmentsque exibe informações parciais da Ordem de Atendimento. Se desejar obter as informações completas da Ordem de Atendimento, você pode usar o Recurso de Ordem de Atendimento ou buscar a Ordem individual com o aggregatesvalor correspondente.
OBTER / 
HTTP/1.1 200 OK

[
    {
        "id": 871254203,
        "token": "b872a1befbcde5aaf0517ecbcc910f5dc005350e",
        "store_id": "817495",
        "contact_email": "buyer@tiendanube.com",
        "contact_name": "Maria Silva",
        "contact_phone": "+551533276436",
        "contact_identification": "75839566500",
        "billing_name": "Maria",
        "billing_phone": "+551533276436",
        "billing_address": "Rua Doutor Azevedo Sampaio",
        "billing_number": "50",
        "billing_floor": "",
        "billing_locality": "Centro",
        "billing_zipcode": "18010220",
        "billing_city": "Sorocaba",
        "billing_province": "São Paulo",
        "billing_country": "BR",
        "coupon": [],
        "promotional_discount": {
            "id": null,
            "store_id": 817495,
            "order_id": "871254203",
            "created_at": "2022-11-15T19:37:08+0000",
            "total_discount_amount": "0.00",
            "contents": [],
            "promotions_applied": []
        },
        "subtotal": "6000.00",
        "discount": "600.00",
        "discount_coupon": "0.00",
        "discount_gateway": "600.00",
        "total": "5400.00",
        "total_usd": "40.79",
        "checkout_enabled": true,
        "weight": "0.000",
        "currency": "ARS",
        "language": "es",
        "gateway": "offline",
        "gateway_id": null,
        "gateway_name": "Transferencia Bancaria",
        "extra": {},
        "storefront": "store",
        "note": "",
        "created_at": "2022-11-15T19:36:59+0000",
        "updated_at": "2022-11-15T19:37:08+0000",
        "completed_at": {
            "date": "2022-11-15 19:36:59.000000",
            "timezone_type": 3,
            "timezone": "UTC"
        },
        "payment_details": {
            "method": "custom",
            "credit_card_company": null,
            "installments": 1
        },
        "same_billing_and_shipping_address": false,
        "attributes": [],
        "customer": {
            "id": 105799009,
            "name": "Maria Silva",
            "email": "buyer@tiendanube.com",
            "identification": "75839566500",
            "phone": "+551533276436",
            "note": null,
            "default_address": {
                "address": "Evergreen Terrace",
                "city": "New York",
                "country": "US",
                "created_at": "2022-11-15T19:36:59+0000",
                "default": true,
                "floor": "Apartment 8",
                "id": 80189931,
                "locality": "Bronx",
                "name": "John Doe",
                "number": "742",
                "phone": "john.doe@example.com",
                "province": "New York",
                "updated_at": "2022-11-15T19:36:59+0000",
                "zipcode": "10451"
            },
            "addresses": [
                {
                    "address": "Evergreen Terrace",
                    "city": "New York",
                    "country": "US",
                    "created_at": "2022-11-15T19:36:59+0000",
                    "default": true,
                    "floor": "Apartment 8",
                    "id": 80189931,
                    "locality": "Bronx",
                    "name": "John Doe",
                    "number": "742",
                    "phone": "john.doe@example.com",
                    "province": "New York",
                    "updated_at": "2022-11-15T19:36:59+0000",
                    "zipcode": "10451"
                }
            ],
            "billing_name": "Maria",
            "billing_phone": "+551533276436",
            "billing_address": "Rua Doutor Azevedo Sampaio",
            "billing_number": "50",
            "billing_floor": "",
            "billing_locality": "Centro",
            "billing_zipcode": "18010220",
            "billing_city": "Sorocaba",
            "billing_province": "São Paulo",
            "billing_country": "BR",
            "extra": {},
            "total_spent": "27.00",
            "total_spent_currency": "USD",
            "last_order_id": 871254203,
            "active": false,
            "first_interaction": "2022-11-15T19:36:59+0000",
            "created_at": "2022-11-15T19:36:59+0000",
            "updated_at": "2022-11-15T19:36:59+0000"
        },
        "products": [
            {
                "id": 1069053829,
                "depth": "0.00",
                "height": "0.00",
                "name": "Mesa de Roble",
                "price": "6000.00",
                "compare_at_price": "37.77",
                "product_id": 111334785,
                "image": {
                    "id": 277896749,
                    "product_id": 111334785,
                    "src": "https://d2r9epyceweg5n.cloudfront.net/stores/817/495/products/pexels-olya-prutskova-89764951-74e3f47763f1aec3ec16448436206687-1024-1024.jpg",
                    "position": 1,
                    "alt": [],
                    "created_at": "2022-02-14T13:00:03+0000",
                    "updated_at": "2022-10-28T21:52:37+0000"
                },
                "quantity": "1",
                "free_shipping": false,
                "weight": "0.00",
                "width": "0.00",
                "variant_id": "426215948",
                "variant_values": [],
                "properties": [],
                "sku": "12389012348124801234890",
                "barcode": null
            }
        ],
        "number": 306,
        "cancel_reason": null,
        "owner_note": null,
        "cancelled_at": null,
        "closed_at": null,
        "read_at": null,
        "status": "open",
        "payment_status": "pending",
        "gateway_link": null,
        "shipping_address": {
            "address": "Evergreen Terrace",
            "city": "New York",
            "country": "US",
            "created_at": "2022-11-15T19:23:59+0000",
            "default": false,
            "floor": "Apartment 8",
            "id": 0,
            "locality": "Bronx",
            "name": "John Doe",
            "number": "742",
            "phone": "john.doe@example.com",
            "province": "New York",
            "updated_at": "2022-11-15T19:37:08+0000",
            "zipcode": "10451",
            "customs": null
        },
        "shipping_status": "unpacked",
        "paid_at": null,
        "client_details": {
            "browser_ip": "181.16.41.4",
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
        },
        "app_id": null
    }
]


OBTER /pedidos?agregados= 
HTTP/1.1 200 OK

[
    {
        "id": 871254203,
        "token": "b872a1befbcde5aaf0517ecbcc910f5dc005350e",
        "store_id": "817495",
        ... // All fields from GET /orders are included in the response
        "fulfillment_orders": [
                    {
            "id": "01BX5ZZKBKACTAV9WEVGEMMVRZ",
            "number": "123456",
            "total_quantity": 12,
            "total_weight": 12.12,
            "total_price": {
               "value": 123.45,
               "currency": "BRL",
            },
            "assigned_location": {
               "id": "123e4567-e89b-12d3-a456-426614174000",
               "name": "Location name",
               "address": {
                  "zipcode": "12910802",
                  "street": "Some Street",
                  "number": "100",
                  "floor": "Some Floor",
                  "locality": "Some Locality",
                  "city": "Some City",
                  "reference": "Some Reference",
                  "between_streets": "Some Between Streets",
                  "province": {
                     "code": "SP",
                     "name": "São Paulo"
                   },
                   "region": {
                      "code": "SE",
                      "name": "Sudeste"
                   },
                   "country": {
                      "code": "BR",
                      "name": "Brasil"
                   }
               }
            },
            "line_items": [
               {
                  "id": "12345",
                  "quantity": 1,
                  "order_line_item_id": "12345678",
                  "created_at": "2022-11-24T10:20:19+00:00",
                  "updated_at": "2022-11-24T10:20:19+00:00"          
               }
            ],
            "recipient": {
               "name": "Recipient name",
               "phone": "11988864311",
               "identifier": "11223344B",
            },
            "shipping": {
               "type": "pickup|ship",
               "carrier": {
                  "name": "Some Carrier Name",
                  "id": "12345"
               },
               "option": {
                   "name": "Some Option Name",
                   "code": "some-option-code",
                   "reference": "some-option-ref"
               },
               "merchant_cost": {
                   "value": 123.14,
                   "currency": "BRL"
               },
               "consumer_cost": {
                   "value": 123.14,
                   "currency": "BRL"
               },
               "min_delivery_date": "2022-11-24T10:20:19+00:00" || null,
               "max_delivery_date": "2022-11-25T10:20:19+00:00" || null,
               "pickup_details": {
                   "id": "pickup-option-id",
                   "name": "Some option pickup detail name",
                   "address": {
                      "zipcode": "12910802",
                      "street": "Some Street",
                      "number": "100",
                      "floor": "Some Floor",
                      "locality": "Some Locality",
                      "city": "Some City",
                      "reference": "Some Reference",
                      "between_streets": "Some Between Streets",
                      "province": {
                          "name": "São Paulo",
                          "code": "SP"
                       },
                       "region": {
                          "name": "Sudeste",
                          "code": "SE"
                       },
                       "country": {
                          "name": "Brasil",
                          "code": "BR"
                       }
                   }
               }
            },
            "destination": {
               "zipcode": "12910802",
               "street": "Some Street",
               "number": "100",
               "floor": "Some Floor",
               "locality": "Some Locality",
               "city": "Some City",
               "reference": "Some Reference",
               "between_streets": "Some Between Streets",
               "province": {
                   "name": "São Paulo",
                   "code": "SP"
                },
                "region": {
                   "name": "Sudeste",
                   "code": "SE"
                },
                "country": {
                   "name": "Brasil",
                   "code": "BR"
                }
            },
            "status": "PENDING",
            "tracking_info": {
               "url": null,
               "code": null
            },
            "fulfilled_at": null,
            "created_at": "2022-11-24T10:20:19+00:00",
            "updated_at": "2022-11-24T10:20:19+00:00"
        }]
    }
]

OBTER /pedidos?campos=id,número, 
HTTP/1.1 200 OK

[
  {
    "id": 450789469,
    "number": "101",
    "price_usd": "58.00"
  }
]

OBTER /pedidos/{id 
Receba um único Pedido pelo seu id.

Se você quiser recuperar um carrinho, consulte o recurso Carrinho .

Parâmetro	Explicação
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
agregados	Um valor possível: fulfillment_orders. Habilita um array chamado fulfillmentsque exibe as informações do Pedido de Atendimento.
OBTER /pedidos/ 
HTTP/1.1 200 OK

{
    "id": 871254203,
    "token": "b872a1befbcde5aaf0517ecbcc910f5dc005350e",
    "store_id": "817495",
    "contact_email": "buyer@tiendanube.com",
    "contact_name": "Maria Silva",
    "contact_phone": "+551533276436",
    "contact_identification": "75839566500",
    "billing_name": "Maria",
    "billing_phone": "+551533276436",
    "billing_address": "Rua Doutor Azevedo Sampaio",
    "billing_number": "50",
    "billing_floor": "",
    "billing_locality": "Centro",
    "billing_zipcode": "18010220",
    "billing_city": "Sorocaba",
    "billing_province": "São Paulo",
    "billing_country": "BR",
    "billing_customer_type": "company",
    "billing_business_name": "Nuvem Shop LTDA",
    "billing_trade_name": "Nuvem Shop",
    "billing_state_registration": "388108598269",
    "billing_fiscal_regime": "601",
    "billing_invoice_use": "G01",
    "billing_document_type": "cnpj",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": "871254203",
        "created_at": "2022-11-15T19:37:08+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "6000.00",
    "discount": "600.00",
    "discount_coupon": "0.00",
    "discount_gateway": "600.00",
    "total": "5400.00",
    "total_usd": "40.79",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "ARS",
    "language": "es",
    "gateway": "offline",
    "gateway_id": null,
    "gateway_name": "Transferencia Bancaria",
    "extra": {},
    "storefront": "store",
    "note": "",
    "created_at": "2022-11-15T19:36:59+0000",
    "updated_at": "2022-11-15T19:37:08+0000",
    "completed_at": {
        "date": "2022-11-15 19:36:59.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": "custom",
        "credit_card_company": null,
        "installments": 1
    },
    "same_billing_and_shipping_address": false,
    "attributes": [],
    "customer": {
        "id": 105799009,
        "name": "Maria Silva",
        "email": "buyer@tiendanube.com",
        "identification": "75839566500",
        "phone": "+551533276436",
        "note": null,
        "default_address": {
            "address": "Evergreen Terrace",
            "city": "New York",
            "country": "US",
            "created_at": "2022-11-15T19:36:59+0000",
            "default": true,
            "floor": "Apartment 8",
            "id": 80189931,
            "locality": "Bronx",
            "name": "John Doe",
            "number": "742",
            "phone": "john.doe@example.com",
            "province": "New York",
            "updated_at": "2022-11-15T19:36:59+0000",
            "zipcode": "10451"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "New York",
                "country": "US",
                "created_at": "2022-11-15T19:36:59+0000",
                "default": true,
                "floor": "Apartment 8",
                "id": 80189931,
                "locality": "Bronx",
                "name": "John Doe",
                "number": "742",
                "phone": "john.doe@example.com",
                "province": "New York",
                "updated_at": "2022-11-15T19:36:59+0000",
                "zipcode": "10451"
            }
        ],
        "billing_name": "Maria",
        "billing_phone": "+551533276436",
        "billing_address": "Rua Doutor Azevedo Sampaio",
        "billing_number": "50",
        "billing_floor": "",
        "billing_locality": "Centro",
        "billing_zipcode": "18010220",
        "billing_city": "Sorocaba",
        "billing_province": "São Paulo",
        "billing_country": "BR",
        "extra": {},
        "total_spent": "27.00",
        "total_spent_currency": "USD",
        "last_order_id": 871254203,
        "active": false,
        "first_interaction": "2022-11-15T19:36:59+0000",
        "created_at": "2022-11-15T19:36:59+0000",
        "updated_at": "2022-11-15T19:36:59+0000"
    },
    "products": [
        {
            "id": 1069053829,
            "depth": "0.00",
            "height": "0.00",
            "name": "Mesa de Roble",
            "price": "6000.00",
            "compare_at_price": "37.77",
            "product_id": 111334785,
            "image": {
                "id": 277896749,
                "product_id": 111334785,
                "src": "https://d2r9epyceweg5n.cloudfront.net/stores/817/495/products/pexels-olya-prutskova-89764951-74e3f47763f1aec3ec16448436206687-1024-1024.jpg",
                "position": 1,
                "alt": [],
                "created_at": "2022-02-14T13:00:03+0000",
                "updated_at": "2022-10-28T21:52:37+0000"
            },
            "quantity": "1",
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": "426215948",
            "variant_values": [],
            "properties": [],
            "sku": "12389012348124801234890",
            "barcode": null
        }
    ],
    "number": 306,
    "cancel_reason": null,
    "owner_note": null,
    "cancelled_at": null,
    "closed_at": null,
    "read_at": null,
    "status": "open",
    "payment_status": "pending",
    "gateway_link": null,
    "shipping_address": {
        "address": "Evergreen Terrace",
        "city": "New York",
        "country": "US",
        "created_at": "2022-11-15T19:23:59+0000",
        "default": false,
        "floor": "Apartment 8",
        "id": 0,
        "locality": "Bronx",
        "name": "John Doe",
        "number": "742",
        "phone": "john.doe@example.com",
        "province": "New York",
        "updated_at": "2022-11-15T19:37:08+0000",
        "zipcode": "10451",
        "customs": null
    },
    "shipping_status": "unpacked",
    "fulfillments": [],
    "paid_at": null,
    "client_details": {
        "browser_ip": "181.16.41.4",
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    },
    "app_id": null
}


OBTER /pedidos/{id}/histórico/ 
Receba uma lista de todas as alterações no valor total do Pedido.

As ações que podem alterar o total de um Pedido são a edição ou o reembolso de um Pedido. Cada modificação carrega o status de pagamento associado a ela e, embora possa estar relacionada a um recurso de Transação, não requer um (por exemplo, Pedidos em Rascunho também gerarão esses eventos, mesmo que não tenham uma Transação associada).

Importante : você verá que às vezes nos referimos a essas modificações como "transações". Elas não devem ser confundidas com o recurso Transação do Domínio de Pagamentos, pois dependem de um modelo que não é necessário para a existência de uma Ordem. Embora essas transações internas possam acionar a criação de uma nova Transação e, portanto, tenham uma conexão com ela, elas não a exigem. Por enquanto, não estamos criando recursos de Transação além do recurso inicial que uma Ordem pode ter ao ser criada .

Parâmetro	Explicação
status	O status do pagamento da transação de valor do Pedido. Os valores possíveis são "PENDENTE", "CANCELADO" ou "PAGO". Observe que, se a transação não tiver sido paga e for alterada novamente (por exemplo, se um Pedido com pagamento Pendente for editado), a entrada correspondente será marcada como "CANCELADO", portanto, "PENDENTE" só é possível para o valor mais recente no histórico. Além disso, observe que "PAGO", neste contexto, pode significar que o Cliente ou o Estabelecimento pagou, dependendo se o total_paid_diffresultado for positivo (o Cliente pagou) ou negativo (o Estabelecimento pagou, ou seja, um reembolso parcial ou total).
delta_total	A diferença entre o valor do pedido anterior e o novo.
diferença_total_paga	O valor pago pelo Cliente/Comerciante no estado da transação daquele Pedido. Observe que este valor não tem correlação de 1 para 1 com total_delta, podendo ser maior ou menor dependendo do total de transações anteriores que nunca foram pagas. Este valor só será diferente de zero se statusfor "PAGO".
método_de_gateway	O gateway/método de pagamento utilizado pelo Cliente/Estabelecimento para pagar ou reembolsar a transação. Os valores possíveis são "credit_card", "debit_card", "cash", "wire_transfer", "pix" ou "other".
nome_do_gateway	Quando o valor "outro" é fornecido para gateway_method, este campo inclui um nome personalizado legível para o gateway. Caso contrário, nulo é retornado.
fechado_em	Data e hora em que a transação passou para um estado final (de "PENDENTE" para outro estado).
aconteceu_em	Data e hora em que ocorreu a modificação total do Pedido.
HTTP/1.1 200 OK

[
    {
        "status": "CANCELLED",
        "total_delta": 3750,
        "total_paid_diff": 0,
        "gateway_method": null,
        "gateway_name": null,
        "closed_at": "2025-04-08T18:19:40+00:00",
        "happened_at": "2025-04-08T18:19:15+00:00"
    },
    {
        "status": "PAID",
        "total_delta": 3750,
        "total_paid_diff": 7500,
        "gateway_method": "cash",
        "gateway_name": null,
        "closed_at": "2025-04-08T18:24:15+0000",
        "happened_at": "2025-04-08T18:19:40+00:00"
    }
]

OBTER /pedidos/{id}/histórico/ 
Receba uma lista de todas as edições da Ordem.

Este é um pequeno registro de alterações para as alterações feitas em uma edição. As informações alteradas serão substituídas nos campos dos Pedidos originais.

Parâmetro	Explicação
mudanças no produto	Contém informações sobre as alterações feitas nos produtos da edição.
custos de envio	Contém informações sobre as alterações nos custos de envio derivadas das alterações dos produtos.
informações_de_transação	Contém informações sobre a transação relacionada que a edição gerou no Pedido. Veja aqui a referência ao conteúdo do objeto.
razão	Texto legível detalhando o motivo da edição, normalmente preenchido pelo comerciante.
aconteceu_em	Data e hora em que ocorreu a edição da Ordem.
 de produto
Valor	Descrição
tipo	"ADICIONAR" se o produto foi adicionado, "REMOVIDO" se foi removido do Pedido. Esta é apenas a ação; para a quantidade adicionada ou removida, consulte as propriedades de quantidade.
estoque_modificado	Indica se o estoque foi modificado ou não.
quantidade_anterior	Quantidade de itens de linha antes da edição.
nova_quantidade	Quantidade do item de linha após a edição.
nome_do_produto	O nome do item de linha que foi modificado.
 de envio
Valor	Descrição
número_de_cumprimento	O número da Ordem de Atendimento relacionada ao custo de envio.
custo_do_comerciante_anterior	O custo de envio anterior para o comerciante.
novo_custo_do_comerciante	O novo custo de envio para o comerciante.
custo_do_consumidor_anterior	O custo de envio anterior para o Cliente.
novo_custo_ao_consumidor	O novo custo de envio para o cliente.
HTTP/1.1 200 OK

[
    {
        "product_changes": [
            {
                "type": "ADD",
                "modified_stock": true,
                "previous_quantity": 0,
                "new_quantity": 1,
                "product_name": "Pantalon de cuero (Beige)"
            }
        ],
        "shipping_costs": [
            {
                "fulfillment_number": 1,
                "previous_merchant_cost": 200,
                "new_merchant_cost": 500,
                "previous_consumer_cost": 200,
                "new_consumer_cost": 500
            }
        ],
        "transaction_information": {
            "status": "CANCELLED",
            "total_delta": 3750,
            "total_paid_diff": 0,
            "gateway_method": null,
            "gateway_name": null,
            "closed_at": null,
            "happened_at": "2025-04-08T18:19:15+00:00"
        },
        "reason": null,
        "happened_at": "2025-04-08T18:19:15+00:00"
    },
    {
        "product_changes": [
            {
                "type": "ADD",
                "modified_stock": true,
                "previous_quantity": 1,
                "new_quantity": 2,
                "product_name": "Pantalon de cuero (Beige)"
            }
        ],
        "shipping_costs": [
            {
                "fulfillment_number": 1,
                "previous_merchant_cost": 500,
                "new_merchant_cost": 500,
                "previous_consumer_cost": 500,
                "new_consumer_cost": 500
            }
        ],
        "transaction_information": {
            "status": "PAID",
            "total_delta": 3750,
            "total_paid_diff": 7500,
            "gateway_method": "cash",
            "gateway_name": null,
            "closed_at": "2025-04-08T18:24:15+0000",
            "happened_at": "2025-04-08T18:19:40+00:00"
        },
        "reason": null,
        "happened_at": "2025-04-08T18:19:40+00:00"
    }
]

POST /pedidos 
Criar um pedido.

Parâmetro	Descrição	Obrigatório
moeda	Código da moeda do pedido ( formato ISO 4217 ). O padrão é a moeda da loja.	Não
linguagem	O código do idioma ( formato ISO 639-1 ). O padrão é o idioma principal da loja.	Não
portal	O gateway de pagamento do pedido ( Payment Gateway ). O padrão é not-provided.	Sim
status_de_pagamento	Status de pagamento do pedido ( Status do pagamento ). O padrão é pending.	Não
status	O status do pedido ( Order Status ). O padrão é open.	Não
cumprimento	O status do pedido ( Order Status ). O padrão é unpacked.	Não
produtos	Lista de produtos do pedido ( Produto ).	Sim
total	A soma de todos os preços dos produtos, custos de envio e descontos. Deve ser positivo. Se não for especificado, será calculado considerando os custos e descontos fornecidos.	Não
comportamento_de_inventário	O comportamento de estoque que o pedido deve executar ( Comportamento de Estoque ).	Não
cliente	O objeto cliente ( Cliente ).	Sim
observação	Uma observação adicional do cliente sobre o pedido.	Não
Endereço de Cobrança	Objeto de endereço de cobrança do cliente ( Endereço ).	Sim
Endereço para envio	Objeto de endereço de entrega do cliente ( Endereço ).	Sim
tipo_de_retirada_de_envio	O tipo de retirada do envio ( Tipo de Envio ). O padrão é pickup.	Sim
envio	O método de envio ( Shiping Method ). Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Sim
opção_de_envio	O nome da opção de envio do pedido é bonito. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Sim
número_de_rastreamento_de_envio	O número de rastreamento de envio do pedido	Não
custo_de_envio_cliente	O custo de envio do cliente é o dobro do valor. O valor 0 significa frete grátis. O padrão é 0.	Sim
proprietário_do_custo_de_envio	O custo de envio do proprietário é o dobro do valor.	Não
enviar_email_de_confirmação	Enviar o e-mail de confirmação do pedido ao cliente. O padrão é falso.	Não
enviar_email_de_cumprimento	Enviar o e-mail de atendimento do pedido ao cliente. O padrão é falso.	Não
id_de_localização	ID do local de onde o estoque será reduzido. Deve ser uma sequência de caracteres.	Não
Valor	Descrição	Tipo	Obrigatório
nome	Nome do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
e-mail	Endereço de e-mail do cliente. Os padrões são email@naoinformado.compara pt_BR e email@noinformado.comem todos os outros casos (es_AR, es_MX, es_CO).	E-mail	Sim
telefone	O número de telefone do cliente	Corda	Não
documento	Número do documento do cliente	Corda	Não
Valor	Descrição	Tipo	Obrigatório
primeiro nome	Nome do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
sobrenome	Sobrenome do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
endereço	Rua do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
número	O número do endereço. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
chão	Complemento do endereço. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Não
localidade	A localidade do endereço. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Não
cidade	A cidade do endereço. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
província	A província do endereço. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
CEP	O código postal do endereço. O padrão é 0000.	Corda	Sim
país	País do endereço ( formato ISO 3166-1 ). O padrão é o país da loja.	Corda	Sim
telefone	O número de telefone do endereço.	Corda	Não
Valor	Descrição	Tipo	Obrigatório
primeiro nome	Nome do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
sobrenome	Sobrenome do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
endereço	Rua do cliente. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
número	O número do shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
chão	Complemento shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Não
localidade	A localidade shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Não
cidade	A cidade do shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
província	A província shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Sim
CEP	O código postal do shipping_address. O padrão é 0000.	Corda	Sim
país	O país do shipping_address ( formato ISO 3166-1 ). O padrão é o país da loja.	Corda	Sim
telefone	O número de telefone do shipping_address. Os padrões são Não informadopara pt_BR e No informadoem todos os outros casos (es_AR, es_MX, es_CO).	Corda	Não
alfândega	Os campos alfandegários do endereço de entrega. Este campo pode receber qualquer valor personalizado dentro do objeto. O padrão é nulo.	Objeto	Não
Valor	Descrição	Tipo	Obrigatório
id_variante	ID da variante do produto	Inteiro	Sim
quantidade	A quantidade do produto	Inteiro	Sim
preço	O preço do item. O padrão é o preço da variante do produto do Tiendanube.	Dobro	Não
 do pedido
Valor	Descrição
abrir	O pedido está aberto
fechado	O pedido está fechado
cancelado	O pedido foi cancelado
 do pagamento
Valor	Descrição
pendente	A confirmação do pagamento está pendente
autorizado	O pagamento foi autorizado, mas ainda não foi capturado
pago	O pagamento foi confirmado e capturado com sucesso
anulado	A confirmação do pagamento é anulada
reembolsado	O pagamento foi reembolsado ao cliente
abandonado	A confirmação do pagamento foi abandonada
 de pagamento
Valor	Descrição
desconectado	Gateway de pagamento offline
mercadopago	Mercado Pago
pagseguro	PagSeguro
payu	Payu
não fornecido	O gateway de pagamento não é fornecido
 envio
Valor	Descrição
enviar	Entrega em domicílio
escolher	Retirada em local físico
 de envio
Valor	Descrição
filial	Filiais da loja
correios	Correios Brasileiros
correio-argentino	Correio Argentino
oca-parceiro-ar	OCA
mesa	Personalizado
não fornecido	O método de envio não foi fornecido
 de inventário
Valor	Descrição
ignorar	Não reivindicar inventário (padrão)
alegar	Tentar reivindicar o estoque pode impedir a criação do pedido
 Fiscal de Faturamento
O Regime Fiscal de Faturamento é utilizado somente no es_MX (Régimen fiscal).

Valor	Descrição
601	General de Ley Personas Morales (padrão)
603	Personas Morales com multas não lucrativas
610	Residentes no Estrangeiro sem Estabelecimento Permanente no México
620	Sociedades Cooperativas de Produção que optam por diferir seus rendimentos
622	Atividades Agrícolas, Ganaderas, Silvícolas e Pesqueras
623	Opcional para Grupos de Sociedades
624	Tentar reivindicar o estoque pode impedir a criação do pedido
626	Regime Simplificado de Confiança
 fatura de cobrança
O Uso da Nota Fiscal de Cobrança é utilizado somente no es_MX (Uso de fatura).

Valor	Descrição
G01	General de Ley Personas Morales (padrão)
G02	Devoluções, descontos ou bonificações
G03	Gastos em geral
I01	Construções
I02	Mobiliário e equipamento de escritório por inversão
I03	Equipamento de transporte
I04	Equipamento de computação e acessórios
I05	Dados, troqueles, moldes, matrizes e ferramentas
I06	Comunicações telefônicas
I07	Comunicações via satélite
I08	Outra maquinaria e equipamento
S01	Sem efeitos fiscais
CP01	Pagos
POST /pedidos 
HTTP/1.1 201 Created

{
    "id": 871310835,
    "token": "d928449fdd060fb7f3854c681923c28cfbccbcc1",
    "store_id": 817495,
    "contact_email": "john.doe@example.com",
    "contact_name": "John Doe",
    "contact_phone": "+55 11 99999-9999",
    "contact_identification": null,
    "billing_name": "John",
    "billing_phone": "51230413",
    "billing_address": "Evergreen Terrace",
    "billing_number": "742",
    "billing_floor": "Apartment 8",
    "billing_locality": "Bronx",
    "billing_zipcode": "10451",
    "billing_city": "New York",
    "billing_province": "New York",
    "billing_country": "US",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": 871310835,
        "created_at": "2022-11-15T19:47:32+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "80.00",
    "discount": "0.00",
    "discount_coupon": "0.00",
    "discount_gateway": "0.00",
    "total": "80.00",
    "total_usd": "80.00",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "USD",
    "language": "es",
    "gateway": "not-provided",
    "gateway_id": null,
    "gateway_name": "",
    "extra": {},
    "storefront": "api",
    "note": null,
    "created_at": "2022-11-15T19:47:32+0000",
    "updated_at": "2022-11-15T19:47:32+0000",
    "completed_at": {
        "date": "2022-11-15 19:47:32.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": null,
        "credit_card_company": null,
        "installments": 1
    },
    "attributes": [],
    "customer": {
        "id": 44769493,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "identification": null,
        "phone": "+55 11 99999-9999",
        "note": null,
        "default_address": {
            "address": "No informado",
            "city": "No informado",
            "country": "AR",
            "created_at": "2021-09-24T14:02:57+0000",
            "default": true,
            "floor": "No informado",
            "id": 52781637,
            "locality": "No informado",
            "name": "No informado No informado",
            "number": "No informado",
            "phone": "No informado",
            "province": "No informado",
            "updated_at": "2021-09-24T14:02:57+0000",
            "zipcode": "0000"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": null,
                "created_at": "2020-09-11T18:06:09+0000",
                "default": false,
                "floor": "",
                "id": 28900058,
                "locality": "",
                "name": "John Doe",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2020-09-11T18:06:09+0000",
                "zipcode": "97475"
            },
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-15T18:55:48+0000",
                "default": false,
                "floor": null,
                "id": 52249003,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-15T18:55:48+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-24T14:01:01+0000",
                "default": false,
                "floor": null,
                "id": 52781492,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-24T14:01:01+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "No informado",
                "country": "AR",
                "created_at": "2021-09-24T14:02:57+0000",
                "default": true,
                "floor": "No informado",
                "id": 52781637,
                "locality": "No informado",
                "name": "No informado No informado",
                "number": "No informado",
                "phone": "No informado",
                "province": "No informado",
                "updated_at": "2021-09-24T14:02:57+0000",
                "zipcode": "0000"
            },
            {
                "address": "Fake Street",
                "city": "Rosario",
                "country": "AR",
                "created_at": "2021-09-27T15:39:31+0000",
                "default": false,
                "floor": "",
                "id": 52933588,
                "locality": "",
                "name": "John Doe",
                "number": "123",
                "phone": "+55 11 99999-9999",
                "province": "Santa Fe",
                "updated_at": "2021-09-27T15:39:31+0000",
                "zipcode": "2000"
            },
            {
                "address": null,
                "city": null,
                "country": "AR",
                "created_at": "2021-09-27T15:43:15+0000",
                "default": false,
                "floor": null,
                "id": 52933858,
                "locality": null,
                "name": "John Doe",
                "number": null,
                "phone": "+55 11 99999-9999",
                "province": null,
                "updated_at": "2021-09-27T15:43:15+0000",
                "zipcode": null
            }
        ],
        "billing_name": "John",
        "billing_phone": "51230413",
        "billing_address": "Evergreen Terrace",
        "billing_number": "742",
        "billing_floor": "Apartment 8",
        "billing_locality": "Bronx",
        "billing_zipcode": "10451",
        "billing_city": "New York",
        "billing_province": "New York",
        "billing_country": "US",
        "extra": {},
        "total_spent": "187.50",
        "total_spent_currency": "USD",
        "last_order_id": 871310835,
        "active": false,
        "first_interaction": "2022-11-15T19:47:32+0000",
        "created_at": "2020-09-11T18:06:09+0000",
        "updated_at": "2022-11-15T19:47:32+0000"
    },
    "products": [
        {
            "id": 1069079649,
            "depth": "0.00",
            "height": "0.00",
            "name": "Producto B",
            "price": "40.00",
            "compare_at_price": "40.00",
            "product_id": 63021345,
            "image": {
                "id": 0,
                "product_id": 0,
                "src": "https://d2r9epyceweg5n.cloudfront.net/assets/stores/img/no-photo-1024-1024.png",
                "position": 0,
                "alt": [],
                "created_at": "2022-11-15T19:47:33+0000",
                "updated_at": "2022-11-15T19:47:33+0000"
            },
            "quantity": 2,
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": 194113141,
            "variant_values": [],
            "properties": [],
            "sku": null,
            "barcode": null
        }
    ],
    "number": 307,
    "cancel_reason": null,
    "owner_note": null,
    "cancelled_at": null,
    "closed_at": null,
    "read_at": null,
    "status": "open",
    "payment_status": "pending",
    "gateway_link": null,
    "shipping_address": {
        "address": "No informado",
        "city": "No informado",
        "country": "AR",
        "created_at": "2022-11-15T19:47:32+0000",
        "default": false,
        "floor": "No informado",
        "id": 0,
        "locality": "No informado",
        "name": "No informado No informado",
        "number": "No informado",
        "phone": "No informado",
        "province": "No informado",
        "updated_at": "2022-11-15T19:47:32+0000",
        "zipcode": "0000",
        "customs": null
    },
    "shipping_status": "unpacked",
    "paid_at": null,
    "client_details": {
        "browser_ip": null,
        "user_agent": null
    },
    "app_id": 2181
}


COLOQUE /pedidos/{id 
Alterar os atributos de um pedido (só owner_notepor enquanto) e/ou atualizar o status de um pedido

COLOQUE /pedidos/ 
{
  "owner_note": "Need to gift wrap this order",
  "status": "closed"
}

HTTP/1.1 200 OK

{
    "id": 871310835,
    "token": "d928449fdd060fb7f3854c681923c28cfbccbcc1",
    "store_id": 817495,
    "contact_email": "john.doe@example.com",
    "contact_name": "John Doe",
    "contact_phone": "+55 11 99999-9999",
    "contact_identification": null,
    "billing_name": "John",
    "billing_phone": "51230413",
    "billing_address": "Evergreen Terrace",
    "billing_number": "742",
    "billing_floor": "Apartment 8",
    "billing_locality": "Bronx",
    "billing_zipcode": "10451",
    "billing_city": "New York",
    "billing_province": "New York",
    "billing_country": "US",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": 871310835,
        "created_at": "2022-11-15T19:49:48+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "80.00",
    "discount": "0.00",
    "discount_coupon": "0.00",
    "discount_gateway": "0.00",
    "total": "80.00",
    "total_usd": "80.00",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "USD",
    "language": "es",
    "gateway": "not-provided",
    "gateway_id": null,
    "gateway_name": "",
    "shipping_pickup_type": "pickup",
    "extra": {},
    "storefront": "api",
    "note": null,
    "created_at": "2022-11-15T19:47:32+0000",
    "updated_at": "2022-11-15T19:49:48+0000",
    "completed_at": {
        "date": "2022-11-15 19:47:32.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": null,
        "credit_card_company": null,
        "installments": 1
    },
    "attributes": [],
    "customer": {
        "id": 44769493,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "identification": null,
        "phone": "+55 11 99999-9999",
        "note": null,
        "default_address": {
            "address": "No informado",
            "city": "No informado",
            "country": "AR",
            "created_at": "2021-09-24T14:02:57+0000",
            "default": true,
            "floor": "No informado",
            "id": 52781637,
            "locality": "No informado",
            "name": "No informado No informado",
            "number": "No informado",
            "phone": "No informado",
            "province": "No informado",
            "updated_at": "2021-09-24T14:02:57+0000",
            "zipcode": "0000"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": null,
                "created_at": "2020-09-11T18:06:09+0000",
                "default": false,
                "floor": "",
                "id": 28900058,
                "locality": "",
                "name": "John Doe",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2020-09-11T18:06:09+0000",
                "zipcode": "97475"
            },
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-15T18:55:48+0000",
                "default": false,
                "floor": null,
                "id": 52249003,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-15T18:55:48+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-24T14:01:01+0000",
                "default": false,
                "floor": null,
                "id": 52781492,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-24T14:01:01+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "No informado",
                "country": "AR",
                "created_at": "2021-09-24T14:02:57+0000",
                "default": true,
                "floor": "No informado",
                "id": 52781637,
                "locality": "No informado",
                "name": "No informado No informado",
                "number": "No informado",
                "phone": "No informado",
                "province": "No informado",
                "updated_at": "2021-09-24T14:02:57+0000",
                "zipcode": "0000"
            },
            {
                "address": "Fake Street",
                "city": "Rosario",
                "country": "AR",
                "created_at": "2021-09-27T15:39:31+0000",
                "default": false,
                "floor": "",
                "id": 52933588,
                "locality": "",
                "name": "John Doe",
                "number": "123",
                "phone": "+55 11 99999-9999",
                "province": "Santa Fe",
                "updated_at": "2021-09-27T15:39:31+0000",
                "zipcode": "2000"
            },
            {
                "address": null,
                "city": null,
                "country": "AR",
                "created_at": "2021-09-27T15:43:15+0000",
                "default": false,
                "floor": null,
                "id": 52933858,
                "locality": null,
                "name": "John Doe",
                "number": null,
                "phone": "+55 11 99999-9999",
                "province": null,
                "updated_at": "2021-09-27T15:43:15+0000",
                "zipcode": null
            }
        ],
        "billing_name": "John",
        "billing_phone": "51230413",
        "billing_address": "Evergreen Terrace",
        "billing_number": "742",
        "billing_floor": "Apartment 8",
        "billing_locality": "Bronx",
        "billing_zipcode": "10451",
        "billing_city": "New York",
        "billing_province": "New York",
        "billing_country": "US",
        "extra": {},
        "total_spent": "187.50",
        "total_spent_currency": "USD",
        "last_order_id": 871310835,
        "active": false,
        "first_interaction": "2022-11-15T19:47:32+0000",
        "created_at": "2020-09-11T18:06:09+0000",
        "updated_at": "2022-11-15T19:47:32+0000"
    },
    "products": [
        {
            "id": 1069079649,
            "depth": "0.00",
            "height": "0.00",
            "name": "Producto B",
            "price": "40.00",
            "compare_at_price": "40.00",
            "product_id": 63021345,
            "image": {
                "id": 0,
                "product_id": 0,
                "src": "https://d2r9epyceweg5n.cloudfront.net/assets/stores/img/no-photo-1024-1024.png",
                "position": 0,
                "alt": [],
                "created_at": "2022-11-15T19:49:48+0000",
                "updated_at": "2022-11-15T19:49:48+0000"
            },
            "quantity": 2,
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": 194113141,
            "variant_values": [],
            "properties": [],
            "sku": null,
            "barcode": null
        }
    ],
    "number": 307,
    "cancel_reason": null,
    "owner_note": "Need to gift wrap this order",
    "cancelled_at": null,
    "closed_at": "2022-11-15T19:49:48+0000",
    "read_at": null,
    "status": "closed",
    "payment_status": "paid",
    "gateway_link": null,
    "shipping_address": {
        "address": "No informado",
        "city": "No informado",
        "country": "AR",
        "created_at": "2022-11-15T19:47:32+0000",
        "default": false,
        "floor": "No informado",
        "id": 0,
        "locality": "No informado",
        "name": "No informado No informado",
        "number": "No informado",
        "phone": "No informado",
        "province": "No informado",
        "updated_at": "2022-11-15T19:49:48+0000",
        "zipcode": "0000",
        "customs": null
    },
    "shipping_status": "unpacked",
    "paid_at": "2022-11-15T19:48:39+0000",
    "client_details": {
        "browser_ip": null,
        "user_agent": null
    },
    "app_id": 2181
}


Pagar um 
Na verdade, não há nenhuma ação para pagar um pedido. Os pedidos são pagos ao enviar uma Transação com status de sucesso, independentemente do evento (venda ou captura).

Após o pagamento, dois atributos do pedido são modificados: o atributo payment_statusrecebe "pago" e o atributo paid_atrecebe a hora exata em que o pagamento foi processado.

{
  "payment_status": "paid",
  "paid_at": "2022-11-07T12:17:22+0000"
}

POST /pedidos/{id}/ 
Fechar um pedido

POSTAR /pedidos/871310835/ 
HTTP/1.1 200 OK

{
    "id": 871310835,
    "token": "d928449fdd060fb7f3854c681923c28cfbccbcc1",
    "store_id": 817495,
    "contact_email": "john.doe@example.com",
    "contact_name": "John Doe",
    "contact_phone": "+55 11 99999-9999",
    "contact_identification": null,
    "billing_name": "John",
    "billing_phone": "51230413",
    "billing_address": "Evergreen Terrace",
    "billing_number": "742",
    "billing_floor": "Apartment 8",
    "billing_locality": "Bronx",
    "billing_zipcode": "10451",
    "billing_city": "New York",
    "billing_province": "New York",
    "billing_country": "US",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": 871310835,
        "created_at": "2022-11-15T19:51:59+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "80.00",
    "discount": "0.00",
    "discount_coupon": "0.00",
    "discount_gateway": "0.00",
    "total": "80.00",
    "total_usd": "80.00",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "USD",
    "language": "es",
    "gateway": "not-provided",
    "gateway_id": null,
    "gateway_name": "",
    "extra": {},
    "storefront": "api",
    "note": null,
    "created_at": "2022-11-15T19:47:32+0000",
    "updated_at": "2022-11-15T19:51:59+0000",
    "completed_at": {
        "date": "2022-11-15 19:47:32.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": null,
        "credit_card_company": null,
        "installments": 1
    },
    "attributes": [],
    "customer": {
        "id": 44769493,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "identification": null,
        "phone": "+55 11 99999-9999",
        "note": null,
        "default_address": {
            "address": "No informado",
            "city": "No informado",
            "country": "AR",
            "created_at": "2021-09-24T14:02:57+0000",
            "default": true,
            "floor": "No informado",
            "id": 52781637,
            "locality": "No informado",
            "name": "No informado No informado",
            "number": "No informado",
            "phone": "No informado",
            "province": "No informado",
            "updated_at": "2021-09-24T14:02:57+0000",
            "zipcode": "0000"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": null,
                "created_at": "2020-09-11T18:06:09+0000",
                "default": false,
                "floor": "",
                "id": 28900058,
                "locality": "",
                "name": "John Doe",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2020-09-11T18:06:09+0000",
                "zipcode": "97475"
            },
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-15T18:55:48+0000",
                "default": false,
                "floor": null,
                "id": 52249003,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-15T18:55:48+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-24T14:01:01+0000",
                "default": false,
                "floor": null,
                "id": 52781492,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-24T14:01:01+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "No informado",
                "country": "AR",
                "created_at": "2021-09-24T14:02:57+0000",
                "default": true,
                "floor": "No informado",
                "id": 52781637,
                "locality": "No informado",
                "name": "No informado No informado",
                "number": "No informado",
                "phone": "No informado",
                "province": "No informado",
                "updated_at": "2021-09-24T14:02:57+0000",
                "zipcode": "0000"
            },
            {
                "address": "Fake Street",
                "city": "Rosario",
                "country": "AR",
                "created_at": "2021-09-27T15:39:31+0000",
                "default": false,
                "floor": "",
                "id": 52933588,
                "locality": "",
                "name": "John Doe",
                "number": "123",
                "phone": "+55 11 99999-9999",
                "province": "Santa Fe",
                "updated_at": "2021-09-27T15:39:31+0000",
                "zipcode": "2000"
            },
            {
                "address": null,
                "city": null,
                "country": "AR",
                "created_at": "2021-09-27T15:43:15+0000",
                "default": false,
                "floor": null,
                "id": 52933858,
                "locality": null,
                "name": "John Doe",
                "number": null,
                "phone": "+55 11 99999-9999",
                "province": null,
                "updated_at": "2021-09-27T15:43:15+0000",
                "zipcode": null
            }
        ],
        "billing_name": "John",
        "billing_phone": "51230413",
        "billing_address": "Evergreen Terrace",
        "billing_number": "742",
        "billing_floor": "Apartment 8",
        "billing_locality": "Bronx",
        "billing_zipcode": "10451",
        "billing_city": "New York",
        "billing_province": "New York",
        "billing_country": "US",
        "extra": {},
        "total_spent": "187.50",
        "total_spent_currency": "USD",
        "last_order_id": 871310835,
        "active": false,
        "first_interaction": "2022-11-15T19:47:32+0000",
        "created_at": "2020-09-11T18:06:09+0000",
        "updated_at": "2022-11-15T19:47:32+0000"
    },
    "products": [
        {
            "id": 1069079649,
            "depth": "0.00",
            "height": "0.00",
            "name": "Producto B",
            "price": "40.00",
            "compare_at_price": "40.00",
            "product_id": 63021345,
            "image": {
                "id": 0,
                "product_id": 0,
                "src": "https://d2r9epyceweg5n.cloudfront.net/assets/stores/img/no-photo-1024-1024.png",
                "position": 0,
                "alt": [],
                "created_at": "2022-11-15T19:51:59+0000",
                "updated_at": "2022-11-15T19:51:59+0000"
            },
            "quantity": 2,
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": 194113141,
            "variant_values": [],
            "properties": [],
            "sku": null,
            "barcode": null
        }
    ],
    "number": 307,
    "cancel_reason": null,
    "owner_note": "Need to gift wrap this order",
    "cancelled_at": null,
    "closed_at": "2022-11-15T19:51:59+0000",
    "read_at": null,
    "status": "closed",
    "payment_status": "paid",
    "gateway_link": null,
    "shipping_address": {
        "address": "No informado",
        "city": "No informado",
        "country": "AR",
        "created_at": "2022-11-15T19:47:32+0000",
        "default": false,
        "floor": "No informado",
        "id": 0,
        "locality": "No informado",
        "name": "No informado No informado",
        "number": "No informado",
        "phone": "No informado",
        "province": "No informado",
        "updated_at": "2022-11-15T19:51:59+0000",
        "zipcode": "0000",
        "customs": null
    },
    "shipping_status": "unpacked",
    "paid_at": "2022-11-15T19:48:39+0000",
    "client_details": {
        "browser_ip": null,
        "user_agent": null
    },
    "app_id": 2181
}


POST /pedidos/{id}/ 
Reabrir uma ordem fechada

POSTAR /pedidos/871310835/ 
HTTP/1.1 200 OK

{
    "id": 871310835,
    "token": "d928449fdd060fb7f3854c681923c28cfbccbcc1",
    "store_id": 817495,
    "contact_email": "john.doe@example.com",
    "contact_name": "John Doe",
    "contact_phone": "+55 11 99999-9999",
    "contact_identification": null,
    "billing_name": "John",
    "billing_phone": "51230413",
    "billing_address": "Evergreen Terrace",
    "billing_number": "742",
    "billing_floor": "Apartment 8",
    "billing_locality": "Bronx",
    "billing_zipcode": "10451",
    "billing_city": "New York",
    "billing_province": "New York",
    "billing_country": "US",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": 871310835,
        "created_at": "2022-11-15T19:52:37+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "80.00",
    "discount": "0.00",
    "discount_coupon": "0.00",
    "discount_gateway": "0.00",
    "total": "80.00",
    "total_usd": "80.00",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "USD",
    "language": "es",
    "gateway": "not-provided",
    "gateway_id": null,
    "gateway_name": "",
    "extra": {},
    "storefront": "api",
    "note": null,
    "created_at": "2022-11-15T19:47:32+0000",
    "updated_at": "2022-11-15T19:52:37+0000",
    "completed_at": {
        "date": "2022-11-15 19:47:32.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": null,
        "credit_card_company": null,
        "installments": 1
    },
    "attributes": [],
    "customer": {
        "id": 44769493,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "identification": null,
        "phone": "+55 11 99999-9999",
        "note": null,
        "default_address": {
            "address": "No informado",
            "city": "No informado",
            "country": "AR",
            "created_at": "2021-09-24T14:02:57+0000",
            "default": true,
            "floor": "No informado",
            "id": 52781637,
            "locality": "No informado",
            "name": "No informado No informado",
            "number": "No informado",
            "phone": "No informado",
            "province": "No informado",
            "updated_at": "2021-09-24T14:02:57+0000",
            "zipcode": "0000"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": null,
                "created_at": "2020-09-11T18:06:09+0000",
                "default": false,
                "floor": "",
                "id": 28900058,
                "locality": "",
                "name": "John Doe",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2020-09-11T18:06:09+0000",
                "zipcode": "97475"
            },
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-15T18:55:48+0000",
                "default": false,
                "floor": null,
                "id": 52249003,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-15T18:55:48+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-24T14:01:01+0000",
                "default": false,
                "floor": null,
                "id": 52781492,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-24T14:01:01+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "No informado",
                "country": "AR",
                "created_at": "2021-09-24T14:02:57+0000",
                "default": true,
                "floor": "No informado",
                "id": 52781637,
                "locality": "No informado",
                "name": "No informado No informado",
                "number": "No informado",
                "phone": "No informado",
                "province": "No informado",
                "updated_at": "2021-09-24T14:02:57+0000",
                "zipcode": "0000"
            },
            {
                "address": "Fake Street",
                "city": "Rosario",
                "country": "AR",
                "created_at": "2021-09-27T15:39:31+0000",
                "default": false,
                "floor": "",
                "id": 52933588,
                "locality": "",
                "name": "John Doe",
                "number": "123",
                "phone": "+55 11 99999-9999",
                "province": "Santa Fe",
                "updated_at": "2021-09-27T15:39:31+0000",
                "zipcode": "2000"
            },
            {
                "address": null,
                "city": null,
                "country": "AR",
                "created_at": "2021-09-27T15:43:15+0000",
                "default": false,
                "floor": null,
                "id": 52933858,
                "locality": null,
                "name": "John Doe",
                "number": null,
                "phone": "+55 11 99999-9999",
                "province": null,
                "updated_at": "2021-09-27T15:43:15+0000",
                "zipcode": null
            }
        ],
        "billing_name": "John",
        "billing_phone": "51230413",
        "billing_address": "Evergreen Terrace",
        "billing_number": "742",
        "billing_floor": "Apartment 8",
        "billing_locality": "Bronx",
        "billing_zipcode": "10451",
        "billing_city": "New York",
        "billing_province": "New York",
        "billing_country": "US",
        "extra": {},
        "total_spent": "187.50",
        "total_spent_currency": "USD",
        "last_order_id": 871310835,
        "active": false,
        "first_interaction": "2022-11-15T19:47:32+0000",
        "created_at": "2020-09-11T18:06:09+0000",
        "updated_at": "2022-11-15T19:47:32+0000"
    },
    "products": [
        {
            "id": 1069079649,
            "depth": "0.00",
            "height": "0.00",
            "name": "Producto B",
            "price": "40.00",
            "compare_at_price": "40.00",
            "product_id": 63021345,
            "image": {
                "id": 0,
                "product_id": 0,
                "src": "https://d2r9epyceweg5n.cloudfront.net/assets/stores/img/no-photo-1024-1024.png",
                "position": 0,
                "alt": [],
                "created_at": "2022-11-15T19:52:37+0000",
                "updated_at": "2022-11-15T19:52:37+0000"
            },
            "quantity": 2,
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": 194113141,
            "variant_values": [],
            "properties": [],
            "sku": null,
            "barcode": null
        }
    ],
    "number": 307,
    "cancel_reason": null,
    "owner_note": "Need to gift wrap this order",
    "cancelled_at": null,
    "closed_at": null,
    "read_at": null,
    "status": "open",
    "payment_status": "paid",
    "gateway_link": null,
    "shipping_address": {
        "address": "No informado",
        "city": "No informado",
        "country": "AR",
        "created_at": "2022-11-15T19:47:32+0000",
        "default": false,
        "floor": "No informado",
        "id": 0,
        "locality": "No informado",
        "name": "No informado No informado",
        "number": "No informado",
        "phone": "No informado",
        "province": "No informado",
        "updated_at": "2022-11-15T19:52:37+0000",
        "zipcode": "0000",
        "customs": null
    },
    "shipping_status": "unpacked",
    "paid_at": "2022-11-15T19:48:39+0000",
    "client_details": {
        "browser_ip": null,
        "user_agent": null
    },
    "app_id": 2181
}


POST /pedidos/{id}/ 
Cancelar um pedido

Parâmetro	Explicação
razão	O motivo do cancelamento do pedido. Os valores possíveis são "cliente", "estoque", "fraude" ou "outro".
e-mail	Notificar o cliente sobre o cancelamento (o valor padrão é verdadeiro)
reabastecer	Reabastecer os produtos da loja (o valor padrão é verdadeiro)
POSTAR /pedidos/871310835/ 
HTTP/1.1 200 OK

{
    "id": 871310835,
    "token": "d928449fdd060fb7f3854c681923c28cfbccbcc1",
    "store_id": 817495,
    "contact_email": "john.doe@example.com",
    "contact_name": "John Doe",
    "contact_phone": "+55 11 99999-9999",
    "contact_identification": null,
    "billing_name": "John",
    "billing_phone": "51230413",
    "billing_address": "Evergreen Terrace",
    "billing_number": "742",
    "billing_floor": "Apartment 8",
    "billing_locality": "Bronx",
    "billing_zipcode": "10451",
    "billing_city": "New York",
    "billing_province": "New York",
    "billing_country": "US",
    "coupon": [],
    "promotional_discount": {
        "id": null,
        "store_id": 817495,
        "order_id": 871310835,
        "created_at": "2022-11-15T19:52:37+0000",
        "total_discount_amount": "0.00",
        "contents": [],
        "promotions_applied": []
    },
    "subtotal": "80.00",
    "discount": "0.00",
    "discount_coupon": "0.00",
    "discount_gateway": "0.00",
    "total": "80.00",
    "total_usd": "80.00",
    "checkout_enabled": true,
    "weight": "0.000",
    "currency": "USD",
    "language": "es",
    "gateway": "not-provided",
    "gateway_id": null,
    "gateway_name": "",
    "extra": {},
    "storefront": "api",
    "note": null,
    "created_at": "2022-11-15T19:47:32+0000",
    "updated_at": "2022-11-15T19:52:37+0000",
    "completed_at": {
        "date": "2022-11-15 19:47:32.000000",
        "timezone_type": 3,
        "timezone": "UTC"
    },
    "payment_details": {
        "method": null,
        "credit_card_company": null,
        "installments": 1
    },
    "attributes": [],
    "customer": {
        "id": 44769493,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "identification": null,
        "phone": "+55 11 99999-9999",
        "note": null,
        "default_address": {
            "address": "No informado",
            "city": "No informado",
            "country": "AR",
            "created_at": "2021-09-24T14:02:57+0000",
            "default": true,
            "floor": "No informado",
            "id": 52781637,
            "locality": "No informado",
            "name": "No informado No informado",
            "number": "No informado",
            "phone": "No informado",
            "province": "No informado",
            "updated_at": "2021-09-24T14:02:57+0000",
            "zipcode": "0000"
        },
        "addresses": [
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": null,
                "created_at": "2020-09-11T18:06:09+0000",
                "default": false,
                "floor": "",
                "id": 28900058,
                "locality": "",
                "name": "John Doe",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2020-09-11T18:06:09+0000",
                "zipcode": "97475"
            },
            {
                "address": "Evergreen Terrace",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-15T18:55:48+0000",
                "default": false,
                "floor": null,
                "id": 52249003,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-15T18:55:48+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "Springfield",
                "country": "US",
                "created_at": "2021-09-24T14:01:01+0000",
                "default": false,
                "floor": null,
                "id": 52781492,
                "locality": null,
                "name": "No informado No informado",
                "number": "742",
                "phone": "5551230413",
                "province": "Oregon",
                "updated_at": "2021-09-24T14:01:01+0000",
                "zipcode": "97475"
            },
            {
                "address": "No informado",
                "city": "No informado",
                "country": "AR",
                "created_at": "2021-09-24T14:02:57+0000",
                "default": true,
                "floor": "No informado",
                "id": 52781637,
                "locality": "No informado",
                "name": "No informado No informado",
                "number": "No informado",
                "phone": "No informado",
                "province": "No informado",
                "updated_at": "2021-09-24T14:02:57+0000",
                "zipcode": "0000"
            },
            {
                "address": "Fake Street",
                "city": "Rosario",
                "country": "AR",
                "created_at": "2021-09-27T15:39:31+0000",
                "default": false,
                "floor": "",
                "id": 52933588,
                "locality": "",
                "name": "John Doe",
                "number": "123",
                "phone": "+55 11 99999-9999",
                "province": "Santa Fe",
                "updated_at": "2021-09-27T15:39:31+0000",
                "zipcode": "2000"
            },
            {
                "address": null,
                "city": null,
                "country": "AR",
                "created_at": "2021-09-27T15:43:15+0000",
                "default": false,
                "floor": null,
                "id": 52933858,
                "locality": null,
                "name": "John Doe",
                "number": null,
                "phone": "+55 11 99999-9999",
                "province": null,
                "updated_at": "2021-09-27T15:43:15+0000",
                "zipcode": null
            }
        ],
        "billing_name": "John",
        "billing_phone": "51230413",
        "billing_address": "Evergreen Terrace",
        "billing_number": "742",
        "billing_floor": "Apartment 8",
        "billing_locality": "Bronx",
        "billing_zipcode": "10451",
        "billing_city": "New York",
        "billing_province": "New York",
        "billing_country": "US",
        "extra": {},
        "total_spent": "187.50",
        "total_spent_currency": "USD",
        "last_order_id": 871310835,
        "active": false,
        "first_interaction": "2022-11-15T19:47:32+0000",
        "created_at": "2020-09-11T18:06:09+0000",
        "updated_at": "2022-11-15T19:47:32+0000"
    },
    "products": [
        {
            "id": 1069079649,
            "depth": "0.00",
            "height": "0.00",
            "name": "Producto B",
            "price": "40.00",
            "compare_at_price": "40.00",
            "product_id": 63021345,
            "image": {
                "id": 0,
                "product_id": 0,
                "src": "https://d2r9epyceweg5n.cloudfront.net/assets/stores/img/no-photo-1024-1024.png",
                "position": 0,
                "alt": [],
                "created_at": "2022-11-15T19:52:37+0000",
                "updated_at": "2022-11-15T19:52:37+0000"
            },
            "quantity": 2,
            "free_shipping": false,
            "weight": "0.00",
            "width": "0.00",
            "variant_id": 194113141,
            "variant_values": [],
            "properties": [],
            "sku": null,
            "barcode": null
        }
    ],
    "number": 307,
    "cancel_reason": "other",
    "owner_note": "Need to gift wrap this order",
    "cancelled_at": "2022-11-15T19:57:42+0000",
    "closed_at": null,
    "read_at": null,
    "status": "cancelled",
    "payment_status": "paid",
    "gateway_link": null,
    "shipping_address": {
        "address": "No informado",
        "city": "No informado",
        "country": "AR",
        "created_at": "2022-11-15T19:47:32+0000",
        "default": false,
        "floor": "No informado",
        "id": 0,
        "locality": "No informado",
        "name": "No informado No informado",
        "number": "No informado",
        "phone": "No informado",
        "province": "No informado",
        "updated_at": "2022-11-15T19:52:37+0000",
        "zipcode": "0000",
        "customs": null
    },
    "shipping_status": "unpacked",
    "paid_at": "2022-11-15T19:48:39+0000",
    "client_details": {
        "browser_ip": null,
        "user_agent": null
    },
    "app_id": 2181
}


Notas Fiscais (ex. NFe no Brasil 
Atualmente, não oferecemos uma InvoiceAPI, mas existem muitos aplicativos que precisam ler e/ou gravar informações de faturas. A maneira de fazer isso é usando Metafields.

A vantagem de usar Metafieldsé que um determinado aplicativo pode gerar a nota fiscal e outro aplicativo pode lê-la. Vejamos um exemplo real brasileiro: um ERP pode gerar a nota fiscal (NFe) e uma transportadora pode usar essa NFe para processar uma remessa.

Criar uma 
Um Pedido pode ter mais de uma fatura, portanto, teremos um Metacampo que contém uma lista de faturas. É responsabilidade dos produtores de faturas garantir que esse formato seja mantido quando novas faturas forem adicionadas.

Ao adicionar uma nova fatura, você deve anexá-la à lista de NFEs, adicionando a NFE key(gerada na criação) e o linkXML da NFE, além de uma fulfillment_order_idespecificação opcional Fulfillment Orderà qual a NFE se aplica. O valuedos metacampos contém uma representação em string codificada em JSON da lista de NFEs; a lista é uma matriz de objetos que possuem keyas linkpropriedades e . O valor de owner_iddeve conter o OrderID.

Exemplo : digamos que queremos adicionar uma nova NFe com chave 55555555555555555555555555555e link http://nfe.com.br/nsaasbatribuídos à Ordem de Atendimento com ID 01FHZXHK8PTP9FVK99Z66GXASS.

Para garantir que outros aplicativos possam ler a fatura que você criou, use este exemplo como está.

Primeiro temos que verificar se o metacampo NFe já existe.

GET /metafields/orders?per_page=1&owner_id=ORDER_ID&namespace=nfe&key=list&fields=id,value

Isso retornará uma matriz vazia se o metacampo NFe não existir.

HTTP/1.1 200 OK

[]

ou um array com um objeto com o id e o valor caso ele exista.

HTTP/1.1 200 OK

[
    {
      "id": 12345,
      "value": "[{\"key\": \"44444444444444444444444444444\", \"link\": \"http://nfe.com.br/nsaasa\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}]",
    }
]


Se o metacampo da lista NFe não 
Precisamos criar um novo metacampo. Observe que valuese trata de uma string codificada em JSON, portanto, para que seja um JSON válido, todas as aspas duplas devem ser escapadas.

POST /metafields

{
  "namespace": "nfe",
  "key": "list",
  "value": "[{\"key\": \"55555555555555555555555555555\", \"link\": \"http://nfe.com.br/nsaasb\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}]",
  "description": "Lista de NFes",
  "owner_resource": "Order",
  "owner_id": 12345678
}


HTTP/1.1 201 Created

{
  "id": 12345,
  "namespace": "nfe",
  "key": "link",
  "value": "[{\"key\": \"55555555555555555555555555555\", link: \"http://nfe.com.br/nsaasb\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}]",
  "description": "Lista de NFes",
  "owner_resource": "Order",
  "owner_id": 12345678,
  "created_at": "2015-01-02 20:27:51",
  "updated_at": "2015-01-02 20:27:51",
  "deleted_at": null
}


Se o metacampo da lista NFe já 
Agora temos que anexar nosso NFe ao array existente e atualizar o metacampo usando o metacampo id.

PUT /metafields/METAFIELD_ID

{
  "value": "[{\"key\": \"44444444444444444444444444444\", \"link\": \"http://nfe.com.br/nsaasa\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}, {\"key\": \"55555555555555555555555555555\", \"link\": \"http://nfe.com.br/nsaasb\", \"fulfillment_order_id\": \"01ARZ3NDEKTSV4RRFFQ69G5FAV\"}]"
}


HTTP/1.1 200 OK

{
  "id": 12345,
  "namespace": "nfe",
  "key": "list",
  "value": "[{\"key\": \"44444444444444444444444444444\", \"link\": \"http://nfe.com.br/nsaasa\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}, {\"key\": \"55555555555555555555555555555\", \"link\": \"http://nfe.com.br/nsaasb\", \"fulfillment_order_id\": \"01ARZ3NDEKTSV4RRFFQ69G5FAV\"}]",
  "description": "Lista de NFes",
  "owner_resource": "Order",
  "owner_id": 12345678,
  "created_at": "2015-01-02 20:27:51",
  "updated_at": "2015-01-05 18:15:40",
  "deleted_at": null
}


Tenha em mente que matrizes JSON não permitem vírgulas finais.

Ler uma 
Para ler uma fatura, precisamos procurar o metacampo criado anteriormente que contém a fatura.

GET /metafields/orders?per_page=1&owner_id=ORDER_ID&namespace=nfe&key=list&fields=value

HTTP/1.1 200 OK

[
    {
      "value": "[{\"key\": \"44444444444444444444444444444\", \"link\": \"http://nfe.com.br/nsaasa\", \"fulfillment_order_id\": \"01FHZXHK8PTP9FVK99Z66GXASS\"}, {\"key\": \"55555555555555555555555555555\", \"link\": \"http://nfe.com.br/nsaasb\", \"fulfillment_order_id\": \"01ARZ3NDEKTSV4RRFFQ69G5FAV\"}]",
    }
]


Você pode então decodificar JSON valuepara acessar a lista de NFEs.

Observação : você ainda pode usar o método antigo de envio da chave e da URL da NFe como dois metacampos separados, mas recomendamos migrar para esse novo método, pois agora ele é o método preferido para consumidores de NFe, pois permite receber várias NFes que dão suporte a pedidos com múltiplos atendimentos.