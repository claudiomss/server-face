// const express = require("express")
// const app = express()

// // Define uma rota para a página web
// app.get("/", (req, res) => {
//   //   const eventData = req.body
//   //   const { urlPost } = eventData

//   res.send(
//     "<html><!-- Meta Pixel Code --><script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1011636240246252');fbq('track', 'AddToCart');</script><noscript><img height='1' width='1' style='display:none'src='https://www.facebook.com/tr?id=1011636240246252&ev=PageView&noscript=1'/></noscript><!-- End Meta Pixel Code --><body><h1>Olá, Mundo!</h1></body></html>"
//   )
// })

// // Define a porta e inicia o servidor
// const PORT = 3000
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`)
// })

// const express = require("express")
// const app = express()

// // Define uma rota para a página web
// app.get("/", (req, res) => {
//   // Captura todos os parâmetros da URL
//   const queryParams = req.query

//   // Converte os parâmetros em uma string para exibir na página
//   const queryParamsString = Object.entries(queryParams)
//     .map(([key, value]) => `${key}: ${value}`)
//     .join("<br>")

//   res.send(
//     `<html>
//       <!-- Meta Pixel Code -->
//       <script>
//         !function(f,b,e,v,n,t,s){
//           if(f.fbq)return;
//           n=f.fbq=function(){
//             n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
//           };
//           if(!f._fbq)f._fbq=n;
//           n.push=n;n.loaded=!0;n.version='2.0';
//           n.queue=[];
//           t=b.createElement(e);t.async=!0;
//           t.src=v;
//           s=b.getElementsByTagName(e)[0];
//           s.parentNode.insertBefore(t,s)
//         }
//         (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
//         fbq('init', '1011636240246252');
//         fbq('track', 'AddToCart');
//       </script>
//       <noscript>
//         <img height='1' width='1' style='display:none'
//           src='https://www.facebook.com/tr?id=1011636240246252&ev=PageView&noscript=1'/>
//       </noscript>
//       <!-- End Meta Pixel Code -->
//       <body>
//         <h1>Parâmetros Capturados:</h1>
//         <p>${queryParamsString}</p>
//       </body>
//     </html>`
//   )
// })

// // Define a porta e inicia o servidor
// const PORT = 3000
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`)
// })

const express = require("express")
const { createClient } = require("@supabase/supabase-js")
const app = express()
const cors = require("cors")

const supabaseUrl = "https://oqyirdgdlowlcifwwfez.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeWlyZGdkbG93bGNpZnd3ZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMDk2MDcsImV4cCI6MjAzNDU4NTYwN30.aU_qhe7Zm_MM9F0TwmlInVGf91-ZOC58e_MG2RBYyeo"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json())
app.use(cors())

// Ou configure de forma mais específica
app.use(
  cors({
    origin: "http://127.0.0.1:5500/", // Substitua pela origem do seu frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
)

// Rota para lidar com o webhook
app.post("/webhook", (req, res) => {
  // Captura todos os parâmetros enviados pelo webhook
  const queryParams = req.body

  // Constrói a query string com todos os parâmetros
  const queryString = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&")

  // Cria a URL de redirecionamento
  const redirectUrl = `/display?${queryString}`

  // Redireciona para a URL construída
  res.redirect(redirectUrl)
})

// Rota para exibir a página com os parâmetros
app.get("/display", (req, res) => {
  // Captura os parâmetros da URL
  const queryParams = req.query

  // Converte os parâmetros em uma string para exibir na página
  const queryParamsString = Object.entries(queryParams)
    .map(([key, value]) => `${key}: ${value}`)
    .join("<br>")

  res.send(
    `<html>
      <body>
        <h1>Parâmetros Capturados:</h1>
        <p>${queryParamsString}</p>
      </body>
    </html>`
  )
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
