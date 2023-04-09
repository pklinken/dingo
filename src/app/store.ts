import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import trackerReducer from '../features/tracker/trackerSlice'
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  tracker: trackerReducer
}))

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
