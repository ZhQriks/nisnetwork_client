import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

function useNews(id?: number): UseQueryResult<any> {
  const fetchNews = async (): Promise<any> => {
    if (!id) {
      const res = await baseFetch(`${backendUrl}/api/blog/`, {});
      return res.json();
    }
    const res = await baseFetch(`${backendUrl}/api/blog/${id}`, {});
    return res.json();
  };

  return useQuery(['news'], fetchNews);
}

export default useNews;
