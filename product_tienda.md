Produto
Um Produto é um item à venda em uma loja Tiendanube/Nuvemshop. Pode ser um bem ou um serviço.

📢 Importante 📢

Uma nova API de produto com suporte para vários inventários está sendo implementada para todos os comerciantes.

Para qualquer novo desenvolvimento, recomendamos fortemente que você use a nova versão. Entre em contato conosco para ativar a nova versão em suas lojas, se necessário.

Propriedade	Explicação
eu ia	O identificador numérico exclusivo do produto
nome	Lista dos nomes dos produtos, em todos os idiomas suportados pela loja
descrição	Lista das descrições do Produto, em HTML, em todos os idiomas suportados pela loja
lidar	Lista de strings amigáveis ​​a URL geradas a partir dos nomes dos produtos, em todos os idiomas suportados pela loja
variantes	Lista de objetos de variantes de produto que representam as diferentes versões do produto
imagens	Lista de objetos de imagem do produto que representam as imagens do produto
categorias	Lista de IDs de categoria que representam as categorias do produto
marca	A marca do produto
publicado	verdadeiro se o produto for publicado na loja. falso caso contrário
Frete grátis	verdadeiro se o produto for elegível para frete grátis. falso caso contrário
URL do vídeo	String com formato de URL válido. Admite apenas links https.
título_seo	Título otimizado para SEO para o produto. Até 70 caracteres
descrição_seo	Descrição otimizada para SEO do produto. Até 320 caracteres.
atributos	Lista dos nomes dos atributos cujos valores definem as variantes. Ex.: Cor, Tamanho, etc. É importante que o número de atributos attributesseja igual ao número de atributos valuesdentro das variantes. Cada produto pode ter no máximo 3 atributos.
etiquetas	String com todas as tags do Produto, separadas por vírgulas
criado_em	Data em que o produto foi criado no formato ISO 8601
atualizado_em	Data da última atualização do produto no formato ISO 8601
requer_envio	verdadeiro se o produto for físico. falso se for digital
OBTER / 
Receba uma lista de todos os produtos.

Importante: Nossa API retorna até 30 resultados por padrão. Para recuperar um número maior de resultados, você deve usar os parâmetros de paginação ( pagee per_page).

Parâmetro	Explicação
ids	Restringe os resultados aos IDs especificados. É possível incluir até 30 IDs, separados por vírgulas.
desde_id	Restringir resultados após o ID especificado
linguagem	Especificar idioma de pesquisa
q	Pesquisar produtos que contenham o texto fornecido em seus nomes, descrições ou SKU
lidar	Mostrar produtos com um URL fornecido
id_da_categoria	Mostrar produtos com uma determinada categoria
publicado	Exibir produtos por status publicado. Os valores válidos são "true" ou "false".
Frete grátis	Exibir produtos por status de frete grátis. Os valores válidos são "true" ou "false".
max_stock	Mostrar produtos com estoque menor ou igual ao valor especificado
estoque mínimo	Mostrar produtos com estoque maior ou igual ao valor especificado
tem_preço_promocional	Exibir produtos com preço promocional definido. Os valores válidos são verdadeiro ou falso.
tem_peso	Mostrar produtos com peso definido. Os valores válidos são verdadeiro ou falso.
tem_todas_as_dimensões	Exibe produtos com profundidade, largura e altura definidas. Os valores válidos são verdadeiro ou falso.
tem_peso_e_todas_as_dimensões	Exibe produtos com peso, profundidade, largura e altura definidos. Os valores válidos são verdadeiro ou falso.
criado_em_min	Mostrar produtos criados após a data ( formato ISO 8601 )
criado_no_máximo	Mostrar produtos criados antes da data ( formato ISO 8601 )
atualizado_no_min	Mostrar produtos atualizados pela última vez após a data ( formato ISO 8601 )
atualizado_no_máximo	Mostrar produtos atualizados pela última vez antes da data ( formato ISO 8601 )
ordenar por	Classificar produtos por um critério específico (por exemplo: sort_by=created-at-ascending)
página	Página para mostrar
por_página	Quantidade de resultados
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
Critérios de classificação	Explicação
usuário	Classificação definida manualmente pelo usuário
preço crescente, custo crescente	Classificar por preço crescente
preço decrescente, custo decrescente	Classificar por preço decrescente
alfa-ascendente, nome-ascendente	Classificar por nome do produto em ordem crescente
alfa-decrescente, nome-decrescente	Classificar por nome do produto em ordem decrescente
criado-em-ascendente	Classificar por data de criação em ordem crescente
criado-em-decrescente	Classificar por data de criação em ordem decrescente
mais vendido	Classificar por número de produtos vendidos em ordem decrescente
OBTER / 
HTTP/1.1 200 OK

