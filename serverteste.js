const express = require("express")
const app = express()

app.use(express.json())

app.post("/webhook", (req, res) => {
  const reqData = req.body
  const { statusTransaction, value } = reqData

  // Capturando o IP do cliente
  const clientIpAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress

  // Capturando o User Agent do cliente
  const clientUserAgent = req.headers["user-agent"]

  // Exemplo de dados de evento
  const eventData = {
    client_ip_address: clientIpAddress,
    client_user_agent: clientUserAgent,
    fbc: req.body.fbc, // Recebendo os cookies via body
    fbp: req.body.fbp, // Recebendo os cookies via body
    email_hash: req.body.email_hash, // Recebendo o e-mail em hash via body
    event_source_url: req.body.event_source_url, // Recebendo a URL de origem via body
    value: req.body.value, // Valor da compra
    content_ids: req.body.content_ids, // IDs dos conteúdos comprados
    contents: req.body.contents, // Informações sobre os conteúdos comprados
  }

  // Chame a função para enviar o evento ao Facebook Conversion API
  console.log(eventData)

  res.status(200).send("Evento de compra recebido com sucesso!")
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})

async function sendPurchaseEvent(data) {
  const axios = require("axios")
  const accessToken = "SEU_ACCESS_TOKEN"
  const pixelId = "SEU_PIXEL_ID"
  const url = `https://graph.facebook.com/v13.0/${pixelId}/events`

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
        },
      },
    ],
    access_token: accessToken,
  }

  try {
    const response = await axios.post(url, eventData)
    console.log("Evento enviado com sucesso:", response.data)
  } catch (error) {
    console.error(
      "Erro ao enviar o evento:",
      error.response ? error.response.data : error.message
    )
  }
}
