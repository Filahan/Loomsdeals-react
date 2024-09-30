import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../../theme';
import { router } from 'expo-router';
import { getStoresCategories } from '../../api/stores_categories';
import { getCataloguesLike } from '../../api/catalogues';


interface Catalogue {
  id: string;
  link: string;
  title: string;
  start_date: string;
  end_date: string;
  stores: { url: string; stores_categories: { name: string } };
  store: string;
  img: string;
}


const produits = [
  { name: 'Pomme', price: '2.99€', category: 'Fruits' },
  { name: 'Banane', price: '1.99€', category: 'Fruits' },
];

const categoriesProduct = ['Fruits', 'Vegetables', 'Drinks'];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }}
    style={{ backgroundColor: 'white' }}
    activeColor="#000"
    inactiveColor="#888"
  />
);

export default function SearchScreen() {

  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [categoriesCatalogue, setCategoriesCatalogue] = useState<Category[]>([]);

  const textInputRef = useRef<TextInput>(null);
  const routes = [
    { key: 'catalogues', title: 'Catalogues' },
    { key: 'produits', title: 'Produits' },
  ];
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(0); // State for total count of catalogues
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const pageSize = 3; // Number of items per page


  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  interface Category {
    id: number;  // or string, depending on your data
    name: string;
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: Category[] = await getStoresCategories();
        setCategoriesCatalogue(response);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
  }, []);

  const renderCatalogues = () => {
    const filteredCatalogues = catalogues.filter((catalogue) => {
      if (!selectedCatalogueCategory) return true; // Show all if no category is selected
      return catalogue.stores.stores_categories.name === selectedCatalogueCategory;
    });

    return (
      <ScrollView contentContainerStyle={styles.searchContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {categoriesCatalogue.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCatalogueCategory((prev) => (prev === category.name ? '' : category.name))}
              style={[
                styles.filterButton,
                selectedCatalogueCategory === category.name && styles.filterButtonActive,
              ]}
            >
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {filteredCatalogues.length ? (
          filteredCatalogues.map((catalogue, index) => (
            <View key={index} style={styles.cardWrapper}>
              <TouchableOpacity
                onPress={() => router.push({ pathname: '/CatalogueScreen', params: { link: catalogue.link, end_date: catalogue.end_date } })}
              >
                <View style={styles.card}>
                  <View style={styles.catImg}>
                    <Image
                      resizeMode="contain"
                      source={{ uri: catalogue.img }}
                      style={{ height: "100%", backgroundColor: "grey", borderRadius: 5 }}
                    />
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{catalogue.title}</Text>
                    <Text style={styles.carddate}>{catalogue.start_date} - {catalogue.end_date}</Text>
                    <Image resizeMode="cover" source={{ uri: catalogue.stores.url }} style={styles.storelogo}></Image>
                  </View>
                  <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.searchEmpty}>Aucun catalogue trouvé</Text>
        )}

        {(totalCount ?? 0) > currentPage * pageSize && ( // Check if there are more pages
          <TouchableOpacity style={styles.paginationButton} onPress={handleLoadMore}>
            {/* <FeatherIcon color="#9ca3af" name="loader" size={25} /> */}
            <AntDesign color="#9ca3af" name="pluscircleo" size={25} />

          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };
  const handleLoadMore = async () => {
    setCurrentPage(prev => prev + 1);
    try {
      const { data, count } = await getCataloguesLike(input, currentPage, pageSize);
      setCatalogues(prevCatalogues => [...prevCatalogues, ...data]);

      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching catalogues: ', error);
    }
  };
  const renderProduits = () => {
    const filteredProduits = produits.filter((produit) => {
      if (!selectedProductCategory) return true; // Show all if no category is selected
      return produit.category === selectedProductCategory;
    });

    return (
      <ScrollView contentContainerStyle={styles.searchContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {categoriesProduct.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedProductCategory((prev) => (prev === category ? '' : category))}
              style={[
                styles.filterButton,
                selectedProductCategory === category && styles.filterButtonActive,
              ]}
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {filteredProduits.length ? (
          filteredProduits.map((produit, index) => (
            <View key={index} style={styles.cardWrapper}>
              <TouchableOpacity>
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
  };

  const renderScene = SceneMap({
    catalogues: renderCatalogues,
    produits: renderProduits,
  });
  let handleInputSubmit = async () => {
    setCurrentPage(1);
    try {
      const { data, count } = await getCataloguesLike(input, currentPage, pageSize);
      setCatalogues(data);
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching catalogues: ', error);
    }
  };
  const handleInputChange = (text: string) => {
    setInput(text);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>
              <FeatherIcon color="#000" name="arrow-left" size={24} />
            </Text>
          </TouchableOpacity>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FontAwesome5 color="#848484" name="search" size={17} />
            </View>
            <TextInput
              ref={textInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={handleInputChange} // Call the function here
              onSubmitEditing={handleInputSubmit} // Call the function on submit
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: colors.secondary,
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
  storelogo: {
    height: 30,
    width: 30,
    borderRadius: 100

  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 15,
    color: '#9ca1ac',
  },
  cardWrapper: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#9ca3af',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBody: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPhone: {
    fontSize: 12,
    color: '#9ca3af',
  },

  carddate: {
    fontSize: 12,
    color: '#9ca3af',
    paddingBottom: 2
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#FFE5B4",
    borderColor: "#FFE5B4",
  },
  return: {
    // fontSize: 13,
    color: '#000',
  },
  catImg: {
    height: 100,
    width: 70,
    borderRadius: 12,
  },
  paginationButton: {
    // padding: 10,
    // backgroundColor: colors.primary,
    // borderRadius: 5,
    alignItems: 'center',
    // marginTop: 10,
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
