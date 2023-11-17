import React from 'react';

import {createStyles, Anchor, Group, ActionIcon, rem, Image, Title} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import image from 'assets/logo/eco_logo.png';

const Footer = (): JSX.Element => {
  const useStyles = createStyles(theme => ({
    footer: {
      marginTop: 50,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    },

    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${theme.spacing.md} ${theme.spacing.md}`,

      [theme.fn.smallerThan('sm')]: {
        flexDirection: 'column',
      },
    },

    links: {
      [theme.fn.smallerThan('sm')]: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
      },
    },
  }));

  const links = [
    { link: '#', label: 'Главная' },
    { link: '#', label: 'О нас' },
    { link: '#', label: 'Связатся' },
    { link: '#', label: 'Политика конфиденциальности' },
  ];
  const { classes } = useStyles();

  const items = links.map(link => (
    <Anchor<'a'>
      color='dimmed'
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={event => event.preventDefault()}
      size='sm'
    >
      {link.label}
    </Anchor>
  ));
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Title order={3} sx={{ textDecoration: 'none' }} color='primaryGreen'>
          nis.network
        </Title>

        <Group className={classes.links}>{items}</Group>

        <Group spacing='xs' position='right' noWrap>
          <ActionIcon size='lg' variant='default' radius='xl'>
            <IconBrandTwitter size='1.05rem' stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg' variant='default' radius='xl'>
            <IconBrandYoutube size='1.05rem' stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg' variant='default' radius='xl'>
            <IconBrandInstagram size='1.05rem' stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
};

export default Footer;
