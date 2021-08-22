import {
  initListMusic,
  moreMusics,
  searchListMusic,
} from '../ducks/listMusics';

import { AppThunk, AppDispatch } from '..';
import { api } from '../../service/api';

export function getTopMusics(): AppThunk {
  return async (dispatch: AppDispatch) => {
    api
      .get('/home?link=api.deezer.com/chart/0/tracks')
      .then(res => res.data)
      .then(({ data: res }) => dispatch(initListMusic(res.data)))
      .catch((err: Promise<Error>) => console.log(err));
  };
}

export function getMoreMusic(
  index: number,
  url = '/home?link=api.deezer.com/chart/0/tracks?',
): AppThunk {
  return async (dispatch: AppDispatch) => {
    const newIndex = index + 10;
    api
      .get(`${url}index=${newIndex}%26limit=10`)
      .then(res => res.data)
      .then(({ data: res }) => dispatch(moreMusics(res.data)))
      .catch((err: Promise<Error>) => console.log(err));
  };
}

export function searchMusic(param: string): AppThunk {
  return async (dispatch: AppDispatch) => {
    api
      .get(`/home?link=api.deezer.com/search/track?q=${param}%26limit=10`)
      .then(res => res.data)
      .then(({ data: res }) =>
        dispatch(
          searchListMusic({
            data: res.data,
            url: `/home?link=api.deezer.com/search/track?q=${param}%26`,
          }),
        ),
      )
      .catch((err: Promise<Error>) => console.log(err));
  };
}
