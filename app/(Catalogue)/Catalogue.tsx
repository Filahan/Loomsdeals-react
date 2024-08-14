import { router, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PDFViewer from './PDFViewer'; // Ensure the path is correct



export default function Catalogue({req}) {

    // const itemId = router.query.itemId;
    const {link} = useGlobalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
        <View style={styles.header}>
         <View style={styles.headerAction}>
          <TouchableOpacity onPress={() => router.back()}>
            <FeatherIcon color="#000" name="arrow-left" size={24} />
         </TouchableOpacity>
        </View>

      <Text numberOfLines={1} style={styles.headerTitle}>
         Catalogue
       </Text>

       <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
         <TouchableOpacity onPress={() => { /* handle onPress */ }}>
            <FeatherIcon color="#000" name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.profile}>
          </View>
        </View>
     <PDFViewer uri={link} />    
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profile: {
    margin: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
