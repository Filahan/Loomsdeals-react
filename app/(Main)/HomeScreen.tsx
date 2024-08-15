import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Header from './components/Home/header';
import Catalogues from './components/Home/CataloguesList';
import { router } from 'expo-router';
import Slider from './components/Home/Slider';
import StoresCatCaroussel from './components/Home/StoresCatCaroussel'; // Assure-toi que le chemin est correct

const myImage = require('../asserts/shopslogos/logo.jpg');

const FirstRoute = () => (
  <ScrollView
    contentContainerStyle={styles.scrollContainer}
    refreshControl={
      <RefreshControl
        refreshing={false}
        onRefresh={() => {}}
      />
    }
    showsVerticalScrollIndicator={false}
  >
          <StoresCatCaroussel />

      <Slider/>
      <Text numberOfLines={1} style={styles.CataloguesTitle}>
          Les catalogues
      </Text>

      <Catalogues store_id="" category="" />

  </ScrollView>
);

const SecondRoute = () => (
  <View style={styles.scene}>
  </View>
);

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '', icon: 'fire-flame-curved' },
    { key: 'second', title: 'Autres' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#002D62', // Couleur de la ligne
        height: 1, // Hauteur de la ligne
      }}    
      style={{ backgroundColor: 'white' }} // Style for the tab bar background
      renderLabel={({ route, focused }) => {
        const iconName = routes.find(r => r.key === route.key)?.icon;
        return (
          <View style={[styles.tabItem, focused && styles.tabActive]}>
            <FontAwesome6
              name={iconName}
              size={20}
              color={focused ? '#002D62' : '#6b7280'}
            />
            {route.title  &&
            <Text style={[styles.tabText, focused && styles.tabActiveText]}>
              {route.title}
            </Text>}
          </View>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={myImage} 
        resizeMode="contain"
        style={styles.logo} 
      />
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.searchInput}>
            <View style={styles.inputWrapper}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="Rechercher un produit ou un magasin"
                placeholderTextColor="#848484"
                returnKeyType="done"
                style={styles.input}
              />
              <View style={styles.inputIcon}>
                <FeatherIcon
                  color="#9eadba"
                  name="search"
                  size={16}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/Settings")}
            style={{ marginRight: 'auto' }}>
            <View style={styles.action}>
              <FeatherIcon color="#002D62" name="user" size={22} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: 360 }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo:{
    height:30,
    alignItems: 'flex-start',  // Aligne horizontalement à gauche
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop:10
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 6,
  },
  tabText: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabActive: {
    // backgroundColor: '#f0f6fb', // Optionally add background color for active tab
  },
  tabActiveText: {
    color: '#002D62',
  },
  action: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#f0f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CataloguesTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A4A4A',
    flexGrow: 1,
    letterSpacing: 0.4,
},
});
