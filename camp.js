// // const axios = require("axios")
// // const express = require("express")
// // const app = express()
// // app.use(express.json())

// // async function sendPurchaseEvent(data) {
// //   const accessToken = "SEU_ACCESS_TOKEN"
// //   const pixelId = "SEU_PIXEL_ID"

// //   const eventSourceUrl = `https://example.com/compra-finalizada?utm_source=fb1&utm_campaign=${data.campaignName}|${data.campaignId}&utm_medium=${data.adsetName}|${data.adsetId}&utm_content=${data.adName}&cmc_adid=fb_${data.adId}`

// //   const eventData = {
// //     data: [
// //       {
// //         event_name: "Purchase",
// //         event_time: Math.floor(Date.now() / 1000),
// //         action_source: "website",
// //         event_source_url: eventSourceUrl,
// //         user_data: {
// //           client_ip_address: data.client_ip_address,
// //           client_user_agent: data.client_user_agent,
// //           fbc: data.fbc,
// //           fbp: data.fbp,
// //           email: data.email_hash,
// //         },
// //         custom_data: {
// //           currency: "BRL",
// //           value: data.value,
// //           content_ids: data.content_ids,
// //           contents: data.contents,
// //           content_type: "product",
// //           utm_source: "fb1",
// //           utm_campaign: `${data.campaignName}|${data.campaignId}`,
// //           utm_medium: `${data.adsetName}|${data.adsetId}`,
// //           utm_content: data.adName,
// //           cmc_adid: `fb_${data.adId}`,
// //         },
// //       },
// //     ],
// //     access_token: accessToken,
// //   }

// //   return eventData
// //   //   console.log(eventData)
// // }

// // app.get("/", async (req, res) => {
// //   // Exemplo de dados para envio do evento
// //   const data = {
// //     fbc: "fb.1.1234567890123456",
// //     fbp: "fb.1.6543210987654321",
// //     email_hash: "HASH_EMAIL",
// //     client_ip_address: "123.123.123.123",
// //     client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
// //     value: 47.9,
// //     content_ids: ["produto_123"],
// //     contents: [{ id: "produto_123", quantity: 1 }],
// //     campaignName: "Summer Sale",
// //     campaignId: "123456",
// //     adsetName: "Targeted Audience",
// //     adsetId: "7891011",
// //     adName: "Ad for Summer Sale",
// //     adId: "12131415",
// //   }
// //   const A = await sendPurchaseEvent(data)
// //   res.status(200).json(A)
// // })

// // const PORT = 3000
// // app.listen(PORT, () => {
// //   console.log(`Servidor rodando em http://localhost:${PORT}`)
// // })

// const express = require("express")
// const axios = require("axios")
// const app = express()

// app.use(express.json())

// app.post("/p", async (req, res) => {
//   // Extraindo a URL do corpo da requisição
//   const url = req.body.url

//   // Verificando se a URL está presente
//   if (!url) {
//     return res.status(400).send("URL não fornecida no corpo da requisição")
//   }

//   // Extrair os parâmetros da URL usando URLSearchParams
//   const urlParams = new URLSearchParams(new URL(url).search)

//   // Capturando parâmetros específicos
//   const utmSource = urlParams.get("utm_source")
//   const utmCampaign = urlParams.get("utm_campaign")
//   const utmMedium = urlParams.get("utm_medium")
//   const utmContent = urlParams.get("utm_content")
//   const cmcAdid = urlParams.get("cmc_adid")

//   // Dados do evento
//   const eventData = {
//     client_ip_address:
//       req.headers["x-forwarded-for"] || req.connection.remoteAddress,
//     client_user_agent: req.headers["user-agent"],
//     fbc: req.body.fbc,
//     fbp: req.body.fbp,
//     email_hash: req.body.email_hash,
//     event_source_url: url,
//     value: req.body.value,
//     content_ids: req.body.content_ids,
//     contents: req.body.contents,
//     campaignName: utmCampaign.split("|")[0], // Ajuste conforme necessário
//     campaignId: utmCampaign.split("|")[1], // Ajuste conforme necessário
//     adsetName: utmMedium.split("|")[0], // Ajuste conforme necessário
//     adsetId: utmMedium.split("|")[1], // Ajuste conforme necessário
//     adName: utmContent, // Ajuste conforme necessário
//     adId: cmcAdid.replace("fb_", ""), // Ajuste conforme necessário
//   }

//   // Enviando dados para o Facebook Conversion API
//   const A = await sendPurchaseEvent(eventData)

//   res.status(200).json(A)
// })

// async function sendPurchaseEvent(data) {
//   const accessToken = "SEU_ACCESS_TOKEN"
//   const pixelId = "SEU_PIXEL_ID"
//   //   const url = `https://graph.facebook.com/v13.0/${pixelId}/events`

