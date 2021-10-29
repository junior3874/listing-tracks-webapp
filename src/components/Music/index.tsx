import React, { memo, useRef, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container, SvgCircularProgressBardWrapper } from './styles';

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

function Music(track: Track) {
  const [trackHasPlaying, setTrackHasPlaying] = useState(false);
  const { playingMusic, _setPlayingMusic, currentTrack } =
    useContext(PlayerContext);

  const [currentTrackTimestamp, setCurrentTrackTimeStamp] = useState(0);
  const dispatch = useDispatch();

  const convertedSecondsForMinutes = new Date(track.duration * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':')
    .slice(-2)
    .join(':')
    .concat('m');

  //=================================================================
  // handlers
  //=================================================================

  const AddOrRemoveTrackFromFavorits = (typeBtn: boolean) => {
    if (typeBtn) return dispatch(removeMusicInFavorits(track));
    return dispatch(addToFavorit(track));
  };

  const handlerSetPlayingMusic = () => {
    _setPlayingMusic({
      currentAudioInformations: track,
    });
  };

  useEffect(() => {
    (() => {
      if (
        playingMusic.currentAudioInformations?.id === track.id &&
        !playingMusic.paused
      ) {
        setTrackHasPlaying(true);
        return;
      }
      setTrackHasPlaying(false);
    })();
    if (playingMusic.currentAudioInformations?.id === track.id) {
      currentTrack!.ontimeupdate = (e: any) => {
        setCurrentTrackTimeStamp(e.target.currentTime);
      };

      currentTrack!.onended = () => setCurrentTrackTimeStamp(0);
    }

    return () => {
      currentTrack?.removeEventListener('timeupdate', () => (e: any) => {
        setCurrentTrackTimeStamp(e.target.currentTime);
      });
      currentTrack?.removeEventListener('ended', () =>
        setCurrentTrackTimeStamp(0),
      );
      setCurrentTrackTimeStamp(0);
    };
  }, [playingMusic]);

  useEffect(() => {
    const getCurrentTimeStamp =
      playingMusic.currentAudioInformations?.id === track.id
        ? currentTrack?.currentTime || 0
        : 0;
    setCurrentTrackTimeStamp(getCurrentTimeStamp);
  }, []);

  return (
    <Container>
      <div className="content-left">
        <div className="track-image">
          <img src={track.albumImage} alt="track" />

          <SvgCircularProgressBardWrapper percent={currentTrackTimestamp}>
            <svg>
              <circle cx="25" cy="75" r="20" strokeLinecap="round"></circle>
            </svg>
          </SvgCircularProgressBardWrapper>

          <button>
            <img
              alt="play or pause music"
              onClick={handlerSetPlayingMusic}
              src={trackHasPlaying ? GifEqualizerIcon : BtnPlayIcon}
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
