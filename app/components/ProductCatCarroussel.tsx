import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { router } from 'expo-router';
import { getStoresCategories } from '../api/stores_categories';


const ProductCatCarroussel = () => {
  interface StoresCategory {
    url: string;
    id: string;
    name: string;
  }

  const [images, setImages] = useState<StoresCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response: StoresCategory[] = await getStoresCategories();
        setImages(response);
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
              {/* <Image source={{ uri: image.url }} style={styles.image} /> */}
              <Image style={styles.image} />

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
    paddingHorizontal:15,
    flex: 1,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
    marginTop: 20,
  },
  image: {
    backgroundColor: "#cecece",
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 1000,
    shadowRadius: 4,
    elevation: 4,

  },
  skeleton: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 1000,
  },
  divider: {
    width: '100%',
    height: 0,
    backgroundColor: '#CCCCCC',
    // marginBottom: 10,
    marginTop: 10,
  },
});

export default ProductCatCarroussel;

