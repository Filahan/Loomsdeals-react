import React, { useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet
} from 'react-native';
import Slider from '../../../../components/Slider';

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
        }>
        
        <Slider/>
    </ScrollView>
  );
}
