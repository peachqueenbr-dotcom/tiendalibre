https://impeto.uazapi.com

token *



POST
/sender/advanced
Criar envio em massa avançado
Cria um novo envio em massa com configurações avançadas, permitindo definir múltiplos destinatários e mensagens com delays personalizados.

Request
Body
delayMin
integer
Delay mínimo entre mensagens (segundos)

Example: 3

delayMax
integer
Delay máximo entre mensagens (segundos)

Example: 6

info
string
Descrição ou informação sobre o envio em massa

Example: "Campanha de lançamento"

scheduled_for
integer
Timestamp em milissegundos (date unix) ou minutos a partir de agora para agendamento

Example: 1

messages
array
required
Lista de mensagens a serem enviadas

Responses

200
Mensagens adicionadas à fila com sucesso

400
Erro nos parâmetros da requisição

401
Não autorizado - token inválido ou ausente

500
Erro interno do servidor


payload:

{
  "delayMin": 3,
  "delayMax": 6,
  "info": "teste avançado",
  "scheduled_for": 1,
  "messages": [
    {
      "number": "5511999999999",
      "type": "text",
      "text": "First message"
    },
    {
      "number": "5511999999999",
      "type": "button",
      "text": "Promoção Especial!\nConfira nossas ofertas incríveis",
      "footerText": "Válido até 31/12/2024",
      "imageButton": "https://exemplo.com/banner-promocao.jpg",
      "choices": [
        "Ver Ofertas|https://loja.exemplo.com/ofertas",
        "Falar com Vendedor|reply:vendedor",
        "Copiar Cupom|copy:PROMO2024"
      ]
    },
    {
      "number": "5511999999999",
      "type": "list",
      "text": "Escolha sua categoria preferida:",
      "listButton": "Ver Categorias",
      "choices": [
        "[Eletrônicos]",
        "Smartphones|eletronicos_smartphones",
        "Notebooks|eletronicos_notebooks",
        "[Roupas]",
        "Camisetas|roupas_camisetas",
        "Sapatos|roupas_sapatos"
      ]
    },
    {
      "number": "5511999999999",
      "type": "document",
      "file": "https://example.com/doc.pdf",
      "docName": "Documento.pdf"
    },
    {
      "number": "5511999999999",
      "type": "carousel",
      "text": "Conheça nossos produtos",
      "choices": [
        "[Smartphone XYZ\nO mais avançado smartphone da linha]",
        "{https://exemplo.com/produto1.jpg}",
        "Copiar Código|copy:PROD123",
        "Ver no Site|https://exemplo.com/xyz",
        "[Notebook ABC\nO notebook ideal para profissionais]",
        "{https://exemplo.com/produto2.jpg}",
        "Copiar Código|copy:NOTE456",
        "Comprar Online|https://exemplo.com/abc"
      ]
    }
  ]
}