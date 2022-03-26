const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WalletSchema = new Schema({
  address: { type: String, required: true, unique: true },
  favorite: { type: Boolean, default: false }
})

module.exports = WalletSchema
