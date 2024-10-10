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
import RNPickerSelect from 'react-native-picker-select';
import { router } from 'expo-router';
import { getStoresCategories } from '../../api/stores_categories';
import { getCataloguesLike } from '../../api/catalogues';
import colors from '../../theme';
const searchlogo = require('../../asserts/search.png');

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
  const pageSize = 3; // Number of items per page
  const [input, setInput] = useState('');
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');
  const [categoriesCatalogue, setCategoriesCatalogue] = useState<Category[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    textInputRef.current?.focus();

    if (currentPage == 1 && catalogues.length > 0) {
      return;
    }
    const fetchCategories = async () => {
      try {
        const response: Category[] = await getStoresCategories();
        setCategoriesCatalogue(response);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
    handleCatalogues(false);
  }, []);

  const handleCatalogues = async (isLoadMore: boolean) => {
    const newPage = isLoadMore ? currentPage + 1 : 1;
    setCurrentPage(newPage);


    try {
      const { data, count } = await getCataloguesLike(input, newPage, pageSize);
      setCatalogues(isLoadMore ? [...catalogues, ...data] : data);
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching catalogues: ', error);
    }
  };

  const filteredCatalogues = catalogues.filter(catalogue =>
    !selectedCatalogueCategory || catalogue.stores.stores_categories.name === selectedCatalogueCategory
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={() => router.back()}>
            <FeatherIcon color="#000" name="arrow-left" size={24} />
          </TouchableOpacity>
          <View style={styles.search}>
            <FontAwesome5 color="#848484" name="search" size={17} style={styles.searchIcon} />
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
              onChangeText={setInput}
            />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.searchContent}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={setSelectedCatalogueCategory}
              items={categoriesCatalogue.map(category => ({
                label: category.name,
                value: category.name,
              }))}
              placeholder={{ label: 'Catalogues', value: null }}
              value={selectedCatalogueCategory}
              style={pickerSelectStyles}
            />
          </View>
          {
            filteredCatalogues.map((catalogue, index) => (
              <View key={index} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/CatalogueScreen', params: { link: catalogue.link, end_date: catalogue.end_date } })}
                >
                  <View style={styles.card}>
                    <Image
                      resizeMode="contain"
                      source={{ uri: catalogue.img }}
                      style={styles.catImg}
                    />
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle}>{catalogue.title}</Text>
                      <Text style={styles.cardDate}>{catalogue.start_date} - {catalogue.end_date}</Text>
                      <Image resizeMode="cover" source={{ uri: catalogue.stores.url }} style={styles.storeLogo} />
                    </View>
                    <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          }
          {(totalCount ?? 0) > currentPage * pageSize && filteredCatalogues.length > 0 && (
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
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
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
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  storeLogo: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyIcon: {
    width: 90,
    height: 90,
  },
  cardWrapper: {
    borderColor: colors.secondary,
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
  cardDate: {
    fontSize: 12,
    color: '#9ca3af',
    paddingBottom: 2,
  },
  catImg: {
    height: 100,
    width: 70,
    borderRadius: 8,
  },
  paginationButton: {
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 40,
    borderColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    flex: 1,
  },
  inputAndroid: {
    fontSize: 16,
    height: 40,
    borderColor: colors.secondary,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    flex: 1,
  },
});
