const express = require("express")
const { createClient } = require("@supabase/supabase-js")
const app = express()

const supabaseUrl = "https://oqyirdgdlowlcifwwfez.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeWlyZGdkbG93bGNpZnd3ZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMDk2MDcsImV4cCI6MjAzNDU4NTYwN30.aU_qhe7Zm_MM9F0TwmlInVGf91-ZOC58e_MG2RBYyeo"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const cors = require("cors")

// Middleware para lidar com JSON no corpo da requisição
app.use(express.json())
app.use(cors())

// Ou configure de forma mais específica
// app.use((req, res, next) => {
//   //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//   res.header("Access-Control-Allow-Origin", "*")
//   //Quais são os métodos que a conexão pode realizar na API
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
//   app.use(cors())
//   next()
// })

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
app.use(express.json())

app.post("/cok", cors(), async (req, res) => {
  const data = req.body
  const { nome } = data

  try {
    await supabase.from("wenhook_data").insert({ dados: nome })

    res.status(200).send("Sucesso")
  } catch (error) {
    res.status(500).send("Fail")
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
