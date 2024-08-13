import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Text, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';

export default function Header() {


  return (
    <View style={styles.actionWrapper}>
      <TouchableOpacity
        onPress={() => router.push("/Settings")}
        style={{ marginRight: 'auto' }}>
        <View style={styles.action}>
          <FeatherIcon color="#002D62" name="user" size={22} />
        </View>
      </TouchableOpacity>
      

      <TouchableOpacity
        onPress={() => {
          // handle onPress
        }}>
        <View style={styles.action}>
          <FeatherIcon color="#002D62" name="bell" size={22} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Action */
  action: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
  },
});
