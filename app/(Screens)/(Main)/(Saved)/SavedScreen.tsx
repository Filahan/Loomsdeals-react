import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image

} from 'react-native';
import colors from '../../../theme';
import Catalogues from '../../../components/List/CataloguesList';
import ProductCard from '../../../components/List/ProductsList';
import { getSavedCatalogueIds } from '../../../api/saved';
import { getCataloguesByIds } from '../../../api/catalogues';
import { auth } from '../../../config/Firebase';
import NotSignedIn from '../../(Auth)/NotSignedIn';
const saveicon = require('../../../asserts/saveicon.png'); // Optional logo import

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


  const fetchCatalogues = useCallback(() => fetchCataloguesData(userId, setSaved, setCatalogues, setLoading), [userId]);
  const fetchSaved = useCallback(() => getsavedlist(userId, setSaved), [userId]);

  handleFocusEffect(fetchCatalogues, fetchSaved);
  handleUseEffect(fetchCatalogues);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          {userId ? (
            <>
              <Text style={styles.sectiontitle}>Catalogues sauvegardés</Text>
              <View style={styles.placeholder}>
                <View style={styles.placeholderInset}>
                  <Catalogues
                    store_id=""
                    category=""
                    saved_screen="yes"
                    setSaved={setSaved}
                    saved={saved}
                    setCatalogues={setCatalogues}
                    catalogues={catalogues}
                    loading={loading}
                  />
                </View>
              </View>
              <Text style={styles.sectiontitle}>Articles sauvegardés</Text>
              <View style={styles.placeholder}>
                <View style={styles.placeholderInset}>
                  <ProductCard />
                </View>
              </View>
            </>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image source={saveicon} resizeMode="contain" style={styles.saveicon} />
              <NotSignedIn message={"Connectez vous pour accéder à votre espace."} />
            </View>

          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveicon: {
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 10,
    paddingTop: 20
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
