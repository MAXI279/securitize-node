const express = require('express')
// const cors = require('cors')
const walletRoutes = require('./routes/wallet.routes')
const app = express()
const apiErrorHandler = require('./error/api-error-handler')

// const corsOptions = {
//   origin: 'http://localhost:8081'
// }

// app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', walletRoutes)
app.use(apiErrorHandler)
module.exports = app
