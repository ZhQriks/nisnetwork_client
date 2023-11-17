import React from 'react';

import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';

const useStyles = createStyles(theme => ({
  wrapper: {
    marginTop: 20,
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,

    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

const ContactUs = () => {
  const { classes } = useStyles();

  const icons = social.map((Icon, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ActionIcon key={index} size={28} className={classes.social} variant='transparent'>
      <Icon size='1.4rem' stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          <Title className={classes.title}>Свяжитесь с нами!</Title>
          <Text className={classes.description} mt='sm' mb={30}>
            Отправьте нам письмо и мы свяжемся с вами в течений 24 часов
          </Text>

          <Group mt='xl'>{icons}</Group>
        </div>
        <div className={classes.form}>
          <TextInput
            label='Почта'
            placeholder='your@email.com'
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label='Имя'
            placeholder='Жанибек'
            mt='md'
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label='Ваше сообщение'
            placeholder='Сообщение'
            minRows={4}
            mt='md'
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group position='right' mt='md'>
            <Button className={classes.control}>Отправить</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default ContactUs;
