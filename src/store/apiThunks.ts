import {
  initListMusic,
  makingInitListMusic,
  makingSearchMusic,
  moreMusics,
  searchListMusic,
} from './listMusics';
import { AppThunk, AppDispatch } from './';

import { RequisitionToolWithAxios } from '../service/requisitionToolWithAxios';

const apiLimit = 10;
const objectMakeRequest = new RequisitionToolWithAxios({ limit: apiLimit });

export function getTopMusics(): AppThunk {
  return async (dispatch: AppDispatch) => {
    dispatch(makingInitListMusic({}));
    const response = await objectMakeRequest.getTopTracks();

    if (response.message == 'okay') {
      return dispatch(initListMusic(response.data.data));
    }
  };
}

export function getMoreMusic(
  index: number,
  url = '/chart/0/tracks?',
): AppThunk {
  return async (dispatch: AppDispatch) => {
    const nextIndex = index + apiLimit;
    const response = await objectMakeRequest.getMoreTracks(url, nextIndex);

    if (response.message == 'okay') {
      dispatch(moreMusics(response.data.data));
    }
  };
}

export function searchMusic(params: string): AppThunk {
  return async (dispatch: AppDispatch) => {
    await dispatch(makingSearchMusic({}));
    const response = await objectMakeRequest.searchTracks(params);

    if (response.message == 'okay') {
      return dispatch(
        searchListMusic({
          data: response.data.data,
          url: `/search/track?q=${params}`,
        }),
      );
    }
  };
}
