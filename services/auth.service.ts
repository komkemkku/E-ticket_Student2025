import type { Login, Register } from "@/models/page.model"
import { client } from "./httpClient"

export const login = (data: { email: string; student_id: string }) => {
    return client({
      url: "/user/login",
      method: "post",
      data,
    });
  };
  
  export const register = (payload: Register) => {
    return client({
        url: "/user/create",
        method: "post",
        data: payload,
    })
}