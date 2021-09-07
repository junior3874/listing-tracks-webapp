import React, { memo, ReactNode, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container, ImageBtn } from './styles';

import BtnPlayIcon from '../../assets/btn-play.svg';
import GifEqualizerIcon from '../../assets/equalizer.gif';

import { setStatePlayingMusic } from '../../store/playingMusics';
import { selectPlayingMusic } from '../../store/playingMusics/playingMusicsSelectors';
import { useEffect } from 'react';

export type BtnPlayOrPauseTrackProps = {
  trackName: string;
};

function BtnPlayOrPauseTrack({ trackName }: BtnPlayOrPauseTrackProps) {
  const dispatch = useDispatch();
  const playingMusic = useSelector(selectPlayingMusic);
  const handlePlayOrStopMusic = () => {
    dispatch(setStatePlayingMusic({ trackName }));
  };
  const hasPlaying =
    playingMusic.trackName === trackName && playingMusic.playing;

  let verify: NodeJS.Timeout;
  const verifyTrackHasPlaying = () => {
    const timeOfEndTrack = 30000;
    if (hasPlaying) {
      verify = setTimeout(
        () => dispatch(setStatePlayingMusic({ trackName })),
        timeOfEndTrack,
      );
    }
  };

  const clearMyVerifyTrack = () => {
    clearTimeout(verify);
  };

  useEffect(() => {
    verifyTrackHasPlaying();
    return () => clearMyVerifyTrack();
  }, [playingMusic]);
  return (
    <Container>
      <ImageBtn
        alt="play or pause music"
        onClick={handlePlayOrStopMusic}
        src={hasPlaying ? GifEqualizerIcon : BtnPlayIcon}
      />
    </Container>
  );
}

export default memo(BtnPlayOrPauseTrack);
