import { RootState } from '..';
import Track from '../../entities/track';

const elementInPage = 10;

export const verifyTrackHasAddedInFavoritList = (
  state: RootState,
  trackId: number,
) => state.favoritList.data?.find(element => element.id === trackId);

export const getFavoritList = (state: RootState) => {
  const moreMusics = state.favoritList.data.slice(
    0,
    state.favoritList.page * elementInPage,
  );

  return moreMusics;
};

export const searchFavoritList = (state: RootState, params: string) =>
  state.favoritList.data?.reduce((acumulator, element) => {
    const splitedName = element.title.split(' ');
    if (splitedName.includes(params)) {
      acumulator.push(element);
      return acumulator;
    }
    return acumulator;
  }, [] as Track[]);

export const favoritMusicSelector = (state: RootState) => state.favoritList;
