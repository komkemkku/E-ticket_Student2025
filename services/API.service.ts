import { client } from "./httpClient";
import { useIndexStore } from "@/stores/main";

export const getUserInfo = () => {
  return client({
    url: "/user/info",
    method: "get",
  });
};

export const getEvents = () => {
  return client({
    url: "/event/list",
    method: "get",
  });
};

export const getEventsById = (
  id: number | string,
  query?: Record<string, any>
) => {
  return client({
    url: `/event/${id}`,
    method: "get",
    params: query || {},
  });
};

export const createTicket = (data: { user_id: number; event_id: number }) => {
  return client({
    url: "/ticket/create",
    method: "post",
    data,
  });
};

export const getUserTicket = (userId: number) => {
  const store = useIndexStore();
  const token = store.token;

  return client({
    url: `/ticket/list?user_id=${userId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// export const getTicketById = (
//   id: number | string,
//   query?: Record<string, any>
// ) => {
//   return client({
//     url: `/ticket/${id}`,
//     method: "get",
//     params: query || {},
//   });
// };

export const getTicketById = async (
  id: number | string,
  query?: Record<string, any>
) => {
  try {
    if (!id) {
      throw new Error("Ticket ID ไม่ถูกต้อง");
    }

    console.log(`📡 Fetching Ticket ID: ${id}...`);

    const response = await client({
      url: `/ticket/${id}`,
      method: "get",
      params: query || {},
    });

    if (response?.status === 200 && response.data) {
      console.log("API Response:", response.data);
      return response.data;
    } else {
      throw new Error("ไม่พบข้อมูลตั๋ว หรือเกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
    }
  } catch (error: any) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลตั๋ว:", error.message);
    throw new Error(error.message || "ไม่สามารถโหลดข้อมูลตั๋วได้");
  }
};
