import { useState } from 'react';
import { useActorWithAdminProvisioning } from './useActorWithAdminProvisioning';

export function useContactSubmit() {
  const { actor, isFetching } = useActorWithAdminProvisioning();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actor is ready when it exists and is not currently being fetched
  const isReady = !!actor && !isFetching;

  const submitMessage = async (name: string, email: string, message: string) => {
    if (!actor) {
      throw new Error('ACTOR_NOT_READY');
    }

    setIsSubmitting(true);
    try {
      await actor.submitMessage(name, email, message);
    } catch (error: any) {
      console.error('Failed to submit message:', error);
      
      // Normalize errors into safe categories for UI
      // Note: submitMessage is a public operation and should not require admin access
      if (error?.message?.includes('network') || error?.message?.includes('timeout')) {
        throw new Error('NETWORK_ERROR');
      } else {
        throw new Error('SUBMISSION_FAILED');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitMessage, isSubmitting, isReady };
}
