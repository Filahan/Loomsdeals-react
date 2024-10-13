import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme';

export default function NotSignedIn({ message }) {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }} >
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/SigninScreen')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Se connecter</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 15 }}>
          <Text style={styles.formFooter}>
            Vous avez déjà un compte ?{' '}
            <Text style={{ textDecorationLine: 'underline' }} onPress={() => router.push('/SigninScreen')}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  content: {
    width: "95%",
    backgroundColor: "#EDF67D",
    padding: 30,
    paddingVertical: 30,

    borderRadius: 10,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center'
  },

  message: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
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
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
