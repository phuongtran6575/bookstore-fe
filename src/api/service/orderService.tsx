import { axiosAPI } from "./baseService";

export const orderService = {
    checkout: async (payload: any) => {
        const res = await axiosAPI.post("/orders/checkout", payload);
        return res.data;
    },
}