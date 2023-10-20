import axios from "../api"
import {AxiosResponse} from "axios"
import {IUsers} from "../interfaces/user.interface"


export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUsers[]>> {
        return axios.get<IUsers[]>("/users")
    }
}