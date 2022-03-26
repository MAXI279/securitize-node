const express = require('express')

const router = express.Router()

router.get('/test', (req, res) => {
  res.json({
    msg: 200,
    body: 'Test'
  })
})

module.exports = router
