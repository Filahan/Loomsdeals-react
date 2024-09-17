import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PDFViewer({ uri }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.content}>

      <WebView
        style={styles.webview}
        source={{ uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}

      />
      {loading && <ActivityIndicator style={styles.spinner} size="large" color="#002D62" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center', // Center the spinner vertically
  },
  webview: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust based on spinner size
  },
});
