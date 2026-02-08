import { useQuery } from '@tanstack/react-query';
import { useActorWithAdminProvisioning } from './useActorWithAdminProvisioning';
import type { ContactMessage } from '../backend';

export function useMessages(enabled: boolean = false) {
  const { actor, isFetching: actorFetching } = useActorWithAdminProvisioning();

  return useQuery<ContactMessage[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllMessages();
    },
    enabled: enabled && !!actor && !actorFetching,
    retry: false,
  });
}
