const express = require('express')

const app = express()

app.get('/test', (req, res) => {
  res.json({
    msg: 200,
    body: 'Test'
  })
})

module.exports = app
