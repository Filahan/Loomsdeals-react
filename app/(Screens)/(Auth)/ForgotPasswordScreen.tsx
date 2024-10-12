import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { auth } from '../../config/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { router } from 'expo-router';
import colors from "../../theme"; // Ensure you have colors defined

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Un e-mail de réinitialisation a été envoyé à votre adresse.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <Text style={styles.return}>
            <FeatherIcon color="#000" name="arrow-left" size={24} />
          </Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Réinitialiser le mot de passe</Text>
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

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handlePasswordReset}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Envoyer l'e-mail</Text>
                </View>
              </TouchableOpacity>
            </View>

            {message ? <Text style={styles.message}>{message}</Text> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity style={styles.footer}>
          <Text style={styles.formFooter}>
            Vous avez déjà un compte ?{' '}
            <Text
              style={styles.linkText}
              onPress={() => router.push('/login')}>
              Se connecter
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.primary, // Change to your primary color
    marginBottom: 6,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
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
    backgroundColor: '#F1F1F0', // Match the input background color from SignIn
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#fff', // Set border color
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
  message: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    marginTop: 'auto',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
