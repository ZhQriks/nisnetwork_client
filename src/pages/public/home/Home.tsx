import React from 'react';

import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  useMantineTheme,
  Group,
  Divider,
  Button,
} from '@mantine/core';
import { motion } from 'framer-motion';
import BlogPosts from 'pages/shared/BlogPosts';
import ContactUs from 'pages/shared/ContactUs';
import SectionCards from 'pages/shared/SectionCards';
import SocialNetworks from 'pages/shared/SocialNetworks';
import {useNavigate} from "react-router-dom";

const Home = (): JSX.Element => {
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div
          style={{
            width: '100%',
            height: '85vh',
            backgroundImage: `url('https://i.imgur.com/750wzHh.png')`,
          }}
        >
          <Container maw='70rem' pt={60}>
            <Title color='white' size={44} mb='xs' align='center'>
              Твой день – наш плейлист
            </Title>
            <Text color='white' size='lg' align='center'>
              Следи за своим расписанием, словно за захватывающим фильмом, где каждый урок – это
              новая страница в твоей истории
            </Text>
            <Group align='center' pt='20px'>
              <Button
                px={30}
                size='xl'
                radius='xl'
                mx='auto'
                sx={{
                  border: '2px solid white',
                  color: 'white',
                  backdropFilter: 'blur(12.822856903076172px)',
                }}
                onClick={() => navigate('/register')}
              >
                Использовать
              </Button>
            </Group>
          </Container>
        </div>
      </div>
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <Container maw='70rem'>
          <Stack mt='lg' spacing={50}>
            <SectionCards />
            <ContactUs />
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default Home;
