import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import { getStoresCategories } from '../api/stores_categories';

interface ImageType {
  id: string;
  url: string;
}

const StoresCatCaroussel = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getStoresCategories();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 800, loop: true }}
              style={styles.skeleton}
            />
          ))
        ) : (
          images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.push({
                  pathname: '/CategoryScreen',
                  params: {
                    category_id: image.id,
                    url: image.url
                  }
                });
              }}
              style={styles.imageContainer}
            >
              <Image source={{ uri: image.url }} style={styles.image} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left:10

  },
  scrollContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
    marginTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 12,
    shadowRadius: 4,
    elevation: 4,
  },
  skeleton: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  divider: {
    width: '100%',
    height: 0,
    backgroundColor: '#CCCCCC',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default StoresCatCaroussel;
