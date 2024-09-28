import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../../../theme';
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primary }} // Indicator color
    style={{ backgroundColor: 'white' }} // Tab bar background color
    activeColor="#000" // Active tab text color
    inactiveColor="#888" // Inactive tab text color
  />
);
const catalogues = [
  { title: 'Catalogue Lidl', img: '', date: '10/2024' },
  { title: 'Catalogue Aldi', img: '', date: '11/2024' },
  // Ajoute d'autres catalogues ici
];

const produits = [
  { name: 'Pomme', img: '', price: '2.99€' },
  { name: 'Banane', img: '', price: '1.99€' },
  // Ajoute d'autres produits ici
];

export default function SearchScreen() {
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);

  // TabView configuration
  const [routes] = useState([
    { key: 'catalogues', title: 'Catalogues' },
    { key: 'produits', title: 'Produits' },
  ]);

  // Filtrer les catalogues et produits
  const filteredCatalogues = useMemo(() => {
    return catalogues.filter(catalogue =>
      catalogue.title.toLowerCase().includes(input.toLowerCase())
    );
  }, [input]);

  const filteredProduits = useMemo(() => {
    return produits.filter(produit =>
      produit.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input]);

  // Render pour les catalogues
  const renderCatalogues = () => (
    <ScrollView contentContainerStyle={styles.searchContent}>
      {filteredCatalogues.length ? (
        filteredCatalogues.map((catalogue, index) => (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => { /* Action au clic */ }}>
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

  // Render pour les produits
  const renderProduits = () => (
    <ScrollView contentContainerStyle={styles.searchContent}>
      {filteredProduits.length ? (
        filteredProduits.map((produit, index) => (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity onPress={() => { /* Action au clic */ }}>
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
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FontAwesome5 color="#848484" name="search" size={17} />
            </View>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={val => setInput(val)}
              placeholder="Rechercher..."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input}
            />
          </View>
        </View>

        {/* TabView pour switcher entre Catalogues et Produits */}
        <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    renderTabBar={renderTabBar} // Use the custom TabBar
  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  search: {
    backgroundColor: colors.secondary,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',
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
});
