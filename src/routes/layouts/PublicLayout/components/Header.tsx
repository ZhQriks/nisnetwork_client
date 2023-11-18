import React from 'react';

import {
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Button,
  Divider,
  Stack,
  MediaQuery,
  Drawer,
  Modal,
  Title,
  Anchor,
  UnstyledButton,
  Avatar,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import image from 'assets/logo/eco_logo.png';
import { useUser } from 'query/auth';
import { Link, useLocation } from 'react-router-dom';
import { storage } from 'utils/storage';

const useStyles = createStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    transition: 'color 0.3s ease, background-color 0.3s ease',

    ...theme.fn.hover({
      color: '#CCCCCC',
    }),
  },
  active: {
    color: '#CCCCCC',
  },
  linkMobile: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    transition: 'color 0.3s ease, background-color 0.3s ease',

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },
  mobActive: {
    color: theme.colors.green[6],
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Header = (): JSX.Element => {
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const user = useUser();
  const routes = [
    {
      title: 'Для кого?',
      path: '/',
    },
    {
      title: 'Функции',
      path: '/',
    },
    {
      title: 'Конакты',
      path: '/',
    },
  ];

  const authRoutes = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Расписание',
      path: '/schedule',
    },
    {
      title: 'События',
      path: '/events',
    },
  ];

  const { classes } = useStyles();

  const headerHiddenRoutes = ['/login', '/register'];
  const isHeaderHidden = headerHiddenRoutes.includes(location.pathname);

  const logoutHandler = (): any => {
    storage.clearToken();
    window.location.replace('/');
  };
  return (
    <>
      <MantineHeader
        pos='relative'
        height={70}
        zIndex={999}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#28B670',
          outline: 'none',
          boxShadow: 'none',
          border: 0,
          pt: 20,
        }}
        display={isHeaderHidden ? 'none' : 'block'}
      >
        <Container maw='70rem' h='100%'>
          <Group position='apart' sx={{ height: '100%' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Title order={3} sx={{ textDecoration: 'none' }} color='white'>
                nis.network
              </Title>
            </Link>

            <Group className={classes.hiddenMobile} sx={{ height: '100%' }} spacing={0}>
              {(user.data ? authRoutes : routes).map(route => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={
                    classes.link + (location.pathname === route.path ? ` ${classes.active}` : '')
                  }
                >
                  {route.title}
                </Link>
              ))}
            </Group>

            {user.data ? (
              <Group className={classes.hiddenMobile}>
                <UnstyledButton component={Link} to='/'>
                  <Group>
                    <Avatar color='green' radius='xl' />
                    {user.data.firstName && (
                      <Text size='sm' weight={500} color='white'>
                        {`${user.data.firstName} ${user.data.lastName}`}
                      </Text>
                    )}
                  </Group>
                </UnstyledButton>
                <Anchor size='xs' color='red' onClick={logoutHandler}>
                  Выйти
                </Anchor>
              </Group>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Button
                  px={30}
                  onClick={openModal}
                  radius='xl'
                  sx={{
                    background:
                      'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 100%)',
                    backdropFilter: 'blur(12.822856903076172px)',
                  }}
                >
                  Подробнее
                </Button>
              </Group>
            )}
            {!user.data && (
              <Button
                px={20}
                onClick={openModal}
                radius='xl'
                className={classes.hiddenDesktop}
                sx={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 100%)',
                  backdropFilter: 'blur(12.822856903076172px)',
                }}
              >
                Подробнее
              </Button>
            )}
            <Burger
              className={classes.hiddenDesktop}
              color='white'
              opened={drawerOpened}
              onClick={toggleDrawer}
            />
          </Group>
        </Container>
      </MantineHeader>
      <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size='100%'
          padding='md'
          title={
            <Title order={3} sx={{ textDecoration: 'none' }} color='white' align='center'>
              nis.network
            </Title>
          }
          zIndex={1000000}
        >
          <Divider my='sm' mx='-md' color='gray.1' />
          <Stack spacing='xs'>
            {(user.data ? authRoutes : routes).map(route => (
              <Link
                key={route.path}
                to={route.path}
                onClick={closeDrawer}
                className={
                  classes.linkMobile +
                  (location.pathname === route.path ? ` ${classes.mobActive}` : '')
                }
              >
                {route.title}
              </Link>
            ))}
            <Divider my='sm' mx='-md' color='gray.1' />
            <Group className={classes.hiddenDesktop}>
              <UnstyledButton component={Link} to='/'>
                <Group>
                  <Avatar color='green' radius='xl' />
                  {user?.data?.firstName && (
                    <Text size='sm' weight={500} color='white'>
                      {`${user?.data?.firstName} ${user.data?.lastName}`}
                    </Text>
                  )}
                </Group>
              </UnstyledButton>
              <Anchor size='xs' color='red' onClick={logoutHandler}>
                Выйти
              </Anchor>
            </Group>
          </Stack>
        </Drawer>
      </MediaQuery>
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={<Title order={4}>У вас есть аккаунт?</Title>}
        zIndex={1000}
      >
        <Group position='right' mt='sm'>
          <Anchor component={Link} to='/register' onClick={closeModal}>
            Нет, зарегистрироваться
          </Anchor>
          <Button component={Link} to='/login' onClick={closeModal}>
            Да
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Header;
