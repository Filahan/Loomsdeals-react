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
import Catalogues from '../../../components/CataloguesList';

import ProductCard from '../../../components/ProductsList';
import { getSavedCatalogueIds } from '../../../api/saved';
import { getAllCatalogues, getCataloguesByIds } from '../../../api/catalogues';
import { auth } from '../../../config/Firebase';

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
    padding: 16,
    paddingTop: 30

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
  catalogueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  catalogueImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  catalogueDetails: {
    flex: 1,
  },
  sectiontitle: {
    marginHorizontal: 3,
    fontWeight: '600',
    fontSize: 17,
    paddingBottom: 4,
    color: colors.primary,
    letterSpacing: 0.4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    padding: 6,
    marginBottom: 10,
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
