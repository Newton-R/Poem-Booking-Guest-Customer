import Cookies from "js-cookie";
import { queryClient } from "./queryClient";
import { useTokens } from "./useTokens";
import { useUserStore } from "./useUserStore";

export function clearSession() {
  useTokens.getState().deleteTokens();
  useUserStore.getState().deleteUser();
  Cookies.remove("token");
  queryClient.clear();
}
