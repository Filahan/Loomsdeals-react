import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./(Home)/HomeScreen"
import SavedScreen from "./(Saved)/SavedScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="Home"
      options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <AntDesign
            color={focused ? "#002D62" : "grey"}
            name="home"
            size={25}
          />
        ),
      }}
      component={HomeScreen}
    />
    <Tab.Screen
      name="Saved"
      options={{
        title: '',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            color={focused ? "#002D62" : "grey"}
            name="save-alt"
            size={25}
          />
        ),
      }}
      component={SavedScreen}
    />
    {/* <Tab.Screen
      name="Produits"
      options={{
        title: 'Produits',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Feather
            color={focused ? "#002D62" : "grey"}
            name="grid"
            size={25}
          />
        ),
      }}
      component={ProductsScreen}
    /> */}
  </Tab.Navigator>
  );
};

export default TabNavigator;
