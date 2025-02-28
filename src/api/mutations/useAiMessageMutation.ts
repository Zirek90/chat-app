import { useMutation } from '@tanstack/react-query';
import { API } from '../api';
import { MUTATION_KEYS } from './keys';

export function useAiMessageMutation() {
  return useMutation({
    mutationKey: [MUTATION_KEYS.AI_MESSAGE],
    mutationFn: API.ai.sendMessageToAiAssistant,
  });
}
