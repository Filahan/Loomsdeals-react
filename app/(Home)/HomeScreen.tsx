// HomeScreen.js
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../config/Firebase';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
