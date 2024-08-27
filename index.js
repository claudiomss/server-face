// const express = require("express")
// const axios = require("axios")
// const bodyParser = require("body-parser")

// const app = express()
// const port = 3000

// // Configurar o body-parser para lidar com JSON
// app.use(bodyParser.json())

// // Substitua estes valores pelos seus
// const accessToken = process.env.TOKEN
// const pixelId = process.env.PIXEL

// // Rota para receber o webhook
// app.post("/webhook", async (req, res) => {
//   const eventData = req.body

//   // Exemplo de como você pode extrair informações do webhook
//   const { statusTransaction, value } = eventData

//   // Montar o payload para o Facebook Conversion API
//   const payload = {
//     event_name: "Purchase",
//     event_time: Math.floor(Date.now() / 1000),
//     value: value,
//     currency: "BRL",
//   }

//   if (statusTransaction == "PAID_OUT") {
//     try {
//       await axios.post(`https://graph.facebook.com/v12.0/${pixelId}/events`, {
//         data: [payload],
//         access_token: accessToken,
//       })

//       res.status(200).send("Event sent to Facebook successfully")
//     } catch (error) {
//       console.error(
//         "Error sending event to Facebook:",
//         error.response ? error.response.data : error.message
//       )
//       res.status(500).send("Failed to send event to Facebook")
//     }
//   } else res.status(402).send("Miss Pay")
// })

// app.get("/", async (req, res) => {
//   res.status(200).send("Funcionando")
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })

const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(express.json())

const accessToken =
  "EAAHqLIBp79EBO7M9JQZCVvi0U6H56pSEY6R3eba6CckuB4Rpl7COpvVUQjk2n4SM2rBkn700upiWMQjzhEnUPfjLbWfqzZBT6gGBlTlRgiNynZAIvBYCGNLtOqzFwkiZACZADs9XZCw2EDOtDxUFbZAIJwiLtuTbnKCq98lm5iNZCKB7m0QFq49p0Czu0z52UZBXq9QZDZD"
const pixelId = "4636511609906695"

app.post("/webhook", async (req, res) => {
  const eventData = req.body

  // Extraindo informações do webhook
  const { statusTransaction, value } = eventData

  if (statusTransaction == "PAID_OUT") {
    try {
      // Enviando o evento de Purchase para o Facebook
      const response = await axios.post(
        `https://graph.facebook.com/v17.0/${pixelId}/events`,
        {
          data: [
            {
              event_name: "Purchase",
              event_time: Math.floor(Date.now() / 1000),
              event_source_url: "https://deolho.site/inicio/",
              action_source: "website",
              custom_data: {
                currency: "BRL",
                value: value,
                status: statusTransaction,
              },
            },
          ],
          access_token: accessToken,
        }
      )

      res.status(200).send({
        message: "Evento enviado com sucesso",
        response: response.data,
      })
    } catch (error) {
      console.error("Erro ao enviar o evento:", error)
      res
        .status(500)
        .send({ message: "Erro ao enviar o evento", error: error.message })
    }
  } else res.status(402).send("Miss Pay")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
