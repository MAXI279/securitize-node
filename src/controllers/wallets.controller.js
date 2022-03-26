
const WalletsDao = require('../models/daos/Wallets.dao')
const wallets = new WalletsDao()
const { STATUS: { OK } } = require('../constants/api.constants')

const getAllWallets = async (req, res) => {
  try {
    const allWallets = await wallets.getAllWallets()
    return res.json({
      status: OK.code,
      body: allWallets
    })
  } catch (error) {
    const { error: err, message } = JSON.parse(error.message)
    return res.status(err.code).json({
      status: err.code,
      error: message
    })
  }
}

const postWallet = async (req, res) => {
  try {
    const wallet = await wallets.createWallet(req.body)

    return res.json({
      status: OK.code,
      body: wallet
    })
  } catch (error) {
    const { error: err, message } = JSON.parse(error.message)
    return res.status(err.code).json({
      status: err.code,
      error: message
    })
  }
}

const putWalletById = async (req, res) => {
  const { id, ...obj } = req.body
  try {
    const wallet = await wallets.updateWallet(obj, id)

    return res.json({
      status: OK.code,
      body: wallet
    })
  } catch (error) {
    const { error: err, message } = JSON.parse(error.message)
    return res.status(err.code).json({
      status: err.code,
      error: message
    })
  }
}

module.exports = {
  getAllWallets,
  postWallet,
  putWalletById
}
