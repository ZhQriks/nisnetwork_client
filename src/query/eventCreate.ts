import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

export default function useCreateEvent(): UseMutationResult<any> {
  const queryClient = useQueryClient();

  const createEvent = (data: any): any => {
    return baseFetch(`${backendUrl}/api/events/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return useMutation(createEvent, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('events');
    },
  });
}
