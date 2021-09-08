import { combineReducers, applyMiddleware } from 'redux';

import listMusics from './listMusics';
import favoritList from './favoritList';

const rootReducer = combineReducers({
  listMusics,
  favoritList,
});

export default rootReducer;