[
  {
    "attributes": [
      {
        "en": "Size"
      }
    ],
    "categories": [
      {
        "created_at": "2013-01-03T09:11:51-03:00",
        "description": {
          "en": "",
          "es": "",
          "pt": ""
        },
        "handle": {
          "en": "poke-balls",
          "es": "poke-balls",
          "pt": "poke-balls"
        },
        "id": 4567,
        "name": {
          "en": "Poké Balls",
          "es": "Poké Balls",
          "pt": "Poké Balls"
        },
        "parent": null,
        "subcategories": [],
        "google_shopping_category": null,
        "updated_at": "2013-03-11T09:14:11-03:00"
      }
    ],
    "created_at": "2013-01-03T09:11:51-03:00",
    "description": {
      "en": "<p>The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.</p>",
      "es": "<p>La mejor Bola con el nivel máximo de desempeño. Atrapará cualquier Pokémon sin fallar.</p>",
      "pt": "<p>A melhor Bola com o nível máximo de desempenho. Ele vai pegar qualquer Pokémon selvagem sem falhar.</p>"
    },
    "handle": {
      "en": "master-ball",
      "es": "master-ball",
      "pt": "master-ball"
    },
    "id": 1234,
    "images": [
      {
        "id": 101,
        "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/servine-640-0.jpg",
        "position": 1,
        "product_id": 1234
      },
      {
        "id": 112,
        "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/onyx-640-0.jpg",
        "position": 2,
        "product_id": 1234
      },
      {
        "id": 123,
        "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/stoutland-640-0.jpg",
        "position": 3,
        "product_id": 1234
      }
    ],
    "name": {
      "en": "Master Ball",
      "es": "Master Ball",
      "pt": "Master Ball"
    },
    "brand": null,
    "video_url": "https://www.youtube.com/watch?v=57aG16_gQcU",
    "seo_title": "Master Ball",
    "seo_description": "The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.",
    "published": true,
    "free_shipping": false,
    "updated_at": "2013-03-11T09:14:11-03:00",
    "variants": [
      {
        "id": 101,
        "promotional_price": "19.00",
        "created_at": "2013-01-03T09:11:51-03:00",
        "depth": null,
        "height": null,
        "values": [
          {
            "en": "Small"
          }
        ],
        "price": "25.00",
        "product_id": 1234,
        "stock_management": true,
        "stock": 5,
        "sku": "BSG1234A",
        "updated_at": "2013-03-11T09:14:11-03:00",
        "weight": "2.00",
        "width": null,
        "cost": null
      },
      {
        "id": 112,
        "promotional_price": "19.00",
        "created_at": "2013-01-03T09:11:51-03:00",
        "depth": null,
        "height": null,
        "values": [
          {
            "en": "Medium"
          }
        ],
        "price": "25.00",
        "product_id": 1234,
        "stock_management": true,
        "stock": 5,
        "sku": "BSG1234B",
        "updated_at": "2013-03-11T09:14:11-03:00",
        "weight": "2.25",
        "width": null,
        "cost": null
      },
      {
        "id": 133,
        "promotional_price": "19.00",
        "created_at": "2013-01-03T09:11:51-03:00",
        "depth": null,
        "height": null,
        "values": [
          {
            "en": "Large"
          }
        ],
        "price": "25.00",
        "product_id": 1234,
        "stock_management": true,
        "stock": 5,
        "sku": "BSG1234C",
        "updated_at": "2013-03-11T09:14:11-03:00",
        "weight": "2.50",
        "width": null,
        "cost": "10.99"
      }
    ],
    "tags": "Brinquedos, pokeball, oferta, colecionismo"
  }
]


