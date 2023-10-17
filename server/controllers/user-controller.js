class UserController {
    async registration(req, res) {
        try {
            const {email, password} = req.body
            res.json({message: "User was created"})
        } catch (e) {

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