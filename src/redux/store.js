import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userReducer } from "./auth/slice.js";
import { teachersReducer } from "./teachers/slice.js";
import { favoritesReducer } from "./favorites/slice.js";
import { modalReducer } from "./modal/slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
    modal: modalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
