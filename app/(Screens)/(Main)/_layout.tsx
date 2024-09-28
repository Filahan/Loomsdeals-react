import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "./(Home)/WelcomeScreen";
import SavedScreen from "./(Saved)/SavedScreen";
import SettingScreen from "../(Settings)/SettingsScreen";
import SearchScreen from "./(Search)/SearchScreen"; // Import the search screen component
import FeatherIcon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon for search tab

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
        name="Search"
        options={{
          title: '',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors : "grey"}
              name="search"
              size={27}
            />
          ),
        }}
        component={SearchScreen} // Add the search screen component
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
      {/* <Tab.Screen
        name="Settings"
        options={{
          title: '',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (           
            <FeatherIcon
              color={focused ? "#002D62" : "grey"}
              marginTop={6}
              name="user"
              size={27}
            />
          ),
        }}
        component={SettingScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
