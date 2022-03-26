
const mongoose = require('mongoose')
const { formatErrorObject } = require('../../utils/api.utils')
const constants = require('../../constants/api.constants');
const ApiError = require('../../error/ApiError');

const {
  STATUS: {
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST
  }
} = constants

class MongoDBContainer {
  static instancia;
  constructor (collection, Schema) {
    this.model = mongoose.model(collection, Schema)
  }

  async getAll (filter = {}) {
      const documents = await this.model.find(filter, { __v: 0 }).lean()
      return documents
  }

  async getById (id) {
      const document = await this.model.findById(id, { __v: 0 }).lean()
      if (!document) {
        const errorMessage = `Resource with id ${id} does not exist in our records`
        throw ApiError.notFound(errorMessage)
      }
      return document
  }

  async createItem (resourceItem) {
      const newItem = new this.model(resourceItem)
      await newItem.save()
      return newItem
  }

  async updateItem (obj, id) {
    const document = await this.model.findById(id, { __v: 0 }).lean()
    if (!document) {
      const errorMessage = `Resource with id ${id} does not exist in our records`
      throw ApiError.notFound(errorMessage)
    }
    return this.model.updateOne({ _id: id }, { $set: obj })
  }

}

module.exports = MongoDBContainer
