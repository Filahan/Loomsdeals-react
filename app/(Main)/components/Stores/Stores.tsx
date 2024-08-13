import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/Firebase'; // Adjust the path as needed

interface Lesson {
  url: string;
  name: string;
}

export default function Stores() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shops'));

        if (querySnapshot?.docs?.length) {
          const fetchedLessons: Lesson[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              url: data?.url ?? '',
              name: data?.name ?? 'Unnamed Store',
            };
          });
          setLessons(fetchedLessons);
        } else {
          console.error("No documents found in the 'shops' collection.");
        }
      } catch (error) {
        console.error("Error fetching lessons: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      {loading ? (
        <ScrollView contentContainerStyle={styles.container}>
{/*           
          <SkeletonContent
       	// containerStyle={{flex: 1, width: 300}}
        // isLoading={loading}
    /> */}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View><Text style={styles.StoreTitle}>Tous les magasins</Text></View>
          {lessons.map(({ name, url }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.card}>
                <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.cardImg}
                  source={{ uri: url }} />
                <View>
                  <Text style={styles.cardTitle}>{name}</Text>
                </View>
                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 14,
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
    marginBottom: 10,
  },
  cardStats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStatsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#636a73',
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: 'auto',
  },
  StoreTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  skeletonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 14,
  },
});
