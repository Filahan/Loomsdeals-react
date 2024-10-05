import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity
} from 'react-native';
import Catalogues from '../../../../components/CataloguesList';
import colors from '../../../../theme';
import { useFocusEffect } from 'expo-router';
import { getSavedCatalogueIds } from '../../../../api/saved';
import { getAllCatalogues, getCataloguesByIds } from '../../../../api/catalogues';
import { auth } from '../../../../config/Firebase';
import { getStoresCategories } from '../../../../api/stores_categories';

interface Catalogue {
  id: string;
  link: string;
  title: string;
  start_date: string;
  end_date: string;
  stores: { url: string; };
  store: string;
  img: string;
}

interface Category {
  id: number;  // or string, depending on your data
  name: string;
}
// Externalize the functions
const fetchCataloguesData = async (userId, setSaved, setCatalogues, setLoading) => {
  setLoading(true);
  try {
    const savedList = await getSavedCatalogueIds(userId);
    setSaved(savedList);

    const { data: cataloguesData, count } = await getAllCatalogues();

    setCatalogues(cataloguesData);
  } catch (error) {
    console.error('Error fetching catalogues data:', error);
    setSaved([]);
    setCatalogues([]); // Clear catalogues in case of error
  } finally {
    setLoading(false);
  }
};


const getsavedlist = async (userId, setSaved) => {
  try {
    const savedList = await getSavedCatalogueIds(userId);
    setSaved(savedList);
  } catch (error) {
    console.error('Error fetching saved catalogues data:', error);
    setSaved([]);
  }
};




const handleFocusEffect = (fetchCataloguesData, getsavedlist) => {
  useFocusEffect(
    useCallback(() => {
      getsavedlist();
    }, [fetchCataloguesData, getsavedlist])
  );
};

const handleUseEffect = (fetchCataloguesData) => {
  useEffect(() => {
    fetchCataloguesData();
  }, [fetchCataloguesData]);
};


export default function Cataloguestab() {
  const [categoriesCatalogue, setCategoriesCatalogue] = useState<Category[]>([]);

  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');

  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response: Category[] = await getStoresCategories();
        setCategoriesCatalogue(response);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
  }, []);
  const fetchCatalogues = useCallback(() => fetchCataloguesData(userId, setSaved, setCatalogues, setLoading), [userId, ""]);
  const fetchSaved = useCallback(() => getsavedlist(userId, setSaved), [userId]);

  handleFocusEffect(fetchCatalogues, fetchSaved);
  handleUseEffect(fetchCatalogues);


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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {categoriesCatalogue.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCatalogueCategory((prev) => (prev === category.name ? '' : category.name))}
            style={[
              styles.filterButton,
              selectedCatalogueCategory === category.name && styles.filterButtonActive,
            ]}
          >
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <StoresCatCaroussel /> */}
      <Text numberOfLines={1} style={styles.CataloguesTitle}>
        Les catalogues
      </Text>
      <View></View>
      <Catalogues store_id="" category="" saved_screen='' setSaved={setSaved} saved={saved} setCatalogues={setCatalogues} catalogues={catalogues} loading={loading} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({

  CataloguesTitle: {
    marginHorizontal: 15,
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    flexGrow: 1,
    letterSpacing: 0.4,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#FFE5B4",
    borderColor: "#FFE5B4",
  },
});