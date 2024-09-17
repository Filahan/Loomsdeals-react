import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const images = [
    { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const handleImageLoad = () => setLoading(false);

  return (
    <View style={styles.container}>
      <Carousel
        loop={true} // Set to true for continuous looping
        width={width} // Full width of the screen
        height={200}
        data={images}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {loading && (
              <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, type: 'timing', duration: 500 }}
                style={styles.skeleton}
              />
            )}
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              onLoad={handleImageLoad}
            />
          </View>
        )}
        style={styles.carousel}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index === currentIndex ? 1 : 0.6 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 200,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 20, // Space between items
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0e0e0',
    zIndex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#6b7280',
  },
  carousel: {
    paddingHorizontal: 100, // Add padding to accommodate spacing
  },
});

export default App;
