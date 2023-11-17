import React from 'react';

import { Box, Group, Paper, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconMail,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandFacebook,
} from '@tabler/icons-react';

const SocialNetworks = (): JSX.Element => {
  const smallScreen = useMediaQuery('(max-width: 40em)');

  const socialNetworks = [
    { id: 1, icon: <IconBrandInstagram size={smallScreen ? 30 : 50} color='green' /> },
    { id: 2, icon: <IconBrandYoutube size={smallScreen ? 30 : 50} color='green' /> },
    { id: 3, icon: <IconBrandFacebook size={smallScreen ? 30 : 50} color='green' /> },
  ];
  return (
    <Paper radius='md' p='xl' withBorder>
      <Group p='xl' position='apart'>
        <Group>
          <IconMail color='green' />
          <Title order={smallScreen ? 4 : 3}>dauletjarasar@gmail.com</Title>
        </Group>
        <Group>
          {socialNetworks.map(icon => (
            <Paper
              radius='50%'
              px={smallScreen ? 'md' : 'xl'}
              py={smallScreen ? 'sm' : 'lg'}
              withBorder
              sx={{ cursor: 'pointer' }}
              key={icon.id}
            >
              {icon.icon}
            </Paper>
          ))}
        </Group>
      </Group>
    </Paper>
  );
};

export default SocialNetworks;
