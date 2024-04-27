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

export function Auton({ props }) {
    return (
        <View style={styles.generalViewStyle}>
            <Text style={{ fontSize: 30 }}>Auton</Text>
            <View style={styles.vstack}>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Notes</Text>
                        <Text style={{ fontSize: 20 }}>{props.notes}</Text>
                        <Button onPress={() => props.setNotes(props.notes + 1)} title='+'></Button>
                        <Button onPress={() => props.setNotes(props.notes - 1)} title='-'></Button>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Bumps</Text>
                        <Text style={{ fontSize: 20 }}>{props.bumps}</Text>
                        <Button onPress={() => props.setBumps(props.bumps + 1)} title='+'></Button>
                        <Button onPress={() => props.setBumps(props.bumps - 1)} title='-'></Button>
                    </View>
                </View>
            </View >
        </View >
    )
}