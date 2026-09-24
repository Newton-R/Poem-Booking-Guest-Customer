import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Agency } from "./types/agency";

interface useAgencyProps {
  agencies: Agency[];
  setAgency: (a: Agency[]) => void;
}

export const useAgencies = create<useAgencyProps>()(
  persist(
    (set) => ({
      agencies: [] as Agency[],
      setAgency: (agency) => set({ agencies: agency }),
    }),
    {
      name: "agencies",
    },
  ),
);