OBTER /produtos?created_at_min=2013-01-01T00:00:00-03:00&fields=id, 
HTTP/1.1 200 OK

[
  {
    "id": 1234,
    "name": {
      "en": "Master Ball",
      "es": "Master Ball",
      "pt": "Master Ball"
    }
  }
]

OBTER /produtos/{id 
Receba um único produto

Parâmetro	Explicação
campos	Lista de campos separados por vírgulas a serem incluídos na resposta
OBTER /produtos/ 
HTTP/1.1 200 OK

{
  "attributes": [
    {
      "en": "Size"
    }
  ],
  "categories": [
    {
      "created_at": "2013-01-03T09:11:51-03:00",
      "description": {
        "en": "",
        "es": "",
        "pt": ""
      },
      "handle": {
        "en": "poke-balls",
        "es": "poke-balls",
        "pt": "poke-balls"
      },
      "id": 4567,
      "name": {
        "en": "Poké Balls",
        "es": "Poké Balls",
        "pt": "Poké Balls"
      },
      "parent": null,
      "subcategories": [],
      "google_shopping_category": null,
      "updated_at": "2013-03-11T09:14:11-03:00"
    }
  ],
  "created_at": "2013-01-03T09:11:51-03:00",
  "description": {
    "en": "<p>The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.</p>",
    "es": "<p>La mejor Bola con el nivel máximo de desempeño. Atrapará cualquier Pokémon sin fallar.</p>",
    "pt": "<p>A melhor Bola com o nível máximo de desempenho. Ele vai pegar qualquer Pokémon selvagem sem falhar.</p>"
  },
  "handle": {
    "en": "master-ball",
    "es": "master-ball",
    "pt": "master-ball"
  },
  "id": 1234,
  "images": [
    {
      "id": 101,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/servine-640-0.jpg",
      "position": 1,
      "product_id": 1234
    },
    {
      "id": 112,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/onyx-640-0.jpg",
      "position": 2,
      "product_id": 1234
    },
    {
      "id": 123,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/stoutland-640-0.jpg",
      "position": 3,
      "product_id": 1234
    }
  ],
  "name": {
    "en": "Master Ball",
    "es": "Master Ball",
    "pt": "Master Ball"
  },
  "brand": null,
  "video_url": "https://www.youtube.com/watch?v=57aG16_gQcU",
  "seo_title": "Master Ball",
  "seo_description": "The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.",
  "published": true,
  "free_shipping": false,
  "updated_at": "2013-03-11T09:14:11-03:00",
  "variants": [
    {
      "id": 101,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Small"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234A",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.00",
      "width": null,
      "cost": null
    },
    {
      "id": 112,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Small"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234B",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.25",
      "width": null,
      "cost": null
    },
    {
      "id": 133,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Small"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234C",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.50",
      "width": null,
      "cost": "10.99"
    }
  ],
  "tags": "Brinquedos, pokeball, oferta, colecionismo"
}


OBTER /produtos/sku/{sku 
Retorna o primeiro Produto encontrado onde uma de suas variantes possui o SKU fornecido.

OBTER /produtos/sku/ 
POST / 
Cria um novo produto

Observação: para garantir um processo fluido, recomendamos que você crie um produto com no máximo 9 imagens vinculadas ao objeto neste endpoint. Se o produto tiver mais imagens, use este endpoint: POST /products/{product_id}/images

POST / 
{
  "invalid_name": "foobar"
}

HTTP/1.1 422 Unprocessable Entity

{
  "name": ["can't be blank"]
}

HTTP/1.1 422 Unprocessable Entity

{
  "code": 422,
  "message": "Unprocessable Entity",
  "description": "Store has reached maximum limit of 100000 allowed products"
}

HTTP/1.1 422 Unprocessable Entity

{
  "code": 422,
  "message": "Unprocessable Entity",
  "description": "Product is not allowed to have more than 250 images"
}

HTTP/1.1 422 Unprocessable Entity

{
  "code": 422,
  "message": "Unprocessable Entity",
  "description": "Product is not allowed to have more than 1000 variants"
}

{
  "code": 422,
  "message": "Unprocessable Entity",
  "description": "The video url field is not a secure url"
}

POST / 
{
  "images": [
    {
      "src": "http://images1.wikia.nocookie.net/__cb20101106022321/pokemon/images/f/f1/UltraBallArt.png"
    }
  ],
  "name": {
    "en": "Ultra Ball",
    "es": "Ultra Ball",
    "pt": "Ultra Ball"
  },
  "video_url": "https://www.youtube.com/watch?v=57aG16_gQcU",
  "variants": [
    {
      "price": "10.00",
      "stock_management": true,
      "stock": 12,
      "weight": "2.00",
      "cost": "10.99"
    }
  ],
  "categories": [11654304, 11654305]
}


HTTP/1.1 201 Created

{
  "attributes": [],
  "categories": [
    {
      "created_at": "2013-01-03T09:11:51-03:00",
      "description": {
        "en": "",
        "es": "",
        "pt": ""
      },
      "handle": {
        "en": "poke-balls",
        "es": "poke-balls",
        "pt": "poke-balls"
      },
      "id": 4567,
      "name": {
        "en": "Poké Balls",
        "es": "Poké Balls",
        "pt": "Poké Balls"
      },
      "parent": null,
      "subcategories": [],
      "google_shopping_category": null,
      "updated_at": "2013-03-11T09:14:11-03:00"
    }
  ],
  "created_at": "2013-06-01T12:15:11-03:00",
  "description": {
    "en": "",
    "es": "",
    "pt": ""
  },
  "handle": {
    "en": "ultra-ball",
    "es": "ultra-ball",
    "pt": "ultra-ball"
  },
  "id": 2435,
  "images": [
    {
      "id": 231,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/UltraBallArt.jpg",
      "position": 1,
      "product_id": 2435
    }
  ],
  "name": {
    "en": "Ultra Ball",
    "es": "Ultra Ball",
    "pt": "Ultra Ball"
  },
  "brand": null,
  "video_url": "https://www.youtube.com/watch?v=57aG16_gQcU",
  "seo_title": "Ultra Ball",
  "seo_description": "",
  "published": true,
  "free_shipping": false,
  "created_at": "2013-06-01T12:15:11-03:00",
  "variants": [
    {
      "id": 101,
      "promotional_price": null,
      "created_at": "2013-06-01T12:15:11-03:00",
      "depth": null,
      "height": null,
      "values": [],
      "price": "10.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 12,
      "sku": null,
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.00",
      "width": null,
      "cost": "10.99"
    }
  ],
  "tags": ""
}

COLOQUE /produtos/{id 
Modificar um produto existente

Observação: se você criar um produto sem o objeto " Variante do Produto" e quiser alterar informações como preço e estoque, na API há uma variante "virtual" vinculada às propriedades típicas de uma variante (preços, estoque, dimensões, etc.). Portanto, nesses casos, as alterações em qualquer uma das propriedades mencionadas acima devem ser feitas na variante "virtual", não no produto em si. Ou seja, o endpoint a ser usado é: PUT /products/{product_id}/variants/{id}

Importante: Se o produto tiver uma categoria associada e ocategoriescampo for enviado vazio, o produto ficará sem categoria. Em outras palavras, a categoria será removida do produto. Portanto, se você quiser manter a categoria atual, deverá incluí-lacategory_idno campo ou omiti-categoriesla.

COLOQUE /produtos/ 
{
  "categories": [4567],
  "id": 1234,
  "published": false
}

HTTP/1.1 200 OK

{
  "attributes": [
    {
      "en": "Size"
    }
  ],
  "categories": [
    {
      "created_at": "2013-01-03T09:11:51-03:00",
      "description": {
        "en": "",
        "es": "",
        "pt": ""
      },
      "handle": {
        "en": "poke-balls",
        "es": "poke-balls",
        "pt": "poke-balls"
      },
      "id": 4567,
      "name": {
        "en": "Poké Balls",
        "es": "Poké Balls",
        "pt": "Poké Balls"
      },
      "parent": null,
      "subcategories": [],
      "google_shopping_category": null,
      "updated_at": "2013-03-11T09:14:11-03:00"
    }
  ],
  "created_at": "2013-01-03T09:11:51-03:00",
  "description": {
    "en": "<p>The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.</p>",
    "es": "<p>La mejor Bola con el nivel máximo de desempeño. Atrapará cualquier Pokémon sin fallar.</p>",
    "pt": "<p>A melhor Bola com o nível máximo de desempenho. Ele vai pegar qualquer Pokémon selvagem sem falhar.</p>"
  },
  "handle": {
    "en": "master-ball",
    "es": "master-ball",
    "pt": "master-ball"
  },
  "id": 1234,
  "images": [
    {
      "id": 101,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/servine-640-0.jpg",
      "position": 1,
      "product_id": 1234
    },
    {
      "id": 112,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/onyx-640-0.jpg",
      "position": 2,
      "product_id": 1234
    },
    {
      "id": 123,
      "src": "http://d26lpennugtm8s.cloudfront.net/stores/001/234/products/stoutland-640-0.jpg",
      "position": 3,
      "product_id": 1234
    }
  ],
  "name": {
    "en": "Master Ball",
    "es": "Master Ball",
    "pt": "Master Ball"
  },
  "brand": null,
  "video_url": null,
  "seo_title": "Master Ball",
  "seo_description": "The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.",
  "published": false,
  "free_shipping": false,
  "updated_at": "2013-06-01T12:15:11-03:00",
  "variants": [
    {
      "id": 101,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Small"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234A",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.00",
      "width": null,
      "cost": null
    },
    {
      "id": 112,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Medium"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234B",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.25",
      "width": null,
      "cost": null
    },
    {
      "id": 133,
      "promotional_price": "19.00",
      "created_at": "2013-01-03T09:11:51-03:00",
      "depth": null,
      "height": null,
      "values": [
        {
          "en": "Large"
        }
      ],
      "price": "25.00",
      "product_id": 1234,
      "stock_management": true,
      "stock": 5,
      "sku": "BSG1234C",
      "updated_at": "2013-03-11T09:14:11-03:00",
      "weight": "2.50",
      "width": null,
      "cost": null
    }
  ],
  "tags": ""
}


EXCLUIR /produtos/{id 
Remover um produto

EXCLUIR /produtos/ 
HTTP/1.1 200 OK

{}

PATCH /produtos/ 
Atualiza o estoque ou o preço de vários produtos e variantes. 50 variantes diferentes podem ser atualizadas de uma só vez, considerando todos os produtos.

PATCH /produtos/ 
[
    {
        "id": 53786462,
        "variants": [
            {
                "id": 147085180,
                "price": 1000,
                "inventory_levels": [
                    {
                        "stock": 300
                    }
                ]
            }
        ]
    },
    {
        "id": 49819000,
        "variants": [
            {
                "id": 133862417,
                "price": 222.03
            },
            {
                "id": 133862416,
                "inventory_levels": [
                    {
                        "stock": 100
                    }
                ]
            }
        ]
    }
]

Importante: Este exemplo se aplica a lojas que não utilizam múltiplos armazéns. Se a loja utilizar múltiplos armazéns, deverá especificar o estoque a ser atribuído a cada um deles ( location_id). Exemplo aqui .

Parâmetro	Obrigatório	Descrição
Matriz principal (sem chave)	Sim 	Conjunto de produtos
eu ia	Sim 	ID do produto
variantes	Sim	Conjunto de variantes
eu ia	Sim 	ID da variante
preço	Não 	Preço da variante
níveis_de_inventário	Não 	Lista com níveis de estoque
estoque	Não 	Quantidade em estoque
O campo de estoque fica dentro de cada inventory_levelselemento da matriz para indicar o estoque de acordo com o projeto Multi CD.

HTTP/1.1 200 OK

[
    {
        "id": 53786462,
        "variants": [
            {
                "id": 147085180,
                "success": true
            }
        ]
    },
    {
        "id": 49819000,
        "variants": [
            {
                "id": 133862417,
                "success": true
            },
            {
                "id": 133862416,
                "success": true
            }
        ]
    }
]

HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Unprocessable Entity",
    "description": "Validation error",
    "price": [
        "The price must be a number."
    ]
}

HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Unprocessable Entity",
    "description": "Validation error",
    "stock": [
        "The stock must be at least 0."
    ]
}

HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Unprocessable Entity",
    "description": "Too many variants sent for update"
}