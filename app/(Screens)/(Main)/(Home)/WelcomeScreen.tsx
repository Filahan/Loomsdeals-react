import React, { useState }  from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
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
import Catalogues from '../../../components/CataloguesList';
import { router } from 'expo-router';
import Slider from '../../../components/Slider';
import StoresCatCaroussel from '../../../components/StoresCatCaroussel'; // Ensure path is correct
import colors from "../../../theme"
import Hometab from "./tabs/Hometab"
import Cataloguestab from "./tabs/Cataloguestab"
const myImage = require('../../../asserts/shopslogos/logo.png');


const FirstRoute = () => (
<Hometab/>
);

const SecondRoute = () => (
  <Cataloguestab/>
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


  return (

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoContainer}>
        <Image source={myImage} resizeMode="contain" style={styles.logo} />
      </View>
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
                  color={colors.primary}
                  name="search"
                  size={16}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}

      />
        </View>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  logo: {
    height: 27, // Smaller logo height
    alignSelf: 'center', // Horizontally center the logo
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
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
    borderRadius: 8,
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

