const User = require("../models/user")
const bcrypt = require("bcrypt")
const uuid = require("uuid")

class UserController {
    async registration(req, res) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exists`})
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = await User.create({email, password: hashPassword, activation: uuid.v4()})
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