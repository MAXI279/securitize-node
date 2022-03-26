const env = require('../config/env.config')

module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${database}?retryWrites=true&w=majority`
  }
}
