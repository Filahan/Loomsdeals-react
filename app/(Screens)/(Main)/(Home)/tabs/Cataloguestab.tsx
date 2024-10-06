import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';
import Catalogues from '../../../../components/List/CataloguesList';
import colors from '../../../../theme';
import { useFocusEffect } from 'expo-router';
import { getSavedCatalogueIds } from '../../../../api/saved';
import { getAllCatalogues } from '../../../../api/catalogues';
import { auth } from '../../../../config/Firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getStoresCategories } from '../../../../api/stores_categories';

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

export default function Cataloguestab() {
  const [categoriesCatalogue, setCategoriesCatalogue] = useState<Category[]>([]);
  const [selectedCatalogueCategory, setSelectedCatalogueCategory] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const userId = auth.currentUser?.uid;
  const pageSize = 5;

  const fetchCataloguesData = async (page: number, newpage) => {
    try {
      const savedList = await getSavedCatalogueIds(userId);
      setSaved(savedList);
      const { data: cataloguesData, count } = await getAllCatalogues(page, pageSize);
      if (page == 1 && catalogues.length > 0) {
        return;
      }
      setCatalogues((prev) => [...prev, ...cataloguesData]);
      setTotalCount(count);

    } catch (error) {
      console.error('Error fetching catalogues:', error);
      setSaved([]);
      setCatalogues([]);
    }
  };

  const handleFocusEffect = useCallback(() => {
    const fetchSaved = async () => {
      try {
        const savedList = await getSavedCatalogueIds(userId);
        setSaved(savedList);
      } catch (error) {
        console.error('Error fetching saved catalogues:', error);
        setSaved([]);
      }
    };

    fetchSaved();
  }, [userId]);

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
    fetchCataloguesData(currentPage, true);
  }, [currentPage]);

  useFocusEffect(handleFocusEffect);

  const loadMoreCatalogues = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const filteredCatalogues = catalogues.filter(catalogue =>
    !selectedCatalogueCategory || catalogue.stores.stores_categories.name === selectedCatalogueCategory
  );
  return (
    <ScrollView
    >
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
      <Catalogues
        store_id=""
        category=""
        saved_screen=""
        setSaved={setSaved}
        saved={saved}
        setCatalogues={setCatalogues}
        catalogues={filteredCatalogues}
        loading={false}
      />
      {(totalCount ?? 0) > currentPage * pageSize && filteredCatalogues.length > 0 && (
        <TouchableOpacity style={styles.paginationButton} onPress={loadMoreCatalogues}>
          <AntDesign name="plussquare" size={25} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  CataloguesTitle: {
    marginHorizontal: 15,
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    flexGrow: 1,
    letterSpacing: 0.4,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
    left: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#FFE5B4',
    borderColor: '#FFE5B4',
  },
  paginationButton: {
    alignItems: 'center',
    padding: 10,
  },
});
