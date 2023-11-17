import React, { useState } from 'react';

import { Container } from '@mantine/core';

import ArticlesCards from './modules/ArticleCards';

const News = (): JSX.Element => {
  return (
    <Container maw='70rem'>
      <ArticlesCards />
    </Container>
  );
};

export default News;
