import React from 'react';

import { createStyles, Title, Text, Card, SimpleGrid, Container, rem } from '@mantine/core';
import {IconTrekking, IconRecycle, IconCpu2, IconSchool, IconConfetti, IconHome, IconPhone} from '@tabler/icons-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const mockdata = [
  {
    title: 'Расписание',
    description: 'Это раздел, где каждый студент может увидеть свое индивидуальное расписание. Это расписание формируется на основе выбранных предметов, уровня подготовки и интересов ученика. Система учитывает предпочтения и академические нужды каждого студента, обеспечивая баланс между обучением и личным временем.',
    icon: IconSchool,
    route: '/guide/3',
  },
  {
    title: 'Календарь Мероприятий',
    description: 'календарь помогает студентам и преподавателям оставаться в курсе всех предстоящих событий. Он включает детальную информацию о времени, месте проведения мероприятий и их описания.',
    icon: IconConfetti,
    route: '/guide/1',
  },
  {
    title: 'Виджет',
    description: 'Это удобный инструмент, который позволяет студентам видеть своё актуальное расписание прямо на главном экране смартфона. Основные характеристики',
    icon: IconPhone,
    route: '/guide/3',
  },
];

const useStyles = createStyles(theme => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const SectionCards = (): JSX.Element => {
  const { classes, theme } = useStyles();
  const { ref, inView } = useInView({ threshold: 0.4 });
  const animation = useAnimation();

  const navigate = useNavigate();

  React.useEffect(() => {
    animation.start({ x: '100vw' });
  }, []);

  React.useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: 'spring',
          duration: 1.4,
          bounce: 0.1,
        },
      });
    }
  }, [inView]);

  const features = mockdata.map(feature => (
    <motion.div animate={animation} key={feature.title}>
      <Card
        shadow='md'
        radius='md'
        className={classes.card}
        padding='xl'
        onClick={() => navigate(feature.route)}
        sx={{ cursor: 'pointer', height: '100%' }}
      >
        <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
        <Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
          {feature.title}
        </Text>
        <Text fz='sm' c='dimmed' mt='sm'>
          {feature.description}
        </Text>
      </Card>
    </motion.div>
  ));

  return (
    <Container size='lg' py='xl'>
      <Title order={2} className={classes.title} ta='center' mt='sm'>
        Основные разделы сайта
      </Title>
      <div ref={ref} />
      <SimpleGrid cols={3} spacing='xl' mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
      <div ref={ref} />
    </Container>
  );
};

export default SectionCards;
