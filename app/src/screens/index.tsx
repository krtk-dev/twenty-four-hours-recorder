import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';


import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import { COLOR1 } from '../components/style';
import RecordHistoryScreen from './RecordHistoryScreen';


const Stack = createStackNavigator();

const getActiveRouteName = (state: any): any => {
    const route = state.routes[state.index];
    if (route.state) {
        return getActiveRouteName(route.state);
    }
    return route.name;
};


const AppContainer = () => {
    const routeNameRef = useRef<any>();
    const navigationRef = useRef<any>();

    useEffect(() => {
        const state = navigationRef.current?.getRootState();
        routeNameRef.current = getActiveRouteName(state);
    }, []);

    return (
        <NavigationContainer
            ref={navigationRef}
            onStateChange={state => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = getActiveRouteName(state);

                if (previousRouteName !== currentRouteName) {
                    analytics().setCurrentScreen(currentRouteName, currentRouteName);
                }
            }}
        >
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        flex: 1,
                        backgroundColor: COLOR1
                    }
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
                <Stack.Screen name="RecordHistory" component={RecordHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}


export default AppContainer