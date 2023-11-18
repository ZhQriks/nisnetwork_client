import React from 'react';

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
  Button,
  Group,
  Image,
  TextInput,
  Textarea,
  ColorPicker,
  Card,
  Badge,
  SimpleGrid,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
// import { Eventcalendar, toast } from '@mobiscroll/react';
import { format } from 'date-fns';
import useEvents from 'query/events';

import useCreateEvent from '../../../query/eventCreate';
import ImageCard from '../../shared/ImageCard';

const data = [
  {
    image: 'https://i.imgur.com/4PaqJ4s.png',
    title: '.',
  },
  {
    image: 'https://i.imgur.com/t84S0Rx.png',
    title: '.',
  },
  {
    image: 'https://i.imgur.com/2fyFK2H.png',
    title: '.',
  },
];

const eventsDataMock = [
  {
    title: 'Офис по управлению набором студентов Назарбаев Университета приглашает Вас',
    description:
      '13 ноября в 16:00 (по времени Астаны)* - “Как заполнить анкетную форму”. Во время вебинара Вы узнаете, как правильно заполнить анкету для программ Бакалавриата и Foundation.',
    image: 'https://i.imgur.com/tBJM4G8.jpg',
    time: '13 ноября, 16:00',
  },
  {
    title: 'Добрый день! 15 ноября приглашаем на встречу с представителем UBC',
    description:
      'Университет Британской Колумбии — один из ведущих исследовательских университетов Канады. Место проведения📍: конференц-зал. Время: 🕒15:00. Регистрация обязательна ',
    image: 'https://i.imgur.com/9ErXJcW.jpg',
    time: '15 ноября, 15:00',
  },
  {
    title: 'ВЕБИНАР: Образование в Южной Корее',
    description:
      'Присоединяйтесь к нам на вебинар, где мы расскажем о возможностях обучения в Южной Корее!\n' +
      '📅 16 ноября, в 20:00\n',
    image: 'https://i.imgur.com/0QujRKb.jpg',
    time: '16 ноября, 20:00',
  },
  {
    title: 'Приглашаем на встречу с представителями Kорейского университета Woosong University',
    description:
      'Место проведения: Актовый зал. Время: 17 ноября в 15:00*. Престижный университет Woosong University, расположенный в Южной Корее городе Тэджон и принадлежащий известному образовательному фонду Woosong',
    image: 'https://i.imgur.com/S2bNTvs.jpg',
    time: '17 ноября, 15:00',
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
}
const EventCalendar = (): JSX.Element => {
  const { classes } = useStyles();
  const events = useEvents();
  const createEvent = useCreateEvent();
  const [currentEvent, setCurrentEvents] = React.useState<ActivityEvent>();

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const onEventClick = React.useCallback((event: any) => {
    setCurrentEvents(event.event);
    openDrawer();
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);

  const form = useForm({
    initialValues: {
      title: '',
      start: '',
      end: '',
      allday: false,
      description: '',
      color: '',
    },
  });

  const handleSubmit = (formData: any): void => {
    const activityData: ActivityEvent = {
      title: formData.title,
      start: formData.start.toISOString(),
      end: formData.end.toISOString(),
      allday: false,
      description: formData.description,
      color: formData.color,
    };
    createEvent.mutate(activityData, {
      onSuccess: (res: any) => {
        closeModal();
      },
    });
  };
  return (
    <>
      <Container maw='80rem' pt={30}>
        <Stack spacing={30} className={classes.stack}>
          <Carousel
            slideSize='50%'
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
            slideGap='xl'
            align='start'
            slidesToScroll={1}
          >
            {data.map(item => (
              <Carousel.Slide key={item.title} maw='70rem'>
                <ImageCard image={item.image} title={item.title} width='100%' height={200} />
              </Carousel.Slide>
            ))}
          </Carousel>
          <Box>
            <Title order={3}>
              Календарь{' '}
              <Text component='span' color='primaryGreen'>
                мероприятий и событий
              </Text>
            </Title>
            <Text mb='md' size='sm'>
              Календарь может содержать информацию о различных мероприятиях, событиях и
              <br />
              праздниках, которые проходят по нашей школе. Нажмите для показа
            </Text>
          </Box>
          <SimpleGrid
            cols={2}
            spacing='lg'
            breakpoints={[
              { maxWidth: 'md', cols: 3, spacing: 'md' },
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            {eventsDataMock.map((event: any) => (
              <Card shadow='sm' padding='lg' radius='md' withBorder maw={400} mx='auto'>
                <Card.Section>
                  <Image src={event.image} height={250} alt='Norway' />
                </Card.Section>

                <Group position='apart' mt='md' mb='xs'>
                  <Text fw={500}>{event.title}</Text>
                  <Badge color='green' variant='light'>
                    {event.time}
                  </Badge>
                </Group>

                <Text size='sm' c='dimmed'>
                  {event.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
};

export default EventCalendar;
