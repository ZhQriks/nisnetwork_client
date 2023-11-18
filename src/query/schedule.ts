import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { baseFetch } from 'service/authApi';
import { backendUrl } from 'utils/consts';

interface ClassroomQueryParams {
  group_number?: string;
  week_day?: number;
  grade_letter?: string;
  grade?: number;
}

function useClassrooms(params?: ClassroomQueryParams): UseQueryResult<any> {
  const fetchClassrooms = async (): Promise<any> => {
    let url = `${backendUrl}/api/classrooms/`;

    const queryParams: string[] = [];
    if (params?.group_number) {
      queryParams.push(`group_number=${encodeURIComponent(params.group_number)}`);
    }
    if (params?.week_day) {
      queryParams.push(`week_day=${encodeURIComponent(params.week_day)}`);
    }
    if (params?.grade_letter) {
      queryParams.push(`grade_letter=${encodeURIComponent(params.grade_letter)}`);
    }
    if (params?.grade !== undefined) {
      queryParams.push(`grade=${encodeURIComponent(params.grade.toString())}`);
    }

    if (queryParams.length) {
      url += `?${queryParams.join('&')}`;
    }

    const res = await baseFetch(url, {});
    return res.json();
  };

  return useQuery(['classrooms', params], fetchClassrooms);
}

export default useClassrooms;
