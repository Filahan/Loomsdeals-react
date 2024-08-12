
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
    store_img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80", // Use the imported SVG component here
    name: 'Marbella, Spain',
  },
  {
    id: 2,
    store_img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    name: 'Baveno, Italy',
  },
  {
    id: 3,
    store_img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
  },
  {
    id: 4,
    store_img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    name: 'Tucson, Arizona',
  },
];

export default function Stores() {
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
    {places.map(({ id, store_img, name }, index) => {
      const isSaved = saved.includes(id);

      return (
        <TouchableOpacity
          key={id}
          style={styles.cardWrapper} // Add this style
          onPress={() => {
            // handle onPress
          }}>
            <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.logo_img}
                  source={{ uri: store_img }}
                />            
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
  logo_img: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 9999,
    marginRight: 5,
    borderWidth: 3,  
    borderColor: '#E7E7E7', 
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
    width: '23%', // or 50% if you want no spacing between cards
    margin: 1, // or 50% if you want no spacing between cards
    marginBottom: 10,
  },
});