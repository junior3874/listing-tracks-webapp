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
import PlayerProvider from '../../components/player';

import CloseIcon from '../../assets/close-icon.png';
function Favorits() {
  //===================================================
  // States
  //===================================================

  //===================================================
  // Refs
  //===================================================

  const inputSearchRef = useRef<HTMLInputElement>(null);

  //================================================================
  // Contexts
  //================================================================

  const favoritMusic = useSelector(getFavoritList);

  return (
    <>
      <Header />
      <Container>
        <main>
          <PlayerProvider>
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
          </PlayerProvider>
        </main>
      </Container>
    </>
  );
}

export default Favorits;
