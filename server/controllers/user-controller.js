const authenticate = require("../services/auth-service")
const {validationResult} = require("express-validator")
const ExceptionApi = require("../exceptions/api.error")
const User = require("../models/user")


class UserController {
    async registration(req, res, next) {
        try {
            const validation = validationResult(req)

            if (!validation.isEmpty()) {
                return next(ExceptionApi.BadRequest("Validation error", validation.array()))
            }

            const {email, password} = req.body
            const user = await authenticate.registration(email, password)

            res.cookie("refreshToken", user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
          next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await authenticate.login(email, password)

            res.cookie("refreshToken", user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)

        } catch (e) {
          next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await authenticate.logout(refreshToken)

            res.clearCookie("refreshToken")
            return res.json(token)
        } catch (e) {
          next(e)
        }
    }

    async activate(req, res, next) {
        try {
           const link = req.params.link
           await authenticate.activate(link)
           return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
          next(e)
        }
    }

    async refresh(req, res) {
        try {


        } catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
          const users = await User.find()
          return res.json(users)
        } catch (e) {
          next(e)
        }
    }
}

module.exports = new UserController()