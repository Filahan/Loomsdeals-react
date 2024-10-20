import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config/Firebase';
import Main from './(Screens)/(Main)/_layout';
import WelcomeScreen from './(Screens)/(Main)/(Home)/WelcomeScreen';
import SettingsScreen from './(Screens)/(Settings)/SettingsScreen';
import CatalogueScreen from './(Screens)/(Catalogue)/CatalogueScreen';
import SigninScreen from './(Screens)/(Auth)/SigninScreen';
import SignupScreen from './(Screens)/(Auth)/SignupScreen';
import ForgotPasswordScreen from './(Screens)/(Auth)/ForgotPasswordScreen';
import SearchScreen from './(Screens)/(Search)/SearchScreen';

const Stack = createStackNavigator();

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="(Screens)/(Main)" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="Screens)/(Main)/(Home)/WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Settings)/SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Catalogue)/CatalogueScreen" component={CatalogueScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Search)/SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Auth)/SigninScreen" component={SigninScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Auth)/SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(Screens)/(Auth)/ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Layout;
