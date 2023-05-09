import { create } from "zustand";

export const useStoreUser = create((set) => ({
  user: null,
  setUser: (user) => {
    set((state) => {
      return { user };
    });
  },
  setUserBalance: (balance) => {
    set((state) => {
      return { user: { ...state.user, balance } };
    });
  },
  logout: () => {
    set((state) => {
      localStorage.removeItem("token");
      return { user: null };
    });
  }
}));