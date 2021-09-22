import { createSlice } from '@reduxjs/toolkit';
import { TrackPropsDTO } from '../../entities/track';
import { RootState } from '..';

const listMusic = createSlice({
  name: 'listMusic',
  initialState: {
    page: 0,
    data: [] as TrackPropsDTO[],
    url: '',
  },
  reducers: {
    initListMusic(state, { payload }) {
      return { ...state, data: [...state.data, ...payload] };
    },

    searchListMusic(state, { payload }) {
      return { page: 0, url: payload.url, data: [...payload.data] };
    },
    moreMusics(state, { payload }) {
      const newIndex = state.page + 10;
      return { ...state, page: newIndex, data: [...state.data, ...payload] };
    },
    removeListMusics(state) {
      return { ...state, data: [] as TrackPropsDTO[] };
    },
  },
});

export const { initListMusic, searchListMusic, moreMusics, removeListMusics } =
  listMusic.actions;
export const selectListMusic = (state: RootState) => state.listMusics;

export default listMusic.reducer;
