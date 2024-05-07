import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import roofTopSlice from '../slices/rooftop-slice';
import roofDataSlice from '../slices/roof-data-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['rooftop']
};

const reducers = combineReducers({
  rooftop: roofTopSlice,
  roofData: roofDataSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/LogOut') {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true
});