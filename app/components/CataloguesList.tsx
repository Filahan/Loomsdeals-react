import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text, // Added for the empty message
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import { auth } from '../config/Firebase';
import { getSavedCatalogueIds, removeSavedCatalogueId, saveCatalogueId } from '../api/saved';
import { getAllCatalogues, getCataloguesByIds } from '../api/catalogues';
import colors from '../theme';
const nocatalog = require('../asserts/nocatalog.jpg');

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

interface CataloguesListProps {
  category: string;
  store_id: string;
  saved_screen: string;
  saved: string[];
  setSaved: React.Dispatch<React.SetStateAction<string[]>>;
  catalogues: Catalogue[];
  setCatalogues: React.Dispatch<React.SetStateAction<Catalogue[]>>;
  loading: boolean;
}

const CataloguesList: React.FC<CataloguesListProps> = ({
  category,
  store_id,
  saved_screen,
  setSaved,
  saved,
  setCatalogues,
  catalogues,
  loading
}) => {
  const [emptyMessage, setEmptyMessage] = useState<string | null>(null);

  const userId = auth.currentUser?.uid;

  const handleSave = useCallback(
    async (id: string) => {
      try {
        const isSaved = saved.includes(id);
        if (isSaved) {
          await removeSavedCatalogueId(userId, id);
          if (saved_screen) {
            setCatalogues(prevCatalogues => prevCatalogues.filter(({ id: catalogueId }) => catalogueId !== id));
          }
          setSaved(prevSaved => prevSaved.filter(val => val !== id));
        } else {
          await saveCatalogueId(userId, id);
          setSaved(prevSaved => [...prevSaved, id]);
        }
      } catch (error) {
        console.error('Error saving/removing catalogue:', error);
      }
    },
    [saved, saved_screen, userId, setCatalogues, setSaved] // Add setCatalogues and setSaved as dependencies
  );

  useEffect(() => {
    if (!loading && catalogues.length === 0) {
      setEmptyMessage('Pas de catalogues sauvegardés');
    } else {
      setEmptyMessage(null);
    }
  }, [loading, catalogues]);

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
        {emptyMessage ? (
          <View style={styles.emptyContainer}>
            <Image
              resizeMode="contain"
              style={styles.nocatalog}
              source={nocatalog}
            />
          </View>
        ) : (
          catalogues.map((catalogue) => {
            if (!catalogue) return null;
            const { id, link, store, img, stores } = catalogue;
            const isSaved = saved.includes(id);
            return (
              <TouchableOpacity
                key={id}
                style={styles.cardWrapper}
                onPress={() => router.push({ pathname: '/CatalogueScreen', params: { link, end_date: catalogue.end_date } })}
              >
                <View style={styles.card}>
                  <View style={styles.cardLikeWrapper}>
                    {store && (
                      <TouchableOpacity>
                        <Image
                          resizeMode="cover"
                          style={styles.cardlogo_img}
                          source={{ uri: stores.url }}
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleSave(id)}>
                      <View style={styles.cardLike}>
                        <MaterialIcons
                          color={isSaved ? '#ea266d' : '#222'}
                          name="save-alt"
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
          })
        )}
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
    borderWidth: 1,
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
    marginHorizontal: 15,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
  },
  nocatalog: {
    height: 50,
    marginVertical:10
  },
});

export default CataloguesList;
