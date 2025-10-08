import { axiosAPI } from "./baseService";

export const orderService = {
    checkout: async (payload: any) => {
        const res = await axiosAPI.post("/orders/checkout", payload);
        return res.data;
    },
    getById: async (id: string) => {
        const res = await axiosAPI.get(`/orders/${id}`)
        return res.data;
    },
    getBySessionId: async (session_id: string) => {
        const res = await axiosAPI.get(`/orders/checkout-success?session_id=${session_id}`);

        return res.data;
    }
}

export const stripeService = {
    createSession: async (order_id: string) => {
        const res = await axiosAPI.post("/payments/stripe/create-checkout-session", { order_id });
        return res.data;
    },
};