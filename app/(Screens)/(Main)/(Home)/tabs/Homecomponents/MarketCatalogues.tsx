
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../../../theme';
import { useFocusEffect } from 'expo-router';
import { getSavedCatalogueIds } from '../../../../../api/saved';
import { getAllCatalogues } from '../../../../../api/catalogues';
import { auth } from '../../../../../config/Firebase';
import CatalogueHorizontalList from '../../../../../components/List/CatalogueHorizontalList';

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


export default function MarketCatalogues() {
  const [saved, setSaved] = useState<string[]>([]);
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const userId = auth.currentUser?.uid;
  const pageSize = 5;

  const fetchCataloguesData = async (page: number, newpage) => {
    try {
      const savedList = await getSavedCatalogueIds(userId);
      setSaved(savedList);
      const { data: cataloguesData, count } = await getAllCatalogues(page, pageSize);
      setCatalogues(cataloguesData);
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
    fetchCataloguesData(currentPage, true);
  }, [currentPage]);

  useFocusEffect(handleFocusEffect);

  return (
    <ScrollView
    >
      <CatalogueHorizontalList
        store_id=""
        category=""
        saved_screen=""
        setSaved={setSaved}
        saved={saved}
        setCatalogues={setCatalogues}
        catalogues={catalogues}
        loading={false}
      />
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
    backgroundColor: colors.secondary,
    left: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  paginationButton: {
    alignItems: 'center',
    padding: 10,
  },
  activeButtonText: {
    color: "white"
  },
});
