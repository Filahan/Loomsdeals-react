import { auth } from '../../config/Firebase';

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';



export default function HomeScreen() {
    const handleLogout = async () => {
      try {
        await auth.signOut();
      } catch (err) {
        console.error(err.message);
      }
    };
    return (
<View style={styles.actionWrapper}>
<TouchableOpacity
onPress={handleLogout}
  style={{ marginRight: 'auto' }}>
  <View style={styles.action}>
    <FeatherIcon
      color="#6a99e3"
      name="log-out"
      size={22} />
  </View>
</TouchableOpacity>
            <TouchableOpacity
  onPress={() => {
    // handle onPress
  }}>
  <View style={styles.action}>
    <FeatherIcon
      color="#6a99e3"
      name="user"
      size={22} />
  </View>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    // handle onPress
  }}>
  <View style={styles.action}>
    <FeatherIcon
      color="#6a99e3"
      name="bell"
      size={22} />
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
      backgroundColor: '#e8f0f9',
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