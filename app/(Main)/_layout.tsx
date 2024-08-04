// (tab)/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text,  } from 'react-native';
import HomeScreen from "./HomeScreen"
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen name="Home" 
       options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({  }) => <FeatherIcon color="#6a99e3"
        name="home"
        size={22} />,
      }}component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
