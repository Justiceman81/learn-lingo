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
import { authReducer } from "./auth/slice.js";
import { teachersReducer } from "./teachers/slice.js";
import { favoritesReducer } from "./favorites/slice.js";
import { filtersReducer } from "./filters/slice.js";
import { modalReducer } from "./modal/slice.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    teachers: teachersReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
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
