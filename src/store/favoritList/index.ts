import { createSlice } from '@reduxjs/toolkit';
import Track from '../../entities/track';

const favoritList = createSlice({
  name: 'favoritList',
  initialState: {
    page: 1,
    data: [] as Track[],
  },
  reducers: {
    initFavoritList(state, { payload }) {
      return { ...state, data: payload };
    },
    addToFavorit(state, { payload }) {
      const cloneState = state.data.slice();
      cloneState.push(payload);
      return { ...state, data: cloneState };
    },
    resetPages(state, { payload }) {
      return { ...state, page: 1 };
    },
    removeMusicInFavorits(state, { payload }) {
      return {
        ...state,
        data: state.data.filter(element => element.id !== payload.id),
      };
    },
    getMoreFavoritList(state, { payload }) {
      const nextPage = state.page + 1;
      return {
        ...state,
        page: nextPage,
      };
    },
  },
});

export const {
  addToFavorit,
  removeMusicInFavorits,
  getMoreFavoritList,
  resetPages,
} = favoritList.actions;

export default favoritList.reducer;
