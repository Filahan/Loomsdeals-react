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

interface Category {
  id: number;  // or string, depending on your data
  name: string;
}

export default function SearchScreen() {
  const [input, setInput] = useState('jjb');
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');
  const [categoriesCatalogue, setCategoriesCatalogue] = useState<Category[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of items per page
  const textInputRef = useRef<TextInput>(null);

  const routes = [
    { key: 'catalogues', title: 'Catalogues' },
    { key: 'produits', title: 'Produits' },
  ];


  useEffect(() => {
    textInputRef.current?.focus();

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

  const handleCatalogues = async (isLoadMore) => {
    const newPage = isLoadMore ? currentPage + 1 : 1;
    setCurrentPage(newPage);
    try {
      const { data, count } = await getCataloguesLike(input, newPage, pageSize);

      if (isLoadMore) {
        setCatalogues(prevCatalogues => [...prevCatalogues, ...data]);
      } else {
        setCatalogues(data);
      }

      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching catalogues: ', error);
    }
  };


  const filteredCatalogues = catalogues.filter((catalogue) => {
    if (!selectedCatalogueCategory) return true;
    return catalogue.stores.stores_categories.name === selectedCatalogueCategory;
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={() => router.back()}>
              <FeatherIcon color="#000" name="arrow-left" size={24} />
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
              onSubmitEditing={() => handleCatalogues(false)}
              placeholder="Rechercher..."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
              onChangeText={setInput} // Update state on text change
            />
          </View>
        </View>
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

        {
        filteredCatalogues.length ? (
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

        {(totalCount ?? 0) > currentPage * pageSize &&  filteredCatalogues.length > 0 && (
          <TouchableOpacity style={styles.paginationButton} onPress={() => handleCatalogues(true)}>
            <AntDesign name="plussquare" size={25} />
          </TouchableOpacity>
        )}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  search: {
    flex: 1,
    marginLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchControl: {
    height: 45,
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContent: {
    paddingHorizontal:16,
    paddingBottom:100,
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
    borderColor: '#e0e0e0',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
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
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#FFE5B4",
    borderColor: "#FFE5B4",
  },

  catImg: {
    height: 100,
    width: 70,
    borderRadius: 8,
  },
  paginationButton: {
    alignItems: 'center',
  }
});
