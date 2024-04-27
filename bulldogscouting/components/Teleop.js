import {
    TextInput,
    View,
    Text,
    Alert,
    SafeAreaView,
    StyleSheet,
    Platform,
    Button,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles, theme } from './Styles'


export function Teleop({ props }) {
    return (
        <View style={styles.generalViewStyle}>

            <Text>Teleop</Text>
            <Button title="Up" onPress={() => props.setBumps(props.bumps + 1)} />
            <Button title="Down" onPress={() => props.setBumps(props.bumps - 1)} />
            <Text>{props.bumps}</Text>

        </View>
    )
}