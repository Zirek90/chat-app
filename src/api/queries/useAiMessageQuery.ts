import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import { QUERY_KEYS } from './keys';
import { MessageInterface } from '@/src/features';

export function useAiMessageQuery(messages: MessageInterface[]) {
  return useQuery({
    queryKey: [QUERY_KEYS.AI_MESSAGE],
    queryFn: async () => API.ai.sendMessageToAiAssistant(messages),
  });
}
