// (tab)/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen"
import StoresScreen from "./StoresScreen"
import ProductsScreen from "./ProductsScreen"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen
      name="Home"
      options={{
        title: 'Home',
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
      name="Magasins"
      options={{
        title: 'Magasins',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons
            color={focused ? "#002D62" : "grey"}
            name="storefront-outline"
            size={25}
          />
        ),
      }}
      component={StoresScreen}
    />
    <Tab.Screen
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
    />
  </Tab.Navigator>
  );
};

export default TabNavigator;
