import { createSlice } from '@reduxjs/toolkit';

const playingMusic = createSlice({
  name: 'playingMusic',
  initialState: {
    playing: false,
    trackName: '',
  },
  reducers: {
    setStatePlayingMusic(state, { payload }) {
      if (state.playing && state.trackName === payload.trackName) {
        const audioTrack = document.getElementById(
          state.trackName,
        ) as HTMLAudioElement;
        audioTrack.pause();
        return { ...state, playing: false };
      }
      if (state.playing && state.trackName !== payload.trackName) {
        const getOldTrack = document.getElementById(
          state.trackName,
        ) as HTMLAudioElement;
        getOldTrack?.pause();
      }
      const audioTrack = document.getElementById(
        payload.trackName,
      ) as HTMLAudioElement;

      try {
        audioTrack
          .play()
          .catch(_ =>
            alert(
              'Faixa indisponínivel no momento, tente esperar alguns instantes e atualizar a página',
            ),
          );
      } catch (err) {
        return { ...state, playing: false };
      }
      return { ...state, playing: true, trackName: payload.trackName };
    },
  },
});

export const { setStatePlayingMusic } = playingMusic.actions;

export default playingMusic.reducer;
