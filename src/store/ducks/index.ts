import { combineReducers, applyMiddleware } from 'redux';

import listMusics from './listMusics';
import favoritList from './favoritList';
import playingMusics from './playingMusics';

const rootReducer = combineReducers({
  listMusics,
  favoritList,
  playingMusics,
});

export default rootReducer;
