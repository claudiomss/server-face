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

// const express = require("express")
// const axios = require("axios")
// require("dotenv").config()
// const crypto = require("crypto")

// const app = express()
// app.use(express.json())

// // const accessToken = process.env.TOKEN
// // const pixelId = process.env.PIXEL

// const accessToken =
//   "EAAHqLIBp79EBO7M9JQZCVvi0U6H56pSEY6R3eba6CckuB4Rpl7COpvVUQjk2n4SM2rBkn700upiWMQjzhEnUPfjLbWfqzZBT6gGBlTlRgiNynZAIvBYCGNLtOqzFwkiZACZADs9XZCw2EDOtDxUFbZAIJwiLtuTbnKCq98lm5iNZCKB7m0QFq49p0Czu0z52UZBXq9QZDZD"
// const pixelId = "4636511609906695"

// function hashValue(value) {
//   return crypto.createHash("sha256").update(value).digest("hex")
// }

// app.post("/webhook", async (req, res) => {
//   const eventData = req.body

//   // Extraindo informações do webhook
//   const { statusTransaction, value } = eventData

//   if (statusTransaction == "PAID_OUT") {
//     try {
//       // Enviando o evento de Purchase para o Facebook
//       const response = await axios.post(
//         `https://graph.facebook.com/v17.0/${pixelId}/events`,
//         {
//           data: [
//             {
//               event_name: "Purchase",
//               event_time: Math.floor(new Date() / 1000), // Tempo atual em segundos desde o Unix Epoch
//               user_data: {
//                 em: hashValue("email@example.com"), // Exemplo de email hashado
//                 ph: hashValue("+5511999999999"), // Exemplo de telefone hashado
//                 // Adicione mais dados de cliente conforme necessário e hash
//               },
//               custom_data: {
//                 currency: "BRL", // Moeda da transação
//                 value: value, // Valor da transação
//                 content_name: "WhySpy", // Nome do produto (opcional)
//                 content_category: "Info", // Categoria do produto (opcional)
//                 // content_ids: ["ID_PRODUTO"], // IDs dos produtos comprados (opcional)
//                 content_type: "product", // Tipo de conteúdo (opcional)
//               },
//               event_source_url: "https://deolho.site/inicio", // URL da página onde o evento ocorreu
//               action_source: "website", // Fonte do evento, neste caso, website
//             },
//           ],
//           access_token: accessToken,
//         }
//       )

//       res.status(200).send({
//         message: "Evento enviado com sucesso",
//         response: response.data,
//       })
//     } catch (error) {
//       console.error("Erro ao enviar o evento:", error)
//       res
//         .status(500)
//         .send({ message: "Erro ao enviar o evento", error: error.message })
//     }
//   } else res.status(402).send("Miss Pay")
// })

// const PORT = process.env.PORT || 443
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`)
// })

const express = require("express")
const { createClient } = require("@supabase/supabase-js")
const app = express()
const cors = require("cors")

const supabaseUrl = "https://oqyirdgdlowlcifwwfez.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeWlyZGdkbG93bGNpZnd3ZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMDk2MDcsImV4cCI6MjAzNDU4NTYwN30.aU_qhe7Zm_MM9F0TwmlInVGf91-ZOC58e_MG2RBYyeo"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

app.use(express.json())
app.use(cors())

// Ou configure de forma mais específica
app.use(
  cors({
    origin: "*", // Permitir todas as origens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
)

// Define uma rota para a página web
app.post("/webhook", (req, res) => {
  const eventData = req.body

  // Extraindo informações do webhook
  const { statusTransaction } = eventData

  if (statusTransaction == "PAID_OUT") {
    res.send(
      "<html><!-- Meta Pixel Code --><script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '4636511609906695');fbq('track', 'AddToCart');</script><noscript><img height='1' width='1' style='display:none'src='https://www.facebook.com/tr?id=4636511609906695&ev=PageView&noscript=1'/></noscript><!-- End Meta Pixel Code --><body><h1>Olá, Mundo!</h1></body></html>"
    )
  } else res.status(402).send("Miss Pay")
})

app.post("/coleta", async (req, res) => {
  const data = req.body

  try {
    await supabase.from("wenhook_data").insert({ dados: data })

    res.status(200).send("Sucesso")
  } catch (error) {
    res.status(500).send("Fail")
  }
})

// Define a porta e inicia o servidor
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
