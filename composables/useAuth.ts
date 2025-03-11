import { useIndexStore } from "@/stores/main";
import * as services from "@/services/API.service";

const store = useIndexStore();

export const verify = async () => {
    await services.getUserInfo()
    .then((resp: any) => {
      const data = resp.data.data;
      console.log(data)
      store.$state.userId = data.id;
      store.$state.token = data.token;
    })
    .catch((error: any) => {
       console.error(error);
     })
     .finally(() => {});
}
