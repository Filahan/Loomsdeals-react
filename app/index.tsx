// App.js
import React, { useEffect } from 'react';
import Layout from './_layout';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

// Empêche le splash screen de se masquer automatiquement
SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    async function prepare() {
      // Simule un délai ou attendez que les ressources soient prêtes
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Masque le splash screen après la préparation
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  return <Layout />;
}
