import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import Header from '../../components/Header';
import Music from '../../components/Music';
import TrackList from '../../components/TrackList';
import {
  getMoreMusic,
  getTopMusics,
  searchMusic,
} from '../../store/axiosActions';

import Track from '../../entities/track';
import { getListMusics } from '../../store/ducks/listMusics/listMusicsSelector';
import InputSearch from '../../components/InputSearch';
import { removeListMusics } from '../../store/ducks/listMusics';

function Home() {
  const musicList = useSelector(getListMusics);

  const dispatch = useDispatch();
  -useEffect(() => {
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
          {musicList.data?.map((track, index) => {
            const trackEntity = new Track(track);
            return (
              <Music
                albumImage={trackEntity.albumImage}
                artistName={trackEntity.artistName}
                duration={trackEntity.duration}
                key={index}
                id={trackEntity.id}
                link={trackEntity.link}
                preview={trackEntity.preview}
                title={trackEntity.title}
              />
            );
          })}
        </TrackList>
      </Container>
    </>
  );
}

export default Home;
