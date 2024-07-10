import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from "redux-persist"

const rootReducer = combineReducers({
    user: userReducer,
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
    
})

export const persister = persistStore(store)