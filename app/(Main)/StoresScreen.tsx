import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Stores from '../components/StoresList';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [key, setKey] = useState(0); // Ajouter un état pour la clé

  const onRefresh = () => {
    setRefreshing(true);
    setKey(prevKey => prevKey + 1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} key={key}>
      
      <View style={styles.container}>

        <View style={styles.search}>
          <View style={styles.searchInput}>
            <View style={styles.inputWrapper}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="Rechercher un magasin"
                placeholderTextColor="#848484"
                returnKeyType="done"
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <View style={styles.inputIcon}>
                <FeatherIcon
                  color="#9eadba"
                  name="search"
                  size={16} />
              </View>
            </View>
          </View>
          <TouchableOpacity
        onPress={() => router.push("/Settings")}
        style={{ marginRight: 'auto' }}>
        <View style={styles.action}>
          <FeatherIcon color="#002D62" name="user" size={22} />
        </View>
      </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <Stores searchTerm={searchTerm} />
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
    flex: 1,
    padding: 24,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  action: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#f0f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
