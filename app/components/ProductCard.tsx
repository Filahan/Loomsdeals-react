import React from 'react';
import { SafeAreaView, FlatList, Text, View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper'; // You might need to install react-native-paper if you haven't
import colors from '../theme';

const products = [
  {
    id: '1',
    title: 'Product 1',
    price: '29.99',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
  },
  {
    id: '2',
    title: 'Product 2',
    price: '49.99',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
  },
  {
    id: '2',
    title: 'Product 2',
    price: '49.99',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
  },
  // Add more products as needed
];

const ProductCard = ({ product }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </View>
    </Card>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height:100,
    marginVertical: 7,
    marginHorizontal: 5,
    borderRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: colors.secondary
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 13,
    color: 'green',
    marginTop: 5,
  },
});

export default App;
