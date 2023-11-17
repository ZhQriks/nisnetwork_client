import React from 'react';

import { createStyles, SimpleGrid, Card, Image, Text, AspectRatio, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import useNews from 'query/news';

const useStyles = createStyles(theme => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

const ArticlesCards = (): JSX.Element => {
  const { classes } = useStyles();
  const news = useNews();

  const cards = Array.isArray(news.data) ? (
    news.data.map((article, index) => (
      <motion.div
        key={article.title}
        initial={{ x: index % 2 === 0 ? '-100vw' : '100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.1 }}
      >
        <Card
          p='md'
          radius='md'
          component='a'
          href={`/guide/${article.id}`}
          className={classes.card}
        >
          <AspectRatio ratio={1920 / 1080}>
            <Image src={article.imageUrl} />
          </AspectRatio>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700} mt='md'>
            {article.author}
          </Text>
          <Text className={classes.title} mt={5}>
            {article.title}
          </Text>
        </Card>
      </motion.div>
    ))
  ) : (
    <></>
  );

  return (
    <>
      <Title mt='xl' order={3} mb='lg'>
        Статьи, руководства и советы
      </Title>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </>
  );
};

export default ArticlesCards;
