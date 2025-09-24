// stores/authStore.ts
import { create } from "zustand";
import type { User } from "../Types";



interface AuthState {
  user: User | null;
  roles: string[];
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  setAuth: (user: User, roles: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  token: localStorage.getItem("access_token"),

  login: (token) => {
    localStorage.setItem("access_token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    set({ token: null, user: null, roles: [] });
  },

  setAuth: (user, roles) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("roles", JSON.stringify(roles));
    set({ user, roles });
  },
}));
