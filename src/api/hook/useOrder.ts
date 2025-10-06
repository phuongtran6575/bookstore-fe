import { useMutation } from "@tanstack/react-query";
import { orderService } from "../service/orderService";

export const useCheckout = () => {
  return useMutation({
    mutationFn: orderService.checkout,
  });
};
