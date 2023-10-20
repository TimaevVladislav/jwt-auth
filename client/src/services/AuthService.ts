import axios from "../api"
import {AxiosResponse} from "axios"
import {AuthResponse, IAuthPayload} from "../interfaces/auth.interface"

export default class AuthService {
    static async login(payload: IAuthPayload): Promise<AxiosResponse<AuthResponse>> {
        return axios.post<AuthResponse>("/login", {...payload})
    }

    static async registration(payload: IAuthPayload): Promise<AxiosResponse<AuthResponse>> {
        return axios.post<AuthResponse>("/registration", {...payload})
    }

    static async logout(): Promise<void> {
        return axios.post("/logout")
    }
}