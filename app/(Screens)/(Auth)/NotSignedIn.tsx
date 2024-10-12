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
    <View style={{ alignItems: 'center', marginTop: 20 }} >
      <View style={styles.content}>
        <Text style={styles.message}>Veuillez vous connecter pour accéder aux paramètres.</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/SigninScreen')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Se connecter</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  content: {
    backgroundColor: "#EDF67D",
    height: 180,
    bottom: 5,
    padding: 10,
    // margin: 20,
    borderRadius: 10,
    // paddingVertical: 30,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center'

  },

  message: {
    fontSize: 16,
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
    width: '80%',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Center button text
  },
});
