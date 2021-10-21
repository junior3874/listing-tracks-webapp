import { createSlice } from '@reduxjs/toolkit';
import { TrackPropsDTO } from '../../entities/track';
import { RootState } from '..';

const listMusic = createSlice({
  name: 'listMusic',
  initialState: {
    data: [] as TrackPropsDTO[],
    loading: true,
    error: false,
  },
  reducers: {
    makingInitListMusic(state, _) {
      return { ...state, loading: true };
    },
    makingRequestWithError(state, _) {
      return { ...state, loading: false, error: true };
    },
    initListMusic(state, { payload }) {
      return { ...state, data: [...state.data, ...payload], loading: false };
    },

    makingSearchMusic(state, _) {
      return { ...state, loading: true };
    },

    searchListMusic(_, { payload }) {
      return {
        data: [...payload.data],
        loading: false,
        error: false,
      };
    },
    moreMusics(state, { payload }) {
      return { ...state, data: [...state.data, ...payload.data] };
    },
    removeListMusics(state, action) {
      return { ...state, data: [] as TrackPropsDTO[] };
    },
  },
});

export const {
  initListMusic,
  searchListMusic,
  moreMusics,
  removeListMusics,
  makingSearchMusic,
  makingInitListMusic,
  makingRequestWithError,
} = listMusic.actions;

export const selectListMusic = (state: RootState) => state.listMusics;

export default listMusic.reducer;
