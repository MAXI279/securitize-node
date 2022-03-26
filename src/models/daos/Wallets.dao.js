const MongoDBContainer = require('../containers/Mongodb.container');
const { formatErrorObject } = require('../../utils/api.utils');
const WalletSchema = require('../schemas/Wallet.schema');
const constants = require('../../constants/api.constants');

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

  async createWallet(walletItem) {
    try {
      const wallet = await this.createItem(walletItem);
      await wallet.save();
      return wallet;
    }
    catch(error) {
      if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
        const newError = formatErrorObject(constants.STATUS.BAD_REQUEST, 'Wallet with given address already exist');
        throw new Error(JSON.stringify(newError));
      }
      throw new Error(error);
    }

  };

  async getById(id) {
    try {
      const document = await this.model
        .findById(id, { __v: 0 });
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`;
        const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
        throw new Error(JSON.stringify(newError));
      } else {
        return document;
      }
    }
    catch(error) {
      const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
      throw new Error(JSON.stringify(newError));
    }
  }

};

module.exports = UsersDao;