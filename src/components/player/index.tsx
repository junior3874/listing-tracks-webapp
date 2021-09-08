import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import Track from '../../entities/track';

type PlayerProps = {
  children: React.ReactElement[];
};

type EntityTrackProps = {
  currentAudio: HTMLAudioElement;
  currentAudioInformations: Track;
  paused?: boolean;
};

type PlayerContextProps = {
  playingMusic: EntityTrackProps;
  _setPlayingMusic: (track: EntityTrackProps) => void;
};

export const PlayerContext = createContext({} as PlayerContextProps);

function Player({ children }: PlayerProps) {
  const [playingMusic, setPlayingMusic] = useState({} as EntityTrackProps);

  useEffect(() => {
    playingMusic.currentAudio?.addEventListener('ended', () =>
      setPlayingMusic(prev => ({ ...prev, paused: true })),
    );

    return playingMusic.currentAudio?.removeEventListener('ended', () =>
      setPlayingMusic(prev => ({ ...prev, paused: true })),
    );
  }, [playingMusic]);

  const _setPlayingMusic = useCallback(
    (track: EntityTrackProps) => {
      // =============================================

      if (!playingMusic.currentAudio) playNewMusic(track);
      // =============================================
      else if (
        playingMusic.currentAudioInformations === track.currentAudioInformations
      ) {
        if (playingMusic.currentAudio.paused) return playCurrentTrack();
        pauseMusic();
      }

      // =============================================
      else {
        if (!playingMusic.currentAudio.paused)
          playingMusic.currentAudio.pause();

        playNewMusic(track);
      }

      // =============================================
    },
    [playingMusic],
  );

  const playNewMusic = (track: EntityTrackProps) => {
    setPlayingMusic({ ...track, paused: false });
    track.currentAudio.play();
  };
  const playCurrentTrack = () => {
    playingMusic.currentAudio.play();
    setPlayingMusic(prev => ({ ...prev, paused: false }));
  };

  const pauseMusic = () => {
    playingMusic.currentAudio.pause();
    setPlayingMusic(prev => ({ ...prev, paused: true }));
  };

  return (
    <PlayerContext.Provider value={{ playingMusic, _setPlayingMusic }}>
      {children}
    </PlayerContext.Provider>
  );
}

export default Player;
