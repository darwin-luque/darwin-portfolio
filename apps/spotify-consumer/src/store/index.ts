import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistedReducer } from './reducers';

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: unknown) => f
  )
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
