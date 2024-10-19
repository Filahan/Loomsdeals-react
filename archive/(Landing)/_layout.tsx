import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Empêche le splash screen de se masquer automatiquement
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      // Attendez ici que toutes les ressources nécessaires soient chargées
      await new Promise(resolve => setTimeout(resolve, 20000)); // Simule un délai pour l'initialisation
      // Masque le splash screen après la préparation
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  // return <Tabs />;
}
