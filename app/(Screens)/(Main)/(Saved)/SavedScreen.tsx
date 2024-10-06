import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';
import colors from '../../../theme';
import Catalogues from '../../../components/List/CataloguesList';

import ProductCard from '../../../components/List/ProductsList';
import { getSavedCatalogueIds } from '../../../api/saved';
import { getAllCatalogues, getCataloguesByIds } from '../../../api/catalogues';
import { auth } from '../../../config/Firebase';


interface Catalogue {
  id: string;
  link: string;
  title: string;
  start_date: string;
  end_date: string;
  stores: { url: string; stores_categories: { name: string } };
  store: string;
  img: string;
}


// Externalize the functions
const fetchCataloguesData = async (userId, setSaved, setCatalogues, setLoading) => {
  setLoading(true);
  try {
    const savedList = await getSavedCatalogueIds(userId);
    setSaved(savedList);

    let cataloguesData: Catalogue[] = [];

    cataloguesData = await getCataloguesByIds(savedList.join(','));

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
      fetchCataloguesData();
    }, [fetchCataloguesData, getsavedlist])
  );
};

const handleUseEffect = (fetchCataloguesData) => {
  useEffect(() => {
    fetchCataloguesData();
  }, [fetchCataloguesData]);
};

export default function SavedScreen() {
  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const fetchCatalogues = useCallback(() => fetchCataloguesData(userId, setSaved, setCatalogues, setLoading), [userId, "yes"]);
  const fetchSaved = useCallback(() => getsavedlist(userId, setSaved), [userId]);

  handleFocusEffect(fetchCatalogues, fetchSaved);
  handleUseEffect(fetchCatalogues);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text style={styles.title}>Mes favoris</Text> */}

        <View style={styles.section}>
          <Text style={styles.sectiontitle}>Catalogues sauvegardés</Text>
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
              <Catalogues store_id="" category="" saved_screen="yes" setSaved={setSaved} saved={saved} setCatalogues={setCatalogues} catalogues={catalogues} loading={loading} />
            </View>
          </View>
          <Text style={styles.sectiontitle}>Articles sauvegardés</Text>
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
              <ProductCard />
            </View>
          </View>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 10,
    paddingTop: 20

  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    marginBottom: 30,

  },
  sectiontitle: {
    marginHorizontal: 3,
    fontWeight: '600',
    fontSize: 17,
    paddingBottom: 4,
    color: colors.primary,
    letterSpacing: 0.4,

  },
  placeholder: {
    flexBasis: 0,
    backgroundColor: 'transparent',

  },
  placeholderInset: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderStyle: 'dashed',
    marginBottom: 10,
    borderRadius: 9,
  },
});
