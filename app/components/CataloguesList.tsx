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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { db } from '../config/Firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { MotiView } from 'moti';
import { router } from 'expo-router';

interface Catalogue {
  catalogues: any;
  link: string;
  title: string;
  start_date?: string;
  end_date?: string;
  store?: { url?: string, id?: string };
  img: string;
}

interface CataloguesListProps {
  category: string;
  store_id: string;
}

const CataloguesList: React.FC<CataloguesListProps> = ({ category, store_id }) => {
  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        let querySnapshot;
        const collectionRef = collection(db, 'catalogues');
        
        if (store_id) {
          querySnapshot = await getDocs(query(collectionRef, where('store', '==', store_id)));
        } else if (category) {
          querySnapshot = await getDocs(query(collectionRef, where('category', '==', category)));
        } else {
          querySnapshot = await getDocs(collectionRef);
        }

        const fetchedCatalogues = querySnapshot.docs.map(doc => doc.data() as Catalogue[]);
        const updatedCatalogues = await Promise.all(fetchedCatalogues.map(async (catalogue) => {
          const updatedCatalogue = { ...catalogue, catalogues: await Promise.all(catalogue.catalogues.map(async (cat) => {
            if (cat.store) {
              const docSnapshot = await getDoc(doc(db, cat.store));
              return { ...cat, store: docSnapshot.exists() ? docSnapshot.data() : null };
            }
            return cat;
          })) };
          return updatedCatalogue.catalogues;
        }));

        setCatalogues(updatedCatalogues);
      } catch (error) {
        console.error('Error fetching catalogues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogues();
  }, [store_id, category]);

  const handleSave = useCallback(
    (id: string) => setSaved(prevSaved => prevSaved.includes(id) ? prevSaved.filter(val => val !== id) : [...prevSaved, id]),
    [],
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
          const { link, store, img } = catalogue;
          const isSaved = saved.includes(index.toString());

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
                  <TouchableOpacity onPress={() => handleSave(index.toString())}>
                    <View style={styles.cardLike}>
                      <FontAwesome
                        color={isSaved ? '#ea266d' : '#222'}
                        name="heart"
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
    width: 40,
    height: 40,
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
