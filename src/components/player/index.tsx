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
};

export const PlayerContext = createContext({} as PlayerContextProps);

function PlayerProvider({ children }: PlayerProps) {
  const [playingMusic, setPlayingMusic] = useState({} as EntityTrackProps);

  const _setPlayingMusic = (track: EntityTrackProps) => {
    if (!playingMusic.currentAudioInformations) {
      playNewMusic(track);
    }
    // =============================================
    else if (
      playingMusic.currentAudioInformations.id ===
      track.currentAudioInformations.id
    ) {
      playingMusic.paused ? playCurrentTrack() : pauseMusic();
    } else {
      playNewMusic(track);
    }
  };

  const playNewMusic = async (track: EntityTrackProps) => {
    setPlayingMusic({ ...track, paused: false });
  };

  const playCurrentTrack = () => {
    setPlayingMusic(prev => ({ ...prev, paused: false }));
    return;
  };

  const pauseMusic = () => {
    setPlayingMusic(prev => ({ ...prev, paused: true }));
  };

  return (
    <PlayerContext.Provider value={{ playingMusic, _setPlayingMusic }}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
