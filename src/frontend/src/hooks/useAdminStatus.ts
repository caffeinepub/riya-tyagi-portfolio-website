import { useQuery } from '@tanstack/react-query';
import { useActorWithAdminProvisioning } from './useActorWithAdminProvisioning';

/**
 * Hook to check if the current caller is recognized as an admin by the backend
 * This helps distinguish between "not admin" and "admin but other error occurred"
 */
export function useAdminStatus() {
  const { actor, isFetching: actorFetching } = useActorWithAdminProvisioning();

  return useQuery<boolean>({
    queryKey: ['adminStatus'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.checkAdminStatus();
      } catch (error) {
        console.warn('Failed to check admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 30000, // Cache for 30 seconds
  });
}
