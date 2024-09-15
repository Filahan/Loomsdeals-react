import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import axios from 'axios';
import config from '../config/config';
import { auth } from '../config/Firebase';
import { useFocusEffect } from '@react-navigation/native';

interface Catalogue {
  id: string;
  link: string;
  title: string;
  start_date?: string;
  end_date?: string;
  store?: { url?: string; id?: string };
  img: string;
}



interface CataloguesListProps {
  category: string;
  store_id: string;
  saved_screen: string;
}

const CataloguesList: React.FC<CataloguesListProps> = ({ category, store_id, saved_screen}) => {

  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid; // Check for null/undefined user
  useEffect(() => {
    const fetchCataloguesData = async () => {
      if (!userId) return;

      try {
        const savedUrl = `${config.apiurl}/saved_catalogues_ids/${userId}`;
        const savedResponse = await axios.get(savedUrl);
        const savedList = Array.isArray(savedResponse.data) ? savedResponse.data : [];
        setSaved(savedList);

        let cataloguesUrl = `${config.apiurl}/catalogues`;
        if (store_id) cataloguesUrl += `/${store_id}`;
        if (saved_screen) cataloguesUrl += `/cat_id=${savedList}`;

        const cataloguesResponse = await axios.get(cataloguesUrl);
        setCatalogues(cataloguesResponse.data);
      } catch {
        setSaved([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCataloguesData();
  }, [store_id, userId, saved_screen]);

  const saveCatalogue = async (catalogueId: string) => {
    try {
      await axios.post(`${config.apiurl}/save_catalogue_id/${userId}/${catalogueId}`);
    } catch (error) {
      console.error('Error saving catalogue:', error);
    }
  };
  
  const removeCatalogue = async (catalogueId: string) => {
    try {
      await axios.delete(`${config.apiurl}/remove_saved_catalogue_id/${userId}/${catalogueId}`);
      if (saved_screen){
      setCatalogues((prevCatalogues) => prevCatalogues.filter(catalogue => catalogue.id !== catalogueId));
    }

    } catch (error) {
      console.error('Error removing catalogue:', error);
    }
  };
  


  const handleSave = useCallback(
    async (id: string) => {
      setSaved(prevSaved => {
        const isSaved = prevSaved.includes(id);
        if (!isSaved) {
          saveCatalogue(id); 

        }
        else
        {
          setCatalogues(prevCatalogues => [...prevCatalogues, { id, link: '', title: '', img: '', start_date: '', end_date: '', store: {} }]); // Adjust as needed

          removeCatalogue(id);
        }
        return isSaved ? prevSaved.filter(val => val !== id) : [...prevSaved, id];
      });
    },
    [userId]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.skeletonRow}>
          {Array(9).fill(null).map((_, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1000, loop: true }}
              style={styles.skeletonItem}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {catalogues.flat().map((catalogue, index) => {
          const { id, link, store, img } = catalogue;
          const isSaved = saved.includes(id.toString());
          return (
            <TouchableOpacity
              key={index}
              style={styles.cardWrapper}
              onPress={() => router.push({ pathname: '/CatalogueScreen', params: { link, end_date: catalogue.end_date } })}
            >
              <View style={styles.card}>
                <View style={styles.cardLikeWrapper}>
                  {store && (
                    <TouchableOpacity onPress={() => router.push({ pathname: '/StoreScreen', params: { store_id: store.id, url: store.url } })}>
                      <Image
                        resizeMode="cover"
                        style={styles.cardlogo_img}
                        source={{ uri: store.url }}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => handleSave(id)}>
                    <View style={styles.cardLike}>
                      <MaterialIcons
                        color={isSaved ? '#ea266d' : '#222'}
                        name="save-alt"
                        solid={isSaved}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardTop}>
                  <Image
                    resizeMode="contain"
                    style={styles.cardcatalog_img}
                    source={{ uri: img }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 1
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
  },
  cardLike: {
    width: 35,
    height: 35,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardcatalog_img: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardlogo_img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  skeletonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonItem: {
    width: '48%',
    height: 200,
    marginBottom: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
});

export default CataloguesList;
