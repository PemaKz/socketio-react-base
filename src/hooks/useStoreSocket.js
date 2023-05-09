import { create } from "zustand";

export const useStoreSocket = create((set) => ({
  socket: null,
  setSocket: (socket) => {
    set((state) => {
      return { socket };
    });
  }
}));