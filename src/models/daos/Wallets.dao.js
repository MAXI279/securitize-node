const MongoDBContainer = require('../containers/Mongodb.container');
const { formatErrorObject } = require('../../utils/api.utils');
const WalletSchema = require('../schemas/Wallet.schema');
const constants = require('../../constants/api.constants');
const ApiError = require('../../error/ApiError');

const {
  STATUS: {
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST,
  }
} = constants;

const collection = 'Wallet';

class WalletsDao extends MongoDBContainer {
  static instance;
  constructor() {
    if (!WalletsDao.instance) {
      super(collection, WalletSchema);
      WalletsDao.instance = this;
      return this;
    }
    else {
      return WalletsDao.instance;
    }
  }

  async getAllWallets () {
      return await this.getAll()
  }

  async createWallet(walletItem) {
    try {
      const wallet = await this.createItem(walletItem);
      await wallet.save();
      return wallet;
    }
    catch(error) {
      if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
        throw ApiError.badRequest('Wallet with given address already exist')
      }
      throw ApiError.internal('An error ocurred, please contact support')
    }

  }

  async updateWallet (wallet, id) {
      const updatedWallet = await this.updateItem(wallet, id)
      return updatedWallet
  }

}

module.exports = WalletsDao;