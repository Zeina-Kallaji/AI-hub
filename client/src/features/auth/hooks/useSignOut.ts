import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/stores/auth.store';

export function useSignOut() {
    const queryClient = useQueryClient();

    const signOut = () => {
              console.log("before logout:", useAuthStore.getState());

      useAuthStore.getState().clearSession();
      queryClient.clear();
      console.log("Session after logout:", useAuthStore.getState());

    };
  
    return { signOut };
}



