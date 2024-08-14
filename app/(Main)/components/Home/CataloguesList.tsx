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
import { db } from '../../../config/Firebase'; // Adjust the path as needed
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface Catalogue {
  catalogues: any;
  link: string;
  title: string;
  start_date?: string;
  end_date?: string;
  storeData?: { url?: string };
  img: string;
}

interface CataloguesListProps {
  store_id: string;
}

const CataloguesList: React.FC<CataloguesListProps> = ({ store_id }) => {
  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        let querySnapshot;

        if (store_id) {
          const storeQuery = query(
            collection(db, 'catalogues'),
            where('store', '==', store_id)
          );
          querySnapshot = await getDocs(storeQuery);
        } else {
          querySnapshot = await getDocs(collection(db, 'catalogues'));
        }

        const fetchedCatalogues = querySnapshot.docs.map(doc => doc.data()) as Catalogue[];

        const updatedCatalogues = await Promise.all(fetchedCatalogues.map(async (catalogue) => {
          const updatedCatalogue = { ...catalogue, catalogues: await Promise.all(catalogue.catalogues.map(async (cat) => {
            if (cat.store) {
              const storeDocRef = doc(db, cat.store);
              const docSnapshot = await getDoc(storeDocRef);
              return { ...cat, storeData: docSnapshot.exists() ? docSnapshot.data() : null };
            }
            return cat;
          })) };

          return updatedCatalogue.catalogues;
        }));

        setCatalogues(updatedCatalogues);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching catalogues: ', error);
        setLoading(false);
      }
    };

    fetchCatalogues();
  }, [store_id]);

  const handleSave = useCallback(
    (id: string) => {
      setSaved(prevSaved => prevSaved.includes(id) ? prevSaved.filter(val => val !== id) : [...prevSaved, id]);
    },
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
    <SafeAreaView style={styles.content}>
      <ScrollView
        contentContainerStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {catalogues.map((catalogueGroup, groupIndex) =>
          catalogueGroup.map((catalogue, catalogueIndex) => {
            const { link, title, start_date, end_date, storeData, img } = catalogue;
            const isSaved = saved.includes(catalogueIndex.toString());

            return (
              <TouchableOpacity
                key={catalogueIndex}
                style={styles.cardWrapper}
                onPress={() => {
                  router.push({
                    pathname: '/CatalogueScreen',
                    params: { link, end_date },
                  });
                }}
              >
                <View style={styles.card}>
                  <View style={styles.cardLikeWrapper}>
                    <TouchableOpacity>
                      <Image
                        resizeMode="cover"
                        style={styles.cardlogo_img}
                        source={{ uri: storeData ? storeData.url : 'default-url' }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSave(catalogueIndex.toString())}>
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
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardDates}>
                          {start_date ? `Du ${start_date}` : ''} {end_date ? `au ${end_date}` : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
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
    borderWidth: 2,
    borderColor: 'white',
  },
  cardBody: {
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  StoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    flexGrow: 1,
    marginBottom: 15,
  },
  cardDates: {
    marginTop: 4,
    fontSize: 12,
    color: '#595a63',
  },
  content: {
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
  container: {
    flex: 1,
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
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default CataloguesList;
