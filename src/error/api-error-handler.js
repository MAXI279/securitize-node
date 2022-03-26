const ApiError = require('./ApiError')
const constants = require('../constants/api.constants')

const {
  STATUS: {
    INTERNAL_ERROR
  }
} = constants

function apiErrorHandler (err, req, res, next) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.code).json({
      status: err.code,
      error: err.message
    })
    return
  }

  return res.status(INTERNAL_ERROR.code).json({
    status: INTERNAL_ERROR.code,
    error: `${INTERNAL_ERROR.tag} An error ocurred, please contact support`
  })
}

module.exports = apiErrorHandler
