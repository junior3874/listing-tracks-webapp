import React from 'react';

import { Container } from './styles';

import GifLoading from '../../assets/loading-buffering.gif';

function Loading() {
  return (
    <Container>
      <img src={GifLoading} alt="loading" />
    </Container>
  );
}

export default Loading;
