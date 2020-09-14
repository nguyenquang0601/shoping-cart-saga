/**
 * Create the store with dynamic reducers
 */

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createInjectorsEnhancer, forceReducerReload } from "redux-injectors";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createReducer } from "./reducer";

export default function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [],
  };

  const createPersistedReducer = (injectedReducers = {}) =>
    persistReducer(persistConfig, createReducer(injectedReducers));

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: createPersistedReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createPersistedReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });

  const persistor = persistStore(store);
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducer", () => {
      forceReducerReload(store);
    });
  }

  return { store, persistor };
}
