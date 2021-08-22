import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';

import Header from '../../components/Header';
import Music from '../../components/Music';
import TrackList from '../../components/TrackList';

import {
  getFavoritList,
  searchFavoritList,
} from '../../store/ducks/favoritList/favoritListSelectors';
import { getMoreFavoritList, resetPages } from '../../store/ducks/favoritList';
import InputSearch from '../../components/InputSearch';
import { RootState } from '../../store';
import { useEffect } from 'react';

function Favorits() {
  const [searchMode, setSearchMode] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const favoritMusic = useSelector(
    searchMode
      ? (state: RootState) => searchFavoritList(state, searchParams)
      : getFavoritList,
  );

  const dispatch = useDispatch();

  const moreFavoritMusic = () => {
    dispatch(getMoreFavoritList({}));
  };
  const handleFormAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getValueElement = (
      (e.target as HTMLFormElement).elements[0] as HTMLInputElement
    ).value.toString();
    if (getValueElement === '') {
      return setSearchMode(false);
    }
    setSearchParams(getValueElement);
    setSearchMode(true);
  };

  useEffect(() => {
    return dispatch(resetPages({}) as unknown as undefined);
  }, []);

  return (
    <>
      <Header>
        <form onSubmit={e => handleFormAction(e)}>
          <InputSearch placeholder="Faça uma busca" />
        </form>
      </Header>
      <Container>
        <TrackList command={() => moreFavoritMusic()}>
          {favoritMusic?.map(track => (
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
          ))}
        </TrackList>
      </Container>
    </>
  );
}

export default Favorits;