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
import { collection, getDocs } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { MotiView } from 'moti';

const Catalogues = () => {
  const [saved, setSaved] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'catalogues'));
        const fetchedCatalogues = querySnapshot.docs.map(doc => (doc.data() ));

        const updatedCatalogues = await Promise.all(fetchedCatalogues.map(async (catalogue) => {
          const updatedCatalogue = { ...catalogue, catalogues: await Promise.all(catalogue.catalogues.map(async (cat) => {
            if (cat.store) {
              const storeDocRef = doc(db, cat.store); // Use cat.store to fetch the correct store
              const docSnapshot = await getDoc(storeDocRef);
              return { ...cat, storeData: docSnapshot.exists() ? docSnapshot.data() : null };
            }
            return cat;
          })) };

          return updatedCatalogue.catalogues;
        }));

        setCatalogues(updatedCatalogues);
        setLoading(false); // Set loading to false after data is fetched

      } catch (error) {
        console.error('Error fetching catalogues: ', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchCatalogues();
  }, []);

  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved],
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
      <View>
        <Text style={styles.StoreTitle}>Explorer les catalogues</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {catalogues.map((catalogueGroup, groupIndex) => {
          return catalogueGroup.map((catalogue, catalogueIndex) => {
            const { link, title, start_date, end_date, storeData } = catalogue;
            const isSaved = saved.includes(catalogueIndex.toString());

            return (
              <TouchableOpacity
                key={catalogueIndex}
                style={styles.cardWrapper}
                onPress={() => {
                  // handle onPress
                }}>
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
                      resizeMode="cover"
                      style={styles.cardcatalog_img}
                      source={{ uri: link }}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardDates}>
                          {start_date ? `From: ${start_date}` : ''} - {end_date ? `To: ${end_date}` : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          });
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /** Header */
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
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 1 },
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
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  StoreTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
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
    marginBottom: 10,
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
    width: '48%', // Adjust as needed
    height: 200,
    marginBottom: 10,
    padding: 16,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#f5f5f5', // Light background color
  },
  text: {
    fontSize: 16,
    color: '#000', // Text color
  },
});

export default Catalogues;
``
