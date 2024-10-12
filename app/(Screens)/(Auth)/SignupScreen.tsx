import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { auth, createUserWithEmailAndPassword } from '../../config/Firebase';
import { router } from 'expo-router';
import colors from "../../theme"; // Assuming you have a theme file similar to SignIn

const logo = require('../../asserts/shopslogos/logo.png'); // Optional logo import

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); // Assuming '/login' is the route for the login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <Text style={styles.return}>
            <FeatherIcon
              color="#000"
              name="arrow-left"
              size={24} />
          </Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image source={logo} resizeMode="contain" style={styles.logo} />
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Mot de passe</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={setConfirmPassword}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={confirmPassword} />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={handleSignUp}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>S'inscrire</Text>
                </View>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          style={{ marginTop: 30}}>
          <Text style={styles.formFooter}>
            Vous avez déjà un compte ?{' '}
            <Text style={{ textDecorationLine: 'underline' }} onPress={() => router.push('/SigninScreen')}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  logo: {
    height: 80, // Match logo height to SignIn
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  form: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  return: {

    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'left',
    marginLeft: 15,
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {

    height: 50,
    backgroundColor: '#F1F1F0',
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
