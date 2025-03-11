import type { Login } from "@/models/page.model"
import { client } from "./httpClient"

export const login = (payload: Login) => {
    return client({
        url: "/user/login",
        method: "post",
        data: payload,
    })
}