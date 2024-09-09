import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/Firebase'; // Adjust the path as needed
import { MotiView } from 'moti';
import { router } from 'expo-router';
import axios from 'axios';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let url = 'http://localhost:8000/stores_categories';
        const response = await axios.get(url);
        setImages(response.data);
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
                    url: image.url }
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
    // borderColor: colors.primary,
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

export default ImageList;

