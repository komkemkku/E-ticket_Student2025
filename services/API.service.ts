import { client } from "./httpClient";

export const getUserInfo = () => {
    return client({
      url: "/user/info",
      method: "get",
    });
  };