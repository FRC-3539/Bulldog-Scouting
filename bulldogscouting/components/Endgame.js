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
import { styles, theme } from './Styles'

export function EndGame({ props }) {
    return (
        <View style={styles.generalViewStyle}>
            <Text>EndGame</Text>
        </View>
    )
}