const ExceptionApi = require("../exceptions/api.error")

module.exports = (err, req, res, next) => {
  if (err instanceof ExceptionApi) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }

  return res.status(500).json({message: "Unexpected error"})
}