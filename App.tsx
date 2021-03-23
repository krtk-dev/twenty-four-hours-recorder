import React, { useEffect } from 'react';
import AppContainer from './src/screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import firebase from '@react-native-firebase/app'
import { StatusBar } from 'react-native';
import { COLOR1 } from './src/components/style';
import InAppBilling from 'react-native-billing';


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
      await InAppBilling.close();
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
          <StatusBar backgroundColor={COLOR1} />
          <AppContainer />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
