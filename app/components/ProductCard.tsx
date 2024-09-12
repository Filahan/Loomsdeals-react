import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../theme';

const products = [
  {
    id: '1',
    title: 'Product 1',
    price: '29.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    title: 'Product 2',
    price: '49.99',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    title: 'Product 3',
    price: '59.99',
    image: 'https://via.placeholder.com/300',
  },
];

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text></Text>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 6
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default App;
