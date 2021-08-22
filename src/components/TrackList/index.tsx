import React from 'react';
import { Container, BtnReadMore } from './styles';

type TrackListProps = {
  children: React.ReactChild[];
  command: () => void;
};

function TrackList({ children, command }: TrackListProps) {
  const existMoreItems = children.length >= 9;
  return (
    <Container>
      <div>{children}</div>
      {existMoreItems && (
        <BtnReadMore type="button" onClick={() => command()}>
          veja mais músicas
        </BtnReadMore>
      )}
    </Container>
  );
}

export default TrackList;
