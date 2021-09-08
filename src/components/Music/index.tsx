import React, { memo, useRef, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from './styles';

import BtnAddToFavorit from '../btnAddToFavorit';

import ClockIcon from '../../assets/clock.svg';
import BtnPlayIcon from '../../assets/btn-play.svg';
import GifEqualizerIcon from '../../assets/equalizer.gif';

import {
  addToFavorit,
  removeMusicInFavorits,
} from '../../store/favoritList/index';
import Track from '../../entities/track';
import { PlayerContext } from '../player';
import { useEffect } from 'react';

function Music(track: Track) {
  const currentTrack = new Audio(track.preview);

  const { playingMusic, _setPlayingMusic } = useContext(PlayerContext);

  const dispatch = useDispatch();

  const convertedSecondsForMinutes = new Date(track.duration * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':')
    .slice(-2)
    .join(':')
    .concat('m');

  const AddOrRemoveTrackFromFavorits = (typeBtn: boolean) => {
    if (typeBtn) return dispatch(removeMusicInFavorits(track.id));
    return dispatch(addToFavorit(track));
  };

  const handlerSetPlayingMusic = () =>
    _setPlayingMusic({
      currentAudio: currentTrack,
      currentAudioInformations: track,
    });

  const verifyTrackHasPlaying =
    playingMusic.currentAudioInformations === track && !playingMusic.paused;

  return (
    <Container>
      <div className="content-left">
        <div className="track-image">
          <img src={track.albumImage} alt="track" />

          <button>
            <img
              alt="play or pause music"
              onClick={handlerSetPlayingMusic}
              src={verifyTrackHasPlaying ? GifEqualizerIcon : BtnPlayIcon}
            />
          </button>
        </div>
        <div className="track-informations">
          <h1>{track.title}</h1>
          <h2>{track.artistName}</h2>

          <span>
            <img src={ClockIcon} alt="" />
            <p>{convertedSecondsForMinutes}</p>
          </span>
          <button>
            <a target="_blank" href={track.link} rel="noreferrer">
              Ouvir música no deezer
            </a>
          </button>
        </div>
      </div>

      <BtnAddToFavorit
        trackId={track.id}
        onClick={AddOrRemoveTrackFromFavorits}
      />
    </Container>
  );
}

export default Music;
