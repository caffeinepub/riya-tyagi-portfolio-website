import { useState } from 'react';
import { useActor } from './useActor';

export function useContactSubmit() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMessage = async (name: string, email: string, message: string) => {
    if (!actor) {
      throw new Error('Backend actor not initialized');
    }

    setIsSubmitting(true);
    try {
      await actor.submitMessage(name, email, message);
    } catch (error) {
      console.error('Failed to submit message:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitMessage, isSubmitting };
}
