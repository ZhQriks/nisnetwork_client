import React from 'react';

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
  Modal,
  TextInput,
  Textarea,
  ColorPicker,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
// import { Eventcalendar, toast } from '@mobiscroll/react';
import { format } from 'date-fns';

import useEvents from 'query/events';
import { Carousel } from '@mantine/carousel';

import useCreateEvent from '../../../query/eventCreate';
import ImageCard from '../../shared/ImageCard';

const data = [
  {
    image:
      'https://recycle.kz/storage/app/uploads/public/61c/9bb/9a8/thumb_668_436_287_0_0_crop.jpg',
    title: 'В Нур-Султане подвели итоги экологической акции «ЭкоАсар: марафон добрых дел»',
  },
  {
    image:
      'https://recycle.kz/storage/app/uploads/public/61c/5bc/b9b/thumb_664_436_287_0_0_crop.jpg',
    title: 'В столице провели мастер-класс по утилизации отходов',
  },
  {
    image:
      'https://recycle.kz/storage/app/uploads/public/61c/2fe/9a5/thumb_661_436_287_0_0_crop.jpg',
    title:
      'Подведены итоги детского конкурса на лучшее озвучивание эко-сказки «Приключения Гринэйков»!',
  },
  {
    image:
      'https://recycle.kz/storage/app/uploads/public/61b/6cc/7d8/thumb_567_436_287_0_0_crop.jpg',
    title: 'Подведены итоги первой в Казахстане экологической премии',
  },
  {
    image:
      'https://recycle.kz/storage/app/uploads/public/61a/1c6/861/thumb_442_436_287_0_0_crop.jpg',
    title: 'Мастеркласс по утилизацие мусора',
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
              Календарь мероприятий и событий{' '}
              <Text component='span' color='primaryGreen'>
                (Нажмите для участия)
              </Text>
            </Title>
            <Text mb='md' size='sm'>
              Календарь может содержать информацию о различных экологических мероприятиях, событиях
              и
              <br />
              праздниках, которые проходят по всему миру. Нажмите для показа
            </Text>
            <Group my='sm' position='right'>
              <Button onClick={openModal}>Создать эко-мероприятие</Button>
            </Group>
          </Box>
        </Stack>
      </Container>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <Title order={3} color='primaryGreen'>
            Участие на мероприятии
          </Title>
        }
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position='right'
        zIndex={1001}
        size='lg'
      >
        {currentEvent && (
          <>
            <Title order={4} mb='sm'>
              {currentEvent.title}
            </Title>
            <Text>
              <Text component='span' fw={600}>
                Дата начала:
              </Text>{' '}
              {format(Date.parse(currentEvent.start), 'do MMMM Y')}
            </Text>
            <Text mb='sm'>
              <Text component='span' fw={600}>
                Дата окончания:
              </Text>{' '}
              {format(Date.parse(currentEvent?.end), 'do MMMM Y')}
            </Text>
            <Text fw={600}>Описание:</Text>
            <Text>{currentEvent.description}</Text>
            <Group position='right' mt='md'>
              <Button
                onClick={() => {
                  closeDrawer();
                }}
              >
                Участвовать!
              </Button>
            </Group>
          </>
        )}
      </Drawer>
      <Modal opened={modalOpened} onClose={closeModal} title='Event' centered size='lg'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label='Название'
              placeholder='Мероприятие'
              {...form.getInputProps('title')}
              radius='md'
            />
            <DateInput
              required
              label='Дата начала'
              placeholder='Дата'
              {...form.getInputProps('start')}
              radius='md'
            />
            <DateInput
              required
              label='Дата окончания'
              placeholder='Дата'
              {...form.getInputProps('end')}
              radius='md'
            />
            <Textarea
              required
              label='Описание'
              placeholder='Ход мероприятия'
              {...form.getInputProps('description')}
            />
            <Box>
              <Text>Цвет мероприятия: </Text>
              <ColorPicker {...form.getInputProps('color')} />
            </Box>
            <Group position='right'>
              <Button type='submit'>Создать</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default EventCalendar;
