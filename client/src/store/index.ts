import { makeObservable, observable } from "mobx"
import {IUser} from "../interfaces/user.interface"
import {IAuthPayload} from "../interfaces/auth.interface"
import AuthService from "../services/AuthService"

export default class Store {
    // @ts-ignore
    @observable user: IUser = {} as IUser
    // @ts-ignore
    @observable isAuth = false

    constructor() {
     makeObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(payload: IAuthPayload) {
        try {
            const response = await AuthService.login(payload)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    async registration(payload: IAuthPayload) {
        try {
            const response = await AuthService.registration(payload)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem("token")
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e)
        }
    }
}