import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { gptKey } from 'utils/consts';

export default function useCalculate(): UseMutationResult<any> {
  const queryClient = useQueryClient();

  const calculateRes = async (message: any): Promise<any> => {
    const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${gptKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `${
              'YOU API, который используется для получения результатов' +
              'Калькулятор потребления ресурсов: Калькулятор поможет вам оценить потребление ресурсов.' +
              'На основе ответа пользователя оцените и дайте отзыв пользователю и рекомендации по улучшению. Ответы пользователя, где 0 шкала ответа минимума и 100 шкала ответа максимума ( Ответ должен быть коротким 50-70 слов ): '
            }${message}`,
          },
        ],
      }),
    });

    return res.json();
  };

  return useMutation(calculateRes, {
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('events');
    },
  });
}
