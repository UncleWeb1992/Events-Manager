import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { authReducer } from "./slices/AuthSlice";
import { userReducer } from "./slices/UserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

setupListeners(store.dispatch);

export default store;

// Вывод типов `RootState` и `AppDispatch` из стора.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
