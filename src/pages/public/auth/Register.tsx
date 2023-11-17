import React from 'react';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegister } from 'query/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  grade: number | null;
  major1: string;
  major2: string;
  password: string;
  group: number | null;
}

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const register = useRegister();

  const form = useForm({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      grade: null,
      major1: '',
      major2: '',
      password: '',
      grade_letter: '',
      group: null,
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      grade: val => (val && (val < 1 || val > 12) ? 'Grade must be between 1 and 12' : null),
    },
  });

  const handleSubmit = (formData: FormData): void => {
    register.mutate(formData, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <Container maw='70rem' pt={90}>
      <Title order={3} sx={{ textDecoration: 'none' }} color='primaryGreen' align='center'>
        nis.network
      </Title>

      <Paper radius='md' p='xl' withBorder maw='30rem' mx='auto' mt='md'>
        <Text size='lg' weight={500} align='center'>
          Добро пожаловать!
        </Text>

        <Divider label='Создайте аккаунт' labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label='Почта'
              placeholder='example@gmail.com'
              {...form.getInputProps('email')}
              radius='md'
            />
            <TextInput
              required
              label='Имя'
              placeholder='Максат'
              {...form.getInputProps('first_name')}
              radius='md'
            />
            <TextInput
              required
              label='Фамилия'
              placeholder='Койшыбаев'
              {...form.getInputProps('last_name')}
              radius='md'
            />
            <PasswordInput
              required
              label='Пароль'
              placeholder='Your password'
              {...form.getInputProps('password')}
              radius='md'
            />
            <TextInput
              label='Класс'
              placeholder='Класс (1-12)'
              {...form.getInputProps('grade')}
              radius='md'
            />
            <TextInput
              label='Буква класса'
              placeholder='1 буква: A, B, C, D'
              {...form.getInputProps('grade_letter')}
              radius='md'
            />
            <TextInput
              label='Группа'
              placeholder='Группа (1, 2)'
              {...form.getInputProps('group')}
              radius='md'
            />
            <TextInput
              label='Major 1'
              placeholder='First Major'
              {...form.getInputProps('major1')}
              radius='md'
            />
            <TextInput
              label='Major 2'
              placeholder='Second Major'
              {...form.getInputProps('major2')}
              radius='md'
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => navigate('/login')}
              size='sm'
            >
              Есть аккаунт? Войдите
            </Anchor>
            <Button type='submit' radius='lg'>
              Зарегистрироваться
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
