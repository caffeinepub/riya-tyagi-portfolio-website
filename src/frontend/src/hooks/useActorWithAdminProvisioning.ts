import { useInternetIdentity } from './useInternetIdentity';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { type backendInterface } from '../backend';
import { createActorWithConfig } from '../config';
import { getSecretParameter, onAdminTokenChange } from '../utils/urlParams';

const ACTOR_QUERY_KEY = 'actor-with-admin';

export function useActorWithAdminProvisioning() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const actorQuery = useQuery<backendInterface>({
    queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;

      if (!isAuthenticated) {
        // Return anonymous actor if not authenticated
        return await createActorWithConfig();
      }

      const actorOptions = {
        agentOptions: {
          identity,
        },
      };

      const actor = await createActorWithConfig(actorOptions);

      // Check if admin token is present and non-empty (one-time bootstrap)
      const adminToken = getSecretParameter('caffeineAdminToken');
      const normalizedToken = adminToken?.trim();
      
      if (normalizedToken && normalizedToken.length > 0) {
        try {
          // Authorize admin with the token - this binds the principal to admin role
          const authorized = await actor.authorizeAdmin(normalizedToken);
          if (authorized) {
            console.log('Admin authorization successful - principal bound to admin role');
          }
        } catch (error) {
          console.warn('Admin authorization failed:', error);
          // Don't throw - allow the actor to be used for public operations
        }
      }

      return actor;
    },
    staleTime: Infinity,
    enabled: true,
  });

  // Listen for admin token changes and re-provision
  useEffect(() => {
    const cleanup = onAdminTokenChange(() => {
      // Invalidate and refetch the actor when token changes
      queryClient.invalidateQueries({ queryKey: [ACTOR_QUERY_KEY] });
    });
    
    return cleanup;
  }, [queryClient]);

  // When the actor changes, invalidate dependent queries
  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        },
      });
    }
  }, [actorQuery.data, queryClient]);

  // Expose a method to force re-provisioning
  const reprovision = () => {
    queryClient.invalidateQueries({ queryKey: [ACTOR_QUERY_KEY] });
  };

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
    reprovision,
  };
}
