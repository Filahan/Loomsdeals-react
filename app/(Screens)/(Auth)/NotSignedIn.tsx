import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../theme';

export default function NotSignedIn() {
  return (

    <View style={styles.content}>
      <Text style={styles.message}>Veuillez vous connecter pour accéder aux paramètres.</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/SigninScreen')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Se connecter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.secondary,
    padding: 15,
    margin: 20,
    borderRadius: 10,
    paddingVertical: 30,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center content horizontally
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color: '#4A4A4A',
    textAlign: 'center', // Center text
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Center button text
  },
});
