import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

const places = [
  {
    id: 1,
    catalog_img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    store_img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80", // Use the imported SVG component here
    name: 'Marbella, Spain',
    dates: 'Apr 23 - May 5',
  },
  {
    id: 2,
    catalog_img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    store_img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Baveno, Italy',
    dates: 'Apr 25 - May 5',
  },
  {
    id: 3,
    catalog_img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    store_img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
    dates: 'Apr 22 - May 4',
  },
];

export default function Catalogues() {
  const [saved, setSaved] = useState([]);

  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>


<ScrollView contentContainerStyle={styles.content}>
  <View style={styles.row}>
    {places.map(({ id, catalog_img, store_img, name, dates }, index) => {
      const isSaved = saved.includes(id);

      return (
        <TouchableOpacity
          key={id}
          style={styles.cardWrapper} // Add this style
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.card}>
            <View style={styles.cardLikeWrapper}>
            <TouchableOpacity >

            <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.cardlogo_img}
                  source={{ uri: store_img }}
                />
          </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSave(id)}>
                <View style={styles.cardLike}>
                  <FontAwesome
                    color={isSaved ? '#ea266d' : '#222'}
                    name="heart"
                    solid={isSaved}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.cardTop}>
              <Image
                alt=""
                resizeMode="cover"
                style={styles.cardcatalog_img}
                source={{ uri: catalog_img }}
              />
            </View>

            <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{name}</Text>

              <View style={styles.cardHeader}>

                
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardDates}>{dates}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
</ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    // paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Space them out
    width: '100%', // Ensure they occupy the full width
    paddingHorizontal: 12, // Add padding if needed
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardcatalog_img: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardlogo_img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 2,      // Adjust the width of the border as needed
    borderColor: 'white', // Set the color of the border to white
  },
  cardstore_img: {
    width: 40,
    height: 40,
    borderRadius:20,
    marginRight:50,
    // backgroundColor:"red"
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#232425',
  },
  cardDates: {
    marginTop: 4,
    fontSize: 12,
    color: '#595a63',
  },
  content: {
    flexGrow: 1,
    // flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%', // or 50% if you want no spacing between cards
    marginBottom: 10,
  },
});