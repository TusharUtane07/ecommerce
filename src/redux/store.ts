import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';
import { combineReducers } from "redux";
import persistedAuthReducer from './authSlice';
import checkoutReducer from './cartSlice'


const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    checkout: checkoutReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
