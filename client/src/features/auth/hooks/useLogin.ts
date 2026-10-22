import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useAuthStore } from "@/shared/stores/auth.store";

export function useLogin() {
    return useMutation({
      mutationFn: login,
      // to be edited
      onSuccess: ({ token, user }) => useAuthStore.getState().setSession(token, user),
    });
  }
  