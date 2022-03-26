const express = require('express')
// const cors = require('cors')
const walletRoutes = require('./routes/wallet.routes')
const app = express()

// const corsOptions = {
//   origin: 'http://localhost:8081'
// }

// app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(walletRoutes)

module.exports = app
