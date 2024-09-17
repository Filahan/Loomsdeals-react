import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
  View
} from 'react-native';
import StoresCatCaroussel from '../../../../components/StoresCatCaroussel'; // Ensure path is correct
import Catalogues from '../../../../components/CataloguesList';
import colors from '../../../../theme';

export default function Cataloguestab() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setKey(prevKey => prevKey + 1); // Update key to force re-render
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
   <ScrollView  
   key={key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StoresCatCaroussel />
     <Text numberOfLines={1} style={styles.CataloguesTitle}>
       Les catalogues
     </Text>
     <View></View>
     <Catalogues store_id="" category=""  saved_screen="" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  
  CataloguesTitle: {
    marginHorizontal:15,
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    flexGrow: 1,
    letterSpacing: 0.4,
  },
});