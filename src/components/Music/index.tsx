import React, { memo, useRef, useContext, useState, useEffect } from 'react';
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
import CircularProgressBar from './circular-progress-bar';

function Music(track: Track) {
  const dispatch = useDispatch();

  const { playingMusic, _setPlayingMusic, pauseMusic, playCurrentTrack } =
    useContext(PlayerContext);
  const [trackHasPlaying, setTrackHasPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackTimestampPercent, setCurrentTrackTimestampPercent] =
    useState(0);

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
    const timeUpdatedEvent = (e: any) => {
      const duration = e.target.duration;
      const currentTime = e.target.currentTime;

      const percent = (currentTime / duration) * 100;
      setCurrentTrackTimestampPercent(percent);
    };
    const timeEndedEvent = () => {
      setCurrentTrackTimestampPercent(0);
      pauseMusic();
    };
    audioRef.current?.addEventListener('timeupdate', timeUpdatedEvent);
    audioRef.current?.addEventListener('ended', timeEndedEvent);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', timeUpdatedEvent);
      audioRef.current?.removeEventListener('ended', timeEndedEvent);
    };
  }, []);

  useEffect(() => {
    playingMusic.currentAudioInformations &&
    !playingMusic.paused &&
    playingMusic.currentAudioInformations.id === track.id
      ? setTrackHasPlaying(true)
      : setTrackHasPlaying(false);
  }, [playingMusic]);

  useEffect(() => {
    if (trackHasPlaying) {
      audioRef.current
        ?.play()
        .then(_ => _)
        .catch(_ => {
          pauseMusic();
          alert('track indisponível');
        });
      return;
    }
    audioRef.current?.pause();
  }, [trackHasPlaying]);

  return (
    <Container>
      <audio ref={audioRef} src={track.preview} />

      <div className="content-left">
        <div className="track-image">
          <img src={track.albumImage} alt="track" />

          <CircularProgressBar
            percent={currentTrackTimestampPercent}
            radius={20}
          />

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
