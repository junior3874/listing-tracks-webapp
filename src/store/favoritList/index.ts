import { createSlice } from '@reduxjs/toolkit';
import Track from '../../entities/track';

const favoritList = createSlice({
  name: 'favoritList',
  initialState: {
    page: 1,
    data: [] as Track[],
    loading: true,
    error: false,
  },
  reducers: {
    addToFavorit(state, { payload }) {
      const cloneState = state.data.slice();
      cloneState.push(payload);
      return { ...state, data: cloneState };
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

    resetFavoritPage(state, action) {
      return {
        ...state,
        page: 1,
      };
    },
  },
});

export const {
  addToFavorit,
  removeMusicInFavorits,
  getMoreFavoritList,
  resetFavoritPage,
} = favoritList.actions;

export default favoritList.reducer;
