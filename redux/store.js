import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);   

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);
