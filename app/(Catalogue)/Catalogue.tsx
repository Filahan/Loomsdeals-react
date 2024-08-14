import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PDFViewer from './PDFViewer'; // Assure-toi que le chemin est correct
import { Chip } from 'react-native-paper'; // Import Chip component
import { router, useGlobalSearchParams } from 'expo-router';

// Ajoute cette section pour la date d'expiration
const ExpirationDate = ({ date }) => (
  <View style={styles.expirationContainer}>
    <FeatherIcon name="calendar" size={20} color="#002D62" />
    <Text style={styles.expirationText}>Date d'expiration: {date}</Text>
  </View>
);

export default function Catalogue() {
    const { link, end_date } = useGlobalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerAction} onPress={() => router.back()}>
                <FeatherIcon color="#000" name="arrow-left" size={24} />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.headerTitle}>
                Catalogue
            </Text>
            <TouchableOpacity style={styles.headerAction}>
                {/* Add functionality if needed */}
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            {end_date && (
                <View style={styles.section}>
                    <ExpirationDate date={end_date} />
                </View>
            )}
            <PDFViewer uri={link} />
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
            },
    headerAction: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4A4A4A',
        textAlign: 'center',
        flexGrow: 1,
        letterSpacing: 1.2,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    section: {
        paddingVertical: 12,
    },
    pdfViewer: {
        flex: 1,
        marginTop: 8,
    },
    expirationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    expirationText: {
        marginLeft: 10,
        fontSize: 13,
        color: '#333',
    },
});
