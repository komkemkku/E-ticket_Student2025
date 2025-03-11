import type { Login } from "@/models/page.model"
import { client } from "./httpClient"

export const login = (data: { email: string; studentID: string }) => {
    return client({
      url: "/user/login",
      method: "post",
      data,
    });
  };
  