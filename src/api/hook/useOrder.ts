import { useMutation, useQuery } from "@tanstack/react-query";
import { orderService, stripeService } from "../service/orderService";

export const useCheckout = () => {
  return useMutation({
    mutationFn: orderService.checkout,
  });
};
export const useGetOrderbyId = (id: string) =>{
    return useQuery({
        queryKey: ["order", id],   // cache riêng cho từng id
        queryFn: () => orderService.getById(id),
        enabled: !!id,   
    })
}

export const useGetOrderbySessionId = (sesion_id: string) =>{
    return useQuery({
        queryKey: ["order", sesion_id],   // cache riêng cho từng id
        queryFn: () => orderService.getBySessionId(sesion_id),
        enabled: !!sesion_id,   
    })
}

export const useStripeCheckout = () => {
  return useMutation({
    mutationFn: (order_id: string) => stripeService.createSession(order_id),
    onSuccess: (data) => {
      // Stripe sẽ redirect luôn
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      }
    },
    onError: (error: any) => {
      console.error("Stripe checkout error:", error);
      alert("Không thể tạo phiên thanh toán Stripe. Vui lòng thử lại.");
    },
  });
};
