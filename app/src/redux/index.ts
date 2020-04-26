import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';


import Setting from './Setting'
import SaveTime from './SaveTime'

const rootReducer = combineReducers({
    SaveTime,
    Setting: persistReducer({ key: 'SETTING', storage: AsyncStorage }, Setting)
})


export type RootState = ReturnType<typeof rootReducer>;


export default function configureStore() {
    const store: any = createStore(rootReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};

