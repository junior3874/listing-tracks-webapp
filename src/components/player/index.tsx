import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import Track from '../../entities/track';

type PlayerProps = {
  children: React.ReactElement;
};

type EntityTrackProps = {
  currentAudioInformations: Track;
  paused?: boolean;
};

type PlayerContextProps = {
  playingMusic: EntityTrackProps;
  _setPlayingMusic: (track: EntityTrackProps) => void;
  currentTrack: HTMLAudioElement | undefined;
};

export const PlayerContext = createContext({} as PlayerContextProps);

function PlayerProvider({ children }: PlayerProps) {
  const [playingMusic, setPlayingMusic] = useState({} as EntityTrackProps);
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement>();

  useEffect(() => {
    currentTrack?.addEventListener('ended', () =>
      setPlayingMusic(prev => ({ ...prev, paused: true })),
    );

    return () => {
      currentTrack?.removeEventListener('ended', () =>
        setPlayingMusic(prev => ({ ...prev, paused: true })),
      );
    };
  }, [playingMusic]);

  const _setPlayingMusic = useCallback(
    async (track: EntityTrackProps) => {
      if (!currentTrack) {
        await playNewMusic(track);
      }
      // =============================================
      else if (
        playingMusic.currentAudioInformations.id ===
        track.currentAudioInformations.id
      ) {
        if (currentTrack.paused) return await playCurrentTrack();
        pauseMusic();
      }

      // =============================================
      else {
        if (!currentTrack.paused) currentTrack.pause();

        playNewMusic(track);
      }
    },
    [playingMusic, currentTrack],
  );

  const playNewMusic = async (track: EntityTrackProps) => {
    const res = await playTrackAfterVerifyError(track);

    if (!res) {
      setPlayingMusic({ ...track, paused: false });
      return;
    }
  };

  const playCurrentTrack = () => {
    setPlayingMusic(prev => ({ ...prev, paused: false }));
    currentTrack!.play();
    return;
  };

  const pauseMusic = () => {
    currentTrack!.pause();
    setPlayingMusic(prev => ({ ...prev, paused: true }));
  };

  const playTrackAfterVerifyError = async (track = playingMusic) => {
    const newTrack = new Audio(track.currentAudioInformations.preview);
    const res = await newTrack.play().catch(_ => true);

    if (!res) {
      setCurrentTrack(newTrack);
    }
    return res;
  };

  return (
    <PlayerContext.Provider
      value={{ playingMusic, _setPlayingMusic, currentTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
