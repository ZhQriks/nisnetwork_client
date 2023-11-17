import React from 'react';

import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import image from 'assets/logo/eco_logo.png';
import { useLogin } from 'query/auth';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const login = useLogin();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = (formData: { email: string; password: string }): void => {
    login.mutate(formData, {
      onSuccess: () => {
        navigate('/');
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
          Рады видеть вас снова!
        </Text>

        <Divider label='Войдите' labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label='Почта'
              placeholder='janibek@gmail.com'
              {...form.getInputProps('email')}
              radius='md'
            />

            <PasswordInput
              required
              label='Пароль'
              placeholder='Your password'
              {...form.getInputProps('password')}
              radius='md'
            />
          </Stack>

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => navigate('/register')}
              size='sm'
            >
              Нет аккаунта? Зарегистрируйтесь
            </Anchor>
            <Button type='submit' radius='lg'>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
