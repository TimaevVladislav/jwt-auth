const authenticate = require("../services/auth-service")


class UserController {
    async registration(req, res) {
        try {
            const {email, password} = req.body
            const user = await authenticate.registration(email, password)

            res.cookie("refreshToken", user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
          return res.status(400).json(e.message)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

        } catch (e) {

        }
    }

    async logout(req, res) {
        try {


        } catch (e) {

        }
    }

    async activate(req, res) {
        try {


        } catch (e) {

        }
    }

    async refresh(req, res) {
        try {


        } catch (e) {

        }
    }

    async getUsers(req, res) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new UserController()