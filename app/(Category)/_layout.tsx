import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router, useGlobalSearchParams } from 'expo-router';
import CataloguesList from '../(Main)/components/Home/CataloguesList';

export default function Catégorie() {
  const { store_id, url } = useGlobalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0); // Ajouter un état pour la clé

  const onRefresh = () => {
    setRefreshing(true);
    setKey(prevKey => prevKey + 1);
    setRefreshing(false);
  };

  // Ensure url is a string and defined
  const imageUrl = typeof url === 'string' ? url : '';
  const logo = typeof store_id === 'string' ? store_id : '';

  return (
    <SafeAreaView style={styles.container} key={key}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerAction}>
          <FeatherIcon color="#000" name="arrow-left" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.avatarImg}
                alt=""
              />
            </View>
          </View>
        </View>
        <View style={styles.placeholder}>
          <View style={styles.placeholderInset}>
            <CataloguesList store_id={logo} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  profileTop: {
    alignItems: 'center',
  },
  profileBody: {
    marginTop: 16,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121a26',
  },
  // Avatar Styles
  avatar: {
    marginBottom: 16,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E7E7E7',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 5,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
