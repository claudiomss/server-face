const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// Configurar o body-parser para lidar com JSON
app.use(bodyParser.json())

// Substitua estes valores pelos seus
const accessToken = process.env.TOKEN
const pixelId = process.env.PIXEL

// Rota para receber o webhook
app.post("/webhook", async (req, res) => {
  const eventData = req.body

  // Exemplo de como você pode extrair informações do webhook
  const { statusTransaction, value } = eventData

  // Montar o payload para o Facebook Conversion API
  const payload = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    value: value,
    currency: "BRL",
  }

  if (statusTransaction == "PAID_OUT") {
    try {
      await axios.post(`https://graph.facebook.com/v12.0/${pixelId}/events`, {
        data: [payload],
        access_token: accessToken,
      })

      res.status(200).send("Event sent to Facebook successfully")
    } catch (error) {
      console.error(
        "Error sending event to Facebook:",
        error.response ? error.response.data : error.message
      )
      res.status(500).send("Failed to send event to Facebook")
    }
  } else res.status(402).send("Miss Pay")
})

app.get("/", async (req, res) => {
  res.status(200).send("Funcionando")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
