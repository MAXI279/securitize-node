
const app = require('./index')
const env = require('./config/env.config')
const dbConfig = require('./db/config')
const mongoose = require('mongoose')

const PORT = env.PORT || 8083

const server = app.listen(PORT, () => {
  mongoose.connect(dbConfig.mongodb.connectTo('challenge'))
    .then(() => {
      console.info('[mongodb] MongoDB conectado')
      console.log(`Servidor online en puerto ${PORT}`)
    }).catch((error) => {
      console.log(`Ha ocurrido un error, ${error.message}`)
    })
})

server.on('error', (error) => {
  console.log(`Ha ocurrido un error, ${error.message}`)
})
