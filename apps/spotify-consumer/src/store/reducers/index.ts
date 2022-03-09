import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth.reducer';
import libraryReducer from './library.reducer';
import musicReducer from './music.reducer';
import notificationsReducer from './notifications.reducer';

const reducer = combineReducers({
  auth: authReducer,
  music: musicReducer,
  library: libraryReducer,
  notifications: notificationsReducer,
});

export const persistedReducer = persistReducer(
  {
    key: process.env['NX__APP_KEY'] ?? 'app-key',
    storage,
    blacklist: ['music', 'notifications'],
  },
  reducer
);
