import { create } from "zustand";

interface SessionModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSessionModal = create<SessionModalProps>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
