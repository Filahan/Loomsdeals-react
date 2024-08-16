import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase'; // Adjust the path as needed
import { MotiView } from 'moti';
import { router } from 'expo-router';

interface Lesson {
  url: string;
  name: string;
  id: string;
}

export default function Stores({ searchTerm }: { searchTerm: string }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'stores'));

      if (querySnapshot.docs.length) {
        const fetchedLessons: Lesson[] = querySnapshot.docs.map(doc => ({
          url: doc.data().url || '',
          name: doc.data().name || 'Unnamed Store',
          id: doc.data().id || '',
        }));
        setLessons(fetchedLessons);
      }
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Reset refreshing state
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLessons();
  }, [fetchLessons]);

  const renderSkeleton = () => (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      {Array(20).fill(null).map((_, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1000, loop: true }}
          style={styles.skeletonContainer}
        >
          <View style={styles.skeletonItem} />
          <View style={styles.skeletonText} />
        </MotiView>
      ))}
    </ScrollView>
  );

  const renderStores = () => {
    const filteredLessons = lessons.filter(lesson =>
      lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.map(({ name, url, id }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push({
                pathname: '/StoreScreen',
                params: { 
                  store_id: id, 
                  url: url }
              });
            }}
          >
            <View style={styles.card}>
              <Image
                resizeMode="cover"
                style={styles.cardImg}
                source={{ uri: url }}
              />
              <View>
                <Text style={styles.cardTitle}>{name}</Text>
              </View>
              <View style={styles.cardAction}>
                <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      {loading ? renderSkeleton() : renderStores()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A4A4A',
    textAlign: 'center',
    flexGrow: 1,
    letterSpacing: 1.2,
},
  container: {
    paddingTop: 10,
    flexGrow: 1,
  },
  card: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E7E7E7',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  cardAction: {
    marginLeft: 'auto',
  },
  skeletonContainer: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skeletonItem: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: '#E0E0E0',
  },
  skeletonText: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginLeft: 12,
  },
});
