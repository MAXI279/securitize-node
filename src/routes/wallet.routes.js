const express = require('express')
const { getAllWallets, postWallet, putWalletById } = require('../controllers/wallets.controller')
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({
    msg: 200,
    body: 'Test'
  })
})

router.get('/wallet', getAllWallets)
router.post('/wallet', postWallet)
router.put('/wallet', putWalletById)

module.exports = router
