
"use client";

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, PAUSE, PURGE, persistStore, REGISTER, REHYDRATE, PERSIST } from 'redux-persist'
import { rootReducer } from '@/setup/redux/root-reducer'
import storage from "./custom-storage"
import logger from "redux-logger";

const persistConfig = {
    key: "wokpa",
    storage: storage,
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(logger),

    devTools: process.env.NODE_ENV !== 'production',
})


export const persistor = persistStore(store)
export default store;
export type AppDispatch = typeof store.dispatch