import React from 'react';

import { Group, Title } from '@mantine/core';
import useNews from 'query/news';

import ImageCard from './ImageCard';

const BlogPosts = (): JSX.Element => {
  const news = useNews();

  return (
    <>
      <Title order={3} mb='lg' mt='xl'>
        Актаульные материалы для вас
      </Title>
      <Group position='center' spacing={40}>
        {Array.isArray(news.data) ? (
          news.data
            ?.slice(0, 3)
            .map((blog: any) => (
              <ImageCard
                key={blog.id}
                image={blog.imageUrl}
                title={blog.title}
                author={blog.author}
                link={`/guide/${blog.id}`}
              />
            ))
        ) : (
          <></>
        )}
      </Group>
    </>
  );
};

export default BlogPosts;
