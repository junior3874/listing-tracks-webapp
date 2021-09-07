import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Music from '../../components/Music';
import TrackList from '../../components/TrackList';
import InputSearch from '../../components/InputSearch';

import { getMoreMusic, getTopMusics, searchMusic } from '../../store/apiThunks';

import { getListMusics } from '../../store/listMusics/listMusicsSelector';

import { removeListMusics } from '../../store/listMusics';

import { Container } from './styles';

import Track from '../../entities/track';

function Home() {
  const musicList = useSelector(getListMusics);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopMusics());
    return () => dispatch(removeListMusics() as unknown as undefined);
  }, []);

  const moreMusic = () => {
    musicList.url
      ? dispatch(getMoreMusic(musicList.page, musicList.url))
      : dispatch(getMoreMusic(musicList.page));
  };

  const handleFormAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getValueElement = (
      (e.target as HTMLFormElement).elements[0] as HTMLInputElement
    ).value.toString();
    if (getValueElement === '') return;
    dispatch(searchMusic(getValueElement!));
  };

  return (
    <>
      <Header>
        <form onSubmit={e => handleFormAction(e)}>
          <InputSearch placeholder="Faça uma busca" />
        </form>
      </Header>
      <Container>
        <TrackList command={() => moreMusic()}>
          {musicList.data.map(trackProps => {
            const track = new Track(trackProps);
            return (
              <Music
                albumImage={track.albumImage}
                artistName={track.artistName}
                duration={track.duration}
                key={track.id}
                id={track.id}
                link={track.link}
                preview={track.preview}
                title={track.title}
              />
            );
          })}
        </TrackList>
      </Container>
    </>
  );
}

export default Home;
