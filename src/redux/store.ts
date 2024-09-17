import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistedAuthReducer from './authSlice';
// import cartReducer from './cartSlice'; // Import your cart reducer

// Combine the reducers
const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    // cart: cartReducer, // Add cartReducer here
});

// Configure the store with middleware for persisting
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create a persistor for the store
export const persistor = persistStore(store);

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
