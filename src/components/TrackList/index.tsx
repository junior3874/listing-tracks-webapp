import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Track, { TrackPropsDTO } from '../../entities/track';
import Loading from '../loading';
import { Container } from './styles';

type Selector = {
  data: Array<any>;
  error?: boolean;
};

type TrackListProps = {
  children: React.ReactChild;
  command: () => boolean;
  data: TrackPropsDTO[] | Track[];
  error?: boolean;
};

function TrackList({ children, command }: TrackListProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!loading) {
          setLoading(true);
          const res = command();
          if (!res) setLoading(false);
          return;
        }
        return;
      }
    });

    intersectionObserver.observe(document.getElementById('pink')!);

    return () => {
      intersectionObserver.disconnect();
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      <div>{children}</div>
      {loading ? <Loading /> : null}
      <div id="pink"></div>
    </Container>
  );
}

export default TrackList;
