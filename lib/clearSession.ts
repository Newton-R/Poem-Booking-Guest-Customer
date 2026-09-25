import { useSessionModal } from "@/lib/useSessionModal";
import Cookies from "js-cookie";
import { queryClient } from "./queryClient";
import { useTokens } from "./useTokens";
import { useUserStore } from "./useUserStore";

export function clearSession() {
  useTokens.getState().deleteTokens();
  useUserStore.getState().deleteUser();
  useSessionModal.getState().closeModal();
  Cookies.remove("token");
  queryClient.clear();
}
