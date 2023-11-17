import React from 'react';

import { Container, Group, Paper, Title, Text, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import useNews from 'query/news';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

const NewsDetails = (): JSX.Element => {
  const { guideId } = useParams();

  const news = useNews(+guideId! || 0);

  return (
    <Container maw='70rem' mt={40}>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 300 }}
        transition={{ type: 'spring', duration: 2 }}
      >
        <Paper radius='md' p='xl' withBorder>
          {news.data && (
            <>
              <Group position='center'>
                <Badge size='xl' mx='auto'>
                  {news.data?.title}
                </Badge>
              </Group>
              <Text color='dimmed' align='center' mb='lg'>
                Автор - {news.data?.author}
              </Text>

              <ReactMarkdown>{news.data?.content}</ReactMarkdown>
            </>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default NewsDetails;
