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

// Define styles
export const styles = StyleSheet.create({
    // General styles
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    generalViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },

    // Input styles
    SingleLineInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    // Input styles
    MultiLineInput: {
        textAlignVertical: 'top',
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },

    // Image styles
    setupImage: {
        width: '50%',
        height: undefined,
        aspectRatio: .654, // Maintain aspect ratio
        resizeMode: 'contain',
        borderRadius: 10, // Add rounded corners
    },

    // Radio button styles
    radioStyle: {
        padding: 0,
        margin: 0,
        color: 'black',
    },
    radioLabelStyle: {
        padding: 0,
        margin: 0,
    },
    radioView: {
        flexDirection: 'row',
        padding: 0,
        margin: 0,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Layout styles
    hstackFullWidth: {
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    hstack: {
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    vstack: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: "0.5625",
    },
});
