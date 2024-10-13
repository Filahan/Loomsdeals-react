import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Slider from '../../../../components/Slider';
import colors from '../../../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MarketCatalogues from './Homecomponents/MarketCatalogues'
export default function Hometab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setKey(prevKey => prevKey + 1); // Update key to force re-render
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      key={key}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <ProductCatCarroussel /> */}
      <Slider />
      <View style={styles.headerContainer}>

        <FontAwesome5
          name="fire-alt"
          size={20}
          color="red"
          style={styles.icon}
        />
        <Text numberOfLines={1} style={styles.DealsTitle}>

          Deals
        </Text>
      </View>
      <MarketCatalogues/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10, // Adjust padding as needed
  },
  icon: {
    marginHorizontal: 15,
    marginRight: 3, // Space between icon and text
  },
  DealsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    flexGrow: 1,
    padding: 2,
    letterSpacing: 0.4,
  },
});
