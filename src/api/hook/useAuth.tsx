import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../service/authService";
import { useAuthStore } from "../../core/store/authStore";

export const useLogin = () => {
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const tokenRes = await authService.login(data); // lấy token
      return { token: tokenRes.access_token };      
    },
    onSuccess: ({ token }) => {
      console.log(token)
      login(token)
    },
  });
};


export const useRegister = () =>{
   return useMutation({
    mutationFn: authService.register,
   })
}

export const logout = () =>{
  
}

export const useReadMe = () => {
  const setUser = useAuthStore(state => state.setUser);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await authService.readMe();
      setUser(user);
      return user;
    },
    enabled: !!useAuthStore.getState().token, // chỉ chạy nếu có token
  });
};

