import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../../theme';
import { router } from 'expo-router';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: 'white' }}
    activeColor="#000"
    inactiveColor="#888"
  />
);

const catalogues = [
  { title: 'Catalogue Lidl', img: '', date: '10/2024', category: 'Supermarket' },
  { title: 'Catalogue Aldi', img: '', date: '11/2024', category: 'Discount' },
  // Add more catalogues here
];

const produits = [
  { name: 'Pomme', img: '', price: '2.99€', category: 'Fruits' },
  { name: 'Banane', img: '', price: '1.99€', category: 'Fruits' },
  // Add more products here
];

const categoriesCatalogue = ['Supermarket', 'Discount', 'Electronics'];
const categoriesProduct = ['Fruits', 'Vegetables', 'Drinks'];

export default function SearchScreen() {
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');

  const [routes] = useState([
    { key: 'catalogues', title: 'Catalogues' },
    { key: 'produits', title: 'Produits' },
  ]);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const renderCatalogues = () => (
    <ScrollView contentContainerStyle={styles.searchContent}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {categoriesCatalogue.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() =>
              setSelectedCatalogueCategory(prev =>
                prev === category ? '' : category
              )
            }
            style={[
              styles.filterButton,
              selectedCatalogueCategory === category && styles.filterButtonActive
            ]}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {catalogues.length ? (
        catalogues.map((catalogue, index) => (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => { /* Action on click */ }}>
              <View style={styles.card}>
                <View style={styles.cardImg}>
                  <Text>{catalogue.title[0]}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{catalogue.title}</Text>
                  <Text style={styles.cardPhone}>{catalogue.date}</Text>
                </View>
                <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.searchEmpty}>Aucun catalogue trouvé</Text>
      )}
    </ScrollView>
  );

  const renderProduits = () => (
    <ScrollView contentContainerStyle={styles.searchContent}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {categoriesProduct.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() =>
              setSelectedProductCategory(prev =>
                prev === category ? '' : category
              )
            }
            style={[
              styles.filterButton,
              selectedProductCategory === category && styles.filterButtonActive
            ]}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {produits.length ? (
        produits.map((produit, index) => (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => { /* Action on click */ }}>
              <View style={styles.card}>
                <View style={styles.cardImg}>
                  <Text>{produit.name[0]}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{produit.name}</Text>
                  <Text style={styles.cardPhone}>{produit.price}</Text>
                </View>
                <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.searchEmpty}>Aucun produit trouvé</Text>
      )}
    </ScrollView>
  );

  const renderScene = SceneMap({
    catalogues: renderCatalogues,
    produits: renderProduits,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>

        <View style={styles.searchWrapper}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}>
            <Text style={styles.return}>
              <FeatherIcon
                color="#000"
                name="arrow-left"
                size={24} />
            </Text>
          </TouchableOpacity>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FontAwesome5 color="#848484" name="search" size={17} />
            </View>
            <TextInput
              ref={textInputRef}  // Attach the ref to the TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(val) => setInput(val)}
              placeholder="Rechercher..."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
            />
          </View>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          lazy
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
  search: {
    borderRadius: 7,
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 15,

    alignItems: 'center',
  },
  searchIcon: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchControl: {
    height: 40,
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContent: {
    padding: 16,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 15,
    color: '#9ca1ac',
  },
  searchMessage: {
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#616d79',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginLeft: 12,
    marginRight: 'auto',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    color: '#616d79',
    marginTop: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: "#FFE5B4",
    borderColor: "#FFE5B4"
  },
  return: {

  },
});
