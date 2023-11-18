import React, { useEffect, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import {
  Container,
  createStyles,
  Text,
  rem,
  Stack,
  Title,
  Box,
  Drawer,
  Image,
  SimpleGrid,
  Grid,
  useMantineTheme,
  Anchor,
  Flex,
  Tabs,
  Card,
  Button,
  Group,
  Badge,
  Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { Eventcalendar } from '@mobiscroll/react';

import {
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconNumber6,
  IconNumber7,
  IconPhoto,
} from '@tabler/icons-react';

import { useUser } from '../../../query/auth';
import useClassrooms from '../../../query/schedule';
import ImageCard from '../../shared/ImageCard';

const data = [
  {
    image: 'https://ixbt.online/live/images/original/04/96/13/2022/06/16/235fcb6c53.jpg',
    title: 'Солнечные панели в Астане',
    author: '-20%',
  },
  {
    image: 'https://tengrinews.kz/userdata/news/2017/news_311291/thumb_m/photo_206689.jpg',
    title: 'Tesla Model X',
    author: '-30%',
  },
  {
    image: 'https://i.imgur.com/dTBcOHf.png',
    title: 'Ветрегенератор',
    author: '-25%',
  },
  {
    image: 'https://i.imgur.com/0jLY6HY.png',
    title: 'Бесперебойник',
    author: '-40%',
  },
];

const mockEvents = [
  {
    id: 1,
    color: '#FFC107',
    start: '2023-04-05T09:00:00+0000',
    end: '2023-04-05T11:00:00+0000',
    title: 'Скидка на солнечную панель',
    allday: false,
    description: 'Новый продукт, продается в магазине Alser',
    image: 'https://ixbt.online/live/images/original/04/96/13/2022/06/16/235fcb6c53.jpg',
  },
  {
    id: 2,
    color: 'rgba(202,23,107,0.88)',
    start: '2023-04-10T09:00:00+0000',
    end: '2023-04-12T11:00:00+0000',
    title: 'Скидка на ветряк',
    allday: false,
    description: 'Новый продукт, продается в магазине OlX с 10 по 12 апреля',
    image: 'https://images.satu.kz/96722424_vetrogenerator-600vt-24v-kitaj.jpg',
  },
];
const useStyles = createStyles(theme => ({
  calendar: {
    margin: '0 auto',
    width: '100%',
    '& button': {
      color: `green !important`,
    },
  },
  stack: {
    margin: '0 auto',
    maxWidth: '60rem',
  },
}));
interface ActivityEvent {
  id?: number;
  title: string;
  start: string;
  end: string;
  allday: boolean;
  description: string;
  color: string;
  image: string;
}

const PRIMARY_COL_HEIGHT = rem(300);
const lessonsSchedule = [
  { start: '8:30', end: '9:10', lesson: 'Lesson 1' },
  { start: '9:30', end: '10:10', lesson: 'Lesson 2' },
  { start: '10:15', end: '10:55', lesson: 'Lesson 3' },
  { start: '11:00', end: '11:40', lesson: 'Lesson 4' },
  { start: '11:50', end: '12:30', lesson: 'Lesson 5' },
  { start: '13:00', end: '13:40', lesson: 'Lesson 6' },
  { start: '13:50', end: '14:30', lesson: 'Lesson 7' },
  { start: '14:35', end: '15:15', lesson: 'Lesson 8' },
];

const ScheduleCards = ({ classes, user }: { classes: any[]; user: any }): JSX.Element => {
  const sortedClasses = classes.sort((a, b) => a.classOrder - b.classOrder);
  const filteredClasses = sortedClasses.filter(
    c => c.grade === user.grade && c.gradeLetter === user.gradeLetter,
  );

  return (
    <Stack mt='xl'>
      {filteredClasses.map(
        ({
          subject,
          teacherName,
          weekDay,
          groupNumber,
          classroom,
          classOrder,
          grade,
          gradeLetter,
        }) => (
          <Group position='center'>
            <Card
              shadow='sm'
              radius='md'
              withBorder
              w='10%'
              padding={0}
              h='100px'
            >
              <Group align='center' position='center' h='100%'>
                <Title order={3}>{classOrder}</Title>
              </Group>
            </Card>
            <Card
              shadow='sm'
              padding='lg'
              radius='md'
              withBorder
              w='70%'
              h='100px'
            >
              <Group position='apart' mt='xs' mb='xs'>
                <Text fw={500}>{subject}</Text>
                <Badge color='lime' variant='light'>
                  {classroom} кабинет
                </Badge>
              </Group>
              <Group position='apart' mt='xs' mb='xs'>
                <Text size='sm' c='dimmed'>
                  {teacherName}
                </Text>
                <Text>{groupNumber}</Text>
              </Group>
            </Card>
          </Group>
        ),
      )}
    </Stack>
  );
};

const Products = (): JSX.Element => {
  const { classes } = useStyles();
  const user = useUser();
  const { data: userData } = user;
  const [weekDay, setWeekDay] = useState<number>(0);
  const [groupNumber, setGroupNumber] = useState(userData?.group);
  const [gradeLetter, setGradeLetter] = useState(userData?.grade_letter);
  const [grade, setGrade] = useState(userData?.grade);

  const iconStyle = { width: rem(12), height: rem(12) };

  const queryParams = {
    group_number: groupNumber,
    grade_letter: gradeLetter,
    grade,
    week_day: weekDay,
  };
  const handleTabChange = (value: string) => {
    setWeekDay(Number(value));
  };

  const { data: classrooms, isLoading, error } = useClassrooms(queryParams);
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  const [currentLesson, setCurrentLesson] = useState<string>('На данный момент нет уроков');

  const checkCurrentLesson = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const current = lessonsSchedule.find(({ start, end }) => {
      const startTime = parseInt(start.split(':')[0], 10) * 60 + parseInt(start.split(':')[1], 10);
      const endTime = parseInt(end.split(':')[0], 10) * 60 + parseInt(end.split(':')[1], 10);
      return currentTime >= startTime && currentTime <= endTime;
    });

    setCurrentLesson(current ? current.lesson : 'На данный момент нет уроков');
  };

  useEffect(() => {
    checkCurrentLesson();
    const interval = setInterval(checkCurrentLesson, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay() + 1 - 3;
    setWeekDay(currentDay);
  }, []);

  useEffect(() => {
    setGroupNumber(userData?.group);
    setGradeLetter(userData?.grade_letter);
    setGrade(userData?.grade);
  }, [userData]);
  return (
    <>
      <Container maw='80rem' pt={30}>
        <Stack spacing={30} className={classes.stack}>
          <SimpleGrid cols={2} spacing='md' breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Flex
              w='100%'
              h='100%'
              justify='center'
              align='center'
              sx={{
                border: '2px solid #ccc',
                borderRadius: '10px',
              }}
            >
              <Text size={20} align='center'>
                Урок по счету?: <br /> <strong>{currentLesson}</strong>
              </Text>
            </Flex>
            <Grid gutter='md'>
              <Grid.Col span={6}>
                <ImageCard
                  image={data[2].image}
                  title=''
                  author=''
                  height={SECONDARY_COL_HEIGHT}
                  width='100%'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <ImageCard
                  image={data[3].image}
                  title=''
                  author=''
                  height={SECONDARY_COL_HEIGHT}
                  width='100%'
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
          <Box w='100%'>
            <Title order={3}>Привет👋🏻, {user?.data?.firstName}</Title>
          </Box>
          <Center w='100%'>
            <Tabs
              defaultValue={weekDay.toString()}
              value={weekDay.toString()}
              onTabChange={handleTabChange}
              variant='pills'
              mx='auto'
            >
              <Tabs.List>
                <Tabs.Tab value='1' icon={<IconNumber1 style={iconStyle} />}>
                  Понедельник
                </Tabs.Tab>
                <Tabs.Tab value='2' icon={<IconNumber2 style={iconStyle} />}>
                  Вторник
                </Tabs.Tab>
                <Tabs.Tab value='3' icon={<IconNumber3 style={iconStyle} />}>
                  Среда
                </Tabs.Tab>
                <Tabs.Tab value='4' icon={<IconNumber4 style={iconStyle} />}>
                  Четверг
                </Tabs.Tab>
                <Tabs.Tab value='5' icon={<IconNumber5 style={iconStyle} />}>
                  Пятница
                </Tabs.Tab>
                <Tabs.Tab value='6' icon={<IconNumber6 style={iconStyle} />}>
                  Суббота
                </Tabs.Tab>
                <Tabs.Tab value='7' icon={<IconNumber7 style={iconStyle} />}>
                  Воскресенье
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value='1'>
                {classrooms && userData && Array.isArray(classrooms) && (
                  <ScheduleCards classes={classrooms} user={userData} />
                )}
              </Tabs.Panel>

              <Tabs.Panel value='2'>
                {classrooms && userData && Array.isArray(classrooms) && (
                  <ScheduleCards classes={classrooms} user={userData} />
                )}
              </Tabs.Panel>

              <Tabs.Panel value='3'>
                {classrooms && userData && Array.isArray(classrooms) && (
                  <ScheduleCards classes={classrooms} user={userData} />
                )}
              </Tabs.Panel>
              <Tabs.Panel value='4'>
                {classrooms && userData && Array.isArray(classrooms) && (
                  <ScheduleCards classes={classrooms} user={userData} />
                )}
              </Tabs.Panel>
              <Tabs.Panel value='5'>
                {classrooms && userData && Array.isArray(classrooms) && (
                  <ScheduleCards classes={classrooms} user={userData} />
                )}
              </Tabs.Panel>

              <Tabs.Panel value='6'>
                <Title align='center' mt='xl'>
                  Вы прошли эту неделю! Ждите следующей незабываемой недели!
                </Title>
              </Tabs.Panel>
              <Tabs.Panel value='7'>
                <Title align='center' mt='xl'>
                  Вы прошли эту неделю! Ждите следующей незабываемой недели!
                </Title>
              </Tabs.Panel>
            </Tabs>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default Products;
