import type { Login, Register } from "@/models/page.model"
import { client } from "./httpClient"

export const login = (payload: Login) => {
    return client({
        url: "/user/login",
        method: "post",
        data: payload,
    })
}

export const register = (payload: Register) => {
    return client({
        url: "/user/create",
        method: "post",
        data: payload,
    })
}