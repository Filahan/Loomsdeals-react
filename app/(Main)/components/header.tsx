import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Text, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';
import { auth } from '../../config/Firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

      {/* Modal Component */}
      {/* <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
        <AntDesign color="#6a99e3" name="closecircleo" size={24}  />
          </TouchableOpacity>
          <Text>User Settings</Text>
          <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
          <TouchableOpacity
        onPress={handleLogout}
        style={{ marginRight: 'auto' }}>
        <View style={styles.action}>
          <FeatherIcon color="#6a99e3" name="log-out" size={22} />
        </View>
      </TouchableOpacity>

        </View>
      </View>
    </Modal> */}
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

  modalContent: {
    width: "80%",
    height: "40%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
    borderRadius:10
  },
});
