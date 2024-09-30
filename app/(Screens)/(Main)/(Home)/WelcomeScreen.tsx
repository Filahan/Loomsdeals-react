import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from "../../../theme"
import Hometab from "./tabs/Hometab"
import Cataloguestab from "./tabs/Cataloguestab"
import { router } from 'expo-router';
const logo = require('../../../asserts/shopslogos/logo.png');

import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const FirstRoute = () => (
  <Hometab />
);

const SecondRoute = () => (
  <Cataloguestab />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: colors.primary, // Indicator color
        height: 1, // Indicator height
        paddingHorizontal: 15

      }}
      style={{ backgroundColor: 'white' }} // Tab bar background
      renderLabel={({ route, focused }) => {
        const iconName = routes.find(r => r.key === route.key)?.icon;
        return (
          <View style={[styles.tabItem, focused && styles.tabActive]}>
            <FontAwesome6
              name={iconName}
              size={20}
              color={focused ? colors.primary : '#6b7280'}
            />
            {route.title &&
              <Text style={[styles.tabText, focused && styles.tabActiveText]}>
                {route.title}
              </Text>
            }
          </View>
        );
      }}
    />
  );

  const [routes] = useState([
    { key: 'first', title: '', icon: 'fire-flame-curved' },
    { key: 'second', title: 'Catalogues ' },
  ]);

  const navigation:any  = useNavigation(); // Get the navigation object

  return (

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.search}>
          <TouchableWithoutFeedback 
              onPress={() => router.push({ pathname: '/SearchScreen' })}
              >
              {/* <TouchableWithoutFeedback 
              onPress={() => router.push({ pathname: '/search' })}
              > */}

            <View style={styles.searchInput}>
              <View style={styles.inputWrapper}>
                <Text style={styles.input}>Rechercher...</Text>

                {/* <Text style={styles.input}>Rechercher...</Text>  */}

                {/* <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="Rechercher..."
                placeholderTextColor="#848484"
                returnKeyType="done"
                style={styles.input}
              /> */}
                <View style={styles.inputIcon}>
                  <FontAwesome5
                    color="#848484"
                    name="search"
                    size={16}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>


          <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/SettingsScreen' })}
            >
              <FeatherIcon
                color={"white"}
                name="user"
                size={23}

              />
            </TouchableOpacity >
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            lazy
          />
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: "center"

  },
  settings: {
    borderWidth: 2,
    backgroundColor: "black",
    color: "white",
    height: 45, // Smaller logo height
    width: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',


  },
  logo: {
    height: 50, // Smaller logo height
    width: 50
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 10,

  },
  search: {
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  searchInput: {
    borderRadius: 20,
    borderWidth: 2,
    height: 45,
    flexGrow: 1,
    marginRight: 6,

  },
  input: {
    // backgroundColor: colors.secondary,
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 34,
    height: "100%",
    fontSize: 16,
    fontWeight: '500',
    color: "#848484"

  },
  inputWrapper: {

    width: "100%"
  },
  inputIcon: {

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    // margin:10
  },
  tabContainer: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 7
  },
  tabText: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabActive: {
    // Optionally add background color for active tab
  },
  tabActiveText: {
    color: colors.primary,
  },

});

