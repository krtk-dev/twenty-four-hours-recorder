import React, { useEffect } from 'react';
import AppContainer from './src/screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';


const { store, persistor } = configureStore();

const App = () => {

  const adsInit = async () => {
    try {
      await admob()
        .setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: true,
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    adsInit()
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