//   const eventData = {
//     data: [
//       {
//         event_name: "Purchase",
//         event_time: Math.floor(Date.now() / 1000),
//         action_source: "website",
//         event_source_url: data.event_source_url,
//         user_data: {
//           client_ip_address: data.client_ip_address,
//           client_user_agent: data.client_user_agent,
//           fbc: data.fbc,
//           fbp: data.fbp,
//           email: data.email_hash,
//         },
//         custom_data: {
//           currency: "BRL",
//           value: data.value,
//           content_ids: data.content_ids,
//           contents: data.contents,
//           content_type: "product",
//           utm_source: data.campaignName,
//           utm_campaign: `${data.campaignName}|${data.campaignId}`,
//           utm_medium: `${data.adsetName}|${data.adsetId}`,
//           utm_content: data.adName,
//           cmc_adid: `fb_${data.adId}`,
//         },
//       },
//     ],
//     access_token: accessToken,
//   }

//   //   try {
//   //     const response = await axios.post(url, eventData)
//   //     console.log("Evento enviado com sucesso:", response.data)
//   //   } catch (error) {
//   //     console.error(
//   //       "Erro ao enviar o evento:",
//   //       error.response ? error.response.data : error.message
//   //     )
//   //   }
//   return eventData
// }

// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000")
// })

const express = require("express")
const axios = require("axios")
const app = express()

app.use(express.json())

app.post("/p", async (req, res) => {
  // Extraindo a URL do corpo da requisição
  const url = req.body.url

  // Verificando se a URL está presente
  if (!url) {
    return res.status(400).send("URL não fornecida no corpo da requisição")
  }

  // Extraindo parâmetros da URL
  const urlObj = new URL(url)
  const urlParams = new URLSearchParams(urlObj.search)

  const utmSource = urlParams.get("utm_source")
  const utmCampaign = urlParams.get("utm_campaign")
  const utmMedium = urlParams.get("utm_medium")
  const utmContent = urlParams.get("utm_content")
  const cmcAdid = urlParams.get("xcod") // Utilizando 'xcod' para obter o 'cmc_adid'

  // Para fins de exemplo, vamos assumir que o 'cmc_adid' é derivado de 'xcod' (ajuste conforme necessário)

  const eventData = {
    client_ip_address:
      req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    client_user_agent: req.headers["user-agent"],
    fbc: req.body.fbc,
    fbp: req.body.fbp,
    email_hash: req.body.email_hash,
    event_source_url: url,
    value: req.body.value,
    content_ids: req.body.content_ids,
    contents: req.body.contents,
    campaignName: extractCampaignName(utmCampaign),
    campaignId: extractCampaignId(utmCampaign),
    adsetName: extractAdsetName(utmMedium),
    adsetId: extractAdsetId(utmMedium),
    adName: extractAdName(utmContent),
    adId: extractAdId(cmcAdid),
  }

  // Enviando dados para o Facebook Conversion API

  const A = await sendPurchaseEvent(eventData)
  res.status(200).json(A)
})

// Funções auxiliares para extrair partes dos parâmetros
function extractCampaignName(campaign) {
  return campaign.split("|")[0]
}

function extractCampaignId(campaign) {
  return campaign.split("|")[1]
}

function extractAdsetName(medium) {
  return medium.split("|")[0]
}

function extractAdsetId(medium) {
  return medium.split("|")[1]
}

function extractAdName(content) {
  return content.split("|")[0]
}

function extractAdId(cmcAdid) {
  return cmcAdid ? cmcAdid.replace(/^\[|\]$/g, "") : "" // Ajuste conforme necessário
}

async function sendPurchaseEvent(data) {
  const accessToken = "SEU_ACCESS_TOKEN"
  const pixelId = "SEU_PIXEL_ID"
  //   const url = `https://graph.facebook.com/v13.0/${pixelId}/events`

  const eventData = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: data.event_source_url,
        user_data: {
          client_ip_address: data.client_ip_address,
          client_user_agent: data.client_user_agent,
          fbc: data.fbc,
          fbp: data.fbp,
          email: data.email_hash,
        },
        custom_data: {
          currency: "BRL",
          value: data.value,
          content_ids: data.content_ids,
          contents: data.contents,
          content_type: "product",
          utm_source: data.campaignName,
          utm_campaign: `${data.campaignName}|${data.campaignId}`,
          utm_medium: `${data.adsetName}|${data.adsetId}`,
          utm_content: data.adName,
          cmc_adid: `fb_${data.adId}`,
        },
      },
    ],
    access_token: accessToken,
  }

  //   try {
  //     const response = await axios.post(url, eventData)
  //     console.log("Evento enviado com sucesso:", response.data)
  //   } catch (error) {
  //     console.error(
  //       "Erro ao enviar o evento:",
  //       error.response ? error.response.data : error.message
  //     )
  //   }

  return eventData
}

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
