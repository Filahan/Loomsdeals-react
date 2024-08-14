import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFViewer = ({ uri }) => {

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: uri }} style={styles.webView} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default PDFViewer;
