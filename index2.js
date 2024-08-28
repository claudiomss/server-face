// const axios = require("axios")
// const crypto = require("crypto")

// function hashValue(value) {
//   return crypto.createHash("sha256").update(value).digest("hex")
// }

// async function sendPageViewEvent(pixelId, accessToken) {
//   const url = `https://graph.facebook.com/v17.0/${pixelId}/events`

//   const eventData = {
//     data: [
//       {
//         event_name: "PageView",
//         event_time: Math.floor(new Date() / 1000), // Tempo atual em segundos desde o Unix Epoch
//         user_data: {
//           em: hashValue("email@example.com"), // Exemplo de email hashado
//           ph: hashValue("+5511999999999"), // Exemplo de telefone hashado
//           // Adicione mais dados de cliente conforme necessário e hash
//         },
//         custom_data: {
//           // Você pode adicionar dados customizados aqui se necessário
//         },
//         event_source_url: "https://seu-site.com/sua-pagina", // URL da página onde o evento ocorreu
//         action_source: "website", // Fonte do evento, neste caso, website
//       },
//     ],
//     access_token: accessToken,
//   }

//   try {
//     const response = await axios.post(url, eventData)
//     console.log("Evento PageView enviado com sucesso:", response.data)
//   } catch (error) {
//     console.error(
//       "Erro ao enviar o evento PageView:",
//       error.response ? error.response.data : error.message
//     )
//   }
// }

// const accessToken =
//   "EAAGmZBgCmBa0BOZCpy3qZAeJEbMPspePaZA04Qfr4fHQ9srxnSFZCOjPDAZAyHIwAlzmhdLcKzfmAj8bjM50pTEWvJLZBB4CwE0oWZCji3mVCsTtob0Gy2pub4azWwyWKzEy1ZCf8v2HzX9n0Cl66yN1wPk5bIUZBB4b51qvSJpVMg6siwdyBymMqgoZAXZC6LotctdCMgZDZD"
// const pixelId = "1011636240246252"

// sendPageViewEvent(pixelId, accessToken)

const axios = require("axios")
const crypto = require("crypto")

function hashValue(value) {
  return crypto.createHash("sha256").update(value).digest("hex")
}

async function sendPurchaseEvent(pixelId, accessToken) {
  const url = `https://graph.facebook.com/v19.0/${pixelId}/events`

  const eventData = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(new Date() / 1000), // Tempo atual em segundos desde o Unix Epoch
        user_data: {
          em: hashValue("email@example.com"), // Exemplo de email hashado
          ph: hashValue("+5511999999999"), // Exemplo de telefone hashado
          // Adicione mais dados de cliente conforme necessário e hash
        },
        custom_data: {
          currency: "BRL", // Moeda da transação
          value: 47.9, // Valor da transação
          content_name: "WhySpy", // Nome do produto (opcional)
          content_category: "Info", // Categoria do produto (opcional)
          // content_ids: ["ID_PRODUTO"], // IDs dos produtos comprados (opcional)
          content_type: "product", // Tipo de conteúdo (opcional)
        },
        event_source_url: "https://deolho.site/inicio", // URL da página onde o evento ocorreu
        action_source: "website", // Fonte do evento, neste caso, website
      },
    ],
    access_token: accessToken,
  }

  try {
    const response = await axios.post(url, eventData)
    console.log("Evento Purchase enviado com sucesso:", response.data)
  } catch (error) {
    console.error(
      "Erro ao enviar o evento Purchase:",
      error.response ? error.response.data : error.message
    )
  }
}

const accessToken =
  "EAAGmZBgCmBa0BOZCpy3qZAeJEbMPspePaZA04Qfr4fHQ9srxnSFZCOjPDAZAyHIwAlzmhdLcKzfmAj8bjM50pTEWvJLZBB4CwE0oWZCji3mVCsTtob0Gy2pub4azWwyWKzEy1ZCf8v2HzX9n0Cl66yN1wPk5bIUZBB4b51qvSJpVMg6siwdyBymMqgoZAXZC6LotctdCMgZDZD"
const pixelId = "1011636240246252"

// const accessToken = process.env.TOKEN222
// const pixelId = process.env.PIXEL222

sendPurchaseEvent(pixelId, accessToken)
