
const WalletsDao = require('../models/daos/Wallets.dao')
const wallets = new WalletsDao()
const { STATUS: { OK } } = require('../constants/api.constants')
const ApiError = require('../error/ApiError')

const getAllWallets = async (req, res, next) => {
  try {
    const allWallets = await wallets.getAllWallets()
    return res.json({
      status: OK.code,
      body: allWallets
    })
  } catch (error) {
    next(error)
  }
}

const postWallet = async (req, res, next) => {
  try {
    const { address } = req.body
    if (!address) {
      throw ApiError.badRequest('address has not been entered!')
    }
    const wallet = await wallets.createWallet(req.body)

    return res.json({
      status: OK.code,
      body: wallet
    })
  } catch (error) {
    next(error)
  }
}

const putWalletById = async (req, res, next) => {
  const { id, ...obj } = req.body
  try {
    if (!id) {
      throw ApiError.badRequest('id has not been entered!')
    }
    const wallet = await wallets.updateWallet(obj, id)

    return res.json({
      status: OK.code,
      body: wallet
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllWallets,
  postWallet,
  putWalletById
}
