const ExceptionApi = require("../exceptions/api.error")
const tokenService = require("../services/token-service")

module.exports = (req, res, next) => {
    try {
       const authorization = req.headers.authorization

       if (!authorization) {
            return next(ExceptionApi.UnauthorizedError())
       }

      const accessToken = authorization.split(' ')[1]

      if (!accessToken) {
          return next(ExceptionApi.UnauthorizedError())
      }

      const user = tokenService.validateAccessToken(accessToken)

      if (!user) {
         return next(ExceptionApi.UnauthorizedError())
      }

      req.user = user
      next()
    } catch (e) {
      return next(ExceptionApi.UnauthorizedError())
    }
}