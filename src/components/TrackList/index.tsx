import React from 'react';
import { Container, BtnReadMore } from './styles';

type TrackListProps = {
  children: React.ReactChild;
  command: () => void;
};

function TrackList({ children, command }: TrackListProps) {
  return (
    <Container>
      <div>{children}</div>

      <BtnReadMore type="button" onClick={() => command()}>
        veja mais músicas
      </BtnReadMore>
    </Container>
  );
}

export default TrackList;
