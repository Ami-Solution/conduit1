// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Simple in-memory store
const orders = [
  "ZRX/WETH",
  "EOS/WETH",
  "AMIS/WETH",
  "DAI/WETH"
]

app.get("/orders", (request, response) => {
  response.send(orders)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/orders", (request, response) => {
  orders.push(request.query.orders)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
