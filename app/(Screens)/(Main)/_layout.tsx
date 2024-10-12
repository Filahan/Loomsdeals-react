import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "./(Home)/WelcomeScreen";
import SavedScreen from "./(Saved)/SavedScreen";
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from "../../theme";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          title: '',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Foundation
              color={focused ? colors : "grey"}
              name="home"
              size={27}
            />
          ),
        }}
        component={WelcomeScreen}
      />
      <Tab.Screen
        name="Saved"
        options={{
          title: '',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#002D62" : "grey"}
              name="save-alt"
              size={27}
            />
          ),
        }}
        component={SavedScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
