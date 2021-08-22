import React, { memo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TrackProps } from '../../entities/track';

import { Container } from './styles';

import BtnPlayMusic from '../btnPlayMusic';
import BtnPlayOrPauseTrack from '../btnPlayOrPauseTrack';
import BtnAddToFavorit from '../btnAddToFavorit';

import ClockIcon from '../../assets/clock.svg';

import {
  addToFavorit,
  removeMusicInFavorits,
} from '../../store/ducks/favoritList';

function Music({
  albumImage,
  artistName,
  duration,
  link,
  id,
  preview,
  title,
}: TrackProps) {
  const dispatch = useDispatch();
  const musicRef = useRef<HTMLAudioElement>(null);
  console.log('pomba branca', id);
  const convertedSecondsForMinutes = new Date(duration * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':')
    .slice(-2)
    .join(':')
    .concat('m');

  const AddOrRemoveTrackFromFavorits = (typeBtn: boolean) => {
    if (typeBtn) return dispatch(removeMusicInFavorits({ id }));
    return dispatch(
      addToFavorit({
        albumImage,
        artistName,
        duration,
        link,
        id,
        preview,
        title,
      }),
    );
  };

  const trackName = `track-${id}`;
  return (
    <Container>
      <div className="content-left">
        <div className="track-image">
          <img src={albumImage} alt="track" />

          <audio ref={musicRef} src={preview} id={trackName} />
          <BtnPlayOrPauseTrack trackName={trackName} />
        </div>
        <div className="track-informations">
          <h1>{title}</h1>
          <h2>{artistName}</h2>

          <span>
            <img src={ClockIcon} alt="" />
            <p>{convertedSecondsForMinutes}</p>
          </span>
          <BtnPlayMusic linkToMusic={link} />
        </div>
      </div>

      <BtnAddToFavorit trackId={id} onClick={AddOrRemoveTrackFromFavorits} />
    </Container>
  );
}

export default memo(Music);
