import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

function useEvents(id?: number): UseQueryResult<any> {
  const fetchEvents = async (): Promise<any> => {
    if (!id) {
      const res = await baseFetch(`${backendUrl}/api/events/`, {});
      return res.json();
    }
    const res = await baseFetch(`${backendUrl}/api/events/${id}`, {});
    return res.json();
  };

  return useQuery(['events'], fetchEvents);
}

export default useEvents;
