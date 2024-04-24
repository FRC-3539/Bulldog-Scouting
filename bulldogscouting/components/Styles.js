import {
    TextInput,
    View,
    Text,
    Alert,
    SafeAreaView,
    StyleSheet,
    Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, HStack, NativeBaseProvider, extendTheme, Center, VStack } from 'native-base';
export const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: '#0051ff',
            100: '#ff0000',
            200: '#A2D4EC',
            300: '#7AC1E4',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#003F5E',
        },
    },
});

export const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    generalViewStyle: {
        alignItems: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});
