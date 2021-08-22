import React from 'react';

import { Container } from './styles';

function BtnPlayMusic({ linkToMusic }: { linkToMusic: string }) {
  return (
    <Container>
      <a target="_blank" href={linkToMusic} rel="noreferrer">
        Ouvir música no deezer
      </a>
    </Container>
  );
}

export default BtnPlayMusic;
