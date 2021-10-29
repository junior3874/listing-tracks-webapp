import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';

import Header from '../../components/Header';
import Music from '../../components/Music';
import TrackList from '../../components/TrackList';

import {
  getFavoritList,
  searchFavoritList,
} from '../../store/favoritList/favoritListSelectors';

import InputSearch from '../../components/InputSearch';
import { RootState } from '../../store';

function Favorits() {
  //===================================================
  // States
  //===================================================

  const [searchMode, setSearchMode] = useState(false);
  const [searchParams, setSearchParams] = useState('');

  //===================================================
  // Refs
  //===================================================

  const inputSearchRef = useRef<HTMLInputElement>(null);

  //================================================================
  // Contexts
  //================================================================

  const favoritMusic = useSelector(
    searchMode
      ? (state: RootState) => searchFavoritList(state, searchParams)
      : getFavoritList,
  );

  // =====================================================
  // Handlers
  // =====================================================

  const handleFormAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputSearchValue = inputSearchRef.current?.value;
    if (inputSearchValue === '') {
      return setSearchMode(false);
    }

    setSearchParams(inputSearchValue!);
    setSearchMode(true);
  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={e => handleFormAction(e)}>
          <InputSearch placeholder="Faça uma busca" inputRef={inputSearchRef} />
        </form>

        <main>
          <TrackList data={favoritMusic}>
            {favoritMusic.map(track => (
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
        </main>
      </Container>
    </>
  );
}

export default Favorits;
