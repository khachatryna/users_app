import { configureStore } from '@reduxjs/toolkit';
import communityReducer from '../features/community/communitySlice';
import { usersApi } from "../services/users";
import {communityMiddleware} from "./middleware/communityMiddleware"

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(communityMiddleware.middleware),
});
