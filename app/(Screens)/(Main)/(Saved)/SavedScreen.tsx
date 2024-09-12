import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../../theme';

export default function SavedScreen() {
  const savedItems = [
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: '$150',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: '$799',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const savedCatalogues = [
    {
      id: 1,
      title: 'Lidl Catalogue - September',
      image: 'https://via.placeholder.com/150',
      link: 'https://example.com/lidl-sept',
    },
    {
      id: 2,
      title: 'Aldi Catalogue - August',
      image: 'https://via.placeholder.com/150',
      link: 'https://example.com/aldi-aug',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mes sauvegardes</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catalogues sauvegardés</Text>

          {savedCatalogues.length > 0 ? (
            savedCatalogues.map((catalogue) => (
              <View key={catalogue.id} style={styles.catalogueCard}>
                <Image source={{ uri: catalogue.image }} style={styles.catalogueImage} />
                <View style={styles.catalogueDetails}>
                  <Text style={styles.catalogueTitle}>{catalogue.title}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                  <FeatherIcon name="eye" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>Aucun catalogue sauvegardé.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Articles sauvegardés</Text>

          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                  <FeatherIcon name="shopping-cart" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>Aucun article sauvegardé.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  catalogueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
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
  catalogueImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  catalogueDetails: {
    flex: 1,
  },
  catalogueTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
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
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});
