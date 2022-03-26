require('dotenv').config()

const {
  PORT,
  ETHERSCAN_API_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = process.env

module.exports = {
  PORT,
  ETHERSCAN_API_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST
}
