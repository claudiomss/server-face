const express = require("express")
const { createClient } = require("@supabase/supabase-js")
const app = express()
const https = require("https")
const fs = require("fs")

const supabaseUrl = "https://oqyirdgdlowlcifwwfez.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeWlyZGdkbG93bGNpZnd3ZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMDk2MDcsImV4cCI6MjAzNDU4NTYwN30.aU_qhe7Zm_MM9F0TwmlInVGf91-ZOC58e_MG2RBYyeo"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const cors = require("cors")
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/servertt.online/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/servertt.online/fullchain.pem"),
}

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json())
app.use(cors())

// Ou configure de forma mais específica
app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*")
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  app.use(cors())
  next()
})

function getCookie(name) {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Exemplo de uso:
// Retorna o valor do cookie 'username'.
// console.log(username)

// Middleware para lidar com JSON no corpo da requisição

app.get("/", cors(), async (req, res) => {
  res.status(200).send("Rodando")
})

app.post("/cok", cors(), async (req, res) => {
  const data = req.body
  const { _fbc, _fbp, requestNumber } = data

  console.log("Received request:", data)

  try {
    const { error } = await supabase
      .from("wenhook_data")
      .insert({ fbc: _fbc, fbp: _fbp, requestNumber: requestNumber })

    if (error) {
      console.error("Error inserting data:", error)
      return res.status(500).send("Fail")
    }

    res.status(200).send("Sucesso")
  } catch (error) {
    console.error("Catch block error:", error)
    res.status(500).send("Fail")
  }
})

async function sendPurchaseEvent(data) {
  const axios = require("axios")
  const accessToken =
    "EAAHqLIBp79EBO7M9JQZCVvi0U6H56pSEY6R3eba6CckuB4Rpl7COpvVUQjk2n4SM2rBkn700upiWMQjzhEnUPfjLbWfqzZBT6gGBlTlRgiNynZAIvBYCGNLtOqzFwkiZACZADs9XZCw2EDOtDxUFbZAIJwiLtuTbnKCq98lm5iNZCKB7m0QFq49p0Czu0z52UZBXq9QZDZD"
  const pixelId = "4636511609906695"
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
          // email: data.email_hash,
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

app.post("/webhook", async (req, res) => {
  const reqData = req.body
  const { statusTransaction, value, requestNumber } = reqData

  // Capturando o IP do cliente
  const clientIpAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress

  // Capturando o User Agent do cliente
  const clientUserAgent = req.headers["user-agent"]

  if (statusTransaction == "PAID_OUT") {
    try {
      const { data } = await supabase
        .from("wenhook_data")
        .select("fbc,fbp")
        .eq("requestNumber", requestNumber)
        .single()

      // Exemplo de dados de evento
      const eventData = {
        client_ip_address: clientIpAddress,
        client_user_agent: clientUserAgent,
        fbc: data.fbc, // Recebendo os cookies via body
        fbp: data.fbp, // Recebendo os cookies via body
        // fbc: null, // Recebendo os cookies via body
        // fbp: null, // Recebendo os cookies via body
        // email_hash: req.body.email_hash, // Recebendo o e-mail em hash via body
        event_source_url: "https://deolho.site/", // Recebendo a URL de origem via body
        value: value, // Valor da compra
        content_ids: ["whatspy"], // IDs dos conteúdos comprados
        contents: [{ id: "whatspy", quantity: 1 }], // Informações sobre os conteúdos comprados
      }

      sendPurchaseEvent(eventData)

      return res.status(200).send("Sucesso envio dados")
    } catch (error) {
      return res.status(400).send("Fail Envio")
    }
  }
  res.status(500).send("Fail Pay")

  // Chame a função para enviar o evento ao Facebook Conversion API
  // console.log(eventData)
})

// const PORT = 3000
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`)
// })

https.createServer(options, app).listen(443, () => {
  console.log("Server is running on https://servertt.online")
})
