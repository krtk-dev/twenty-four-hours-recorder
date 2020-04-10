import React, { useEffect, useRef, RefObject } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';


import HomeScreen from './HomeScreen';


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
                console.log(previousRouteName + " : " + currentRouteName)
                if (previousRouteName !== currentRouteName) {
                    analytics().setCurrentScreen(currentRouteName, currentRouteName);
                }
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}


export default AppContainer