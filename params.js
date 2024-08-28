const http = require("http")
const url = require("url")

http
  .createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query

    console.log(queryObject) // Isso vai exibir todos os parâmetros com suas respectivas chaves e valores

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(queryObject))
  })
  .listen(8080)

console.log("Servidor rodando em http://localhost:8080")
