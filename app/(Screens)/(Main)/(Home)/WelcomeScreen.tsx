import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from "../../../theme";
import Hometab from "./tabs/Hometab";
import Cataloguestab from "./tabs/Cataloguestab";
import { router } from 'expo-router';
const logo = require('../../../asserts/shopslogos/logo.png');

export default function TabViewExample() {
  const [currentTab, setCurrentTab] = useState('home'); // State for the current tab

  const renderContent = () => {
    if (currentTab === 'home') {
      return <Hometab />;
    } else if (currentTab === 'catalogues') {
      return <Cataloguestab />;
    }
  };

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
            <View style={styles.searchInput}>
              <View style={styles.inputWrapper}>
                <Text style={styles.input}>Rechercher...</Text>
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
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, currentTab === 'home' && styles.activeButton]}
            onPress={() => setCurrentTab('home')}
          >
            <Text style={[styles.buttonText, currentTab === 'home' && styles.activeButtonText]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, currentTab === 'catalogues' && styles.activeButton]}
            onPress={() => setCurrentTab('catalogues')}
          >
            <Text style={[styles.buttonText, currentTab === 'catalogues' && styles.activeButtonText]}>
              Catalogues
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {renderContent()}
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
  },
  settings: {
    borderWidth: 2,
    backgroundColor: "black",
    color: "white",
    height: 45,
    width: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: 50,
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
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  searchInput: {
    borderRadius: 8,
    borderColor: colors.secondary,
    borderWidth: 1,
    height: 45,
    flexGrow: 1,
    marginRight: 6,
  },
  input: {
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 34,
    height: "100%",
    fontSize: 16,
    fontWeight: '500',
    color: colors.grey,
  },
  inputWrapper: {
    width: "100%",
  },
  inputIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 15
  },
  button: {
    paddingHorizontal: 12,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: colors.secondary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grey
  },
  activeButton: {
    backgroundColor: colors.third,
    borderWidth: 0,

  },
  activeButtonText: {
    color: colors.primary
  },
  contentContainer: {
    flex: 1,
  },
});
