import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config/Firebase';
import Main from './(Screens)/(Main)/_layout';
import Settings from './(Screens)/(Settings)/Settings';
import CatalogueScreen from './(Screens)/(Catalogue)/CatalogueScreen';
import StoreScreen from './(Screens)/(Store)/StoreScreen';
import CategoryScreen from './(Screens)/(Main)/(Home)/CategoryScreen';
import SigninScreen from './(Screens)/(Auth)/SigninScreen';
import SignupScreen from './(Screens)/(Auth)/SignupScreen';
import ForgotPasswordScreen from './(Screens)/(Auth)/ForgotPasswordScreen';

const Stack = createStackNavigator();

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(Screens)/(Main)" component={Main} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Settings)/Settings" component={Settings} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Catalogue)/CatalogueScreen" component={CatalogueScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Store)/StoreScreen" component={StoreScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Main)/(Home)/CategoryScreen" component={CategoryScreen} options={{ headerShown: false }}/>
        </>
      ) : (
        <>
          {/* <Stack.Screen name="(Landing)" component={LandingScreen} options={{ headerShown: false }}/> */}
          <Stack.Screen name="(Screens)/(Auth)/SigninScreen" component={SigninScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Auth)/SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="(Screens)/(Auth)/ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Layout;
