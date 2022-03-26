
const app = require('./index')
const env = require('./config/env.config')

const PORT = env.PORT || 8083

const server = app.listen(PORT, () => {
  console.log(`Servidor online en puerto ${PORT}`)
})

server.on('error', (error) => {
  console.log(`Ha ocurrido un error, ${error.message}`)
})
