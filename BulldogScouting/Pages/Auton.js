import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import testimage from "../assets/icon.png";
import useStateStore from "../Stores/StateStore"
import Counter from '../Components/Counter.js';

export default function Auton() {
    const { scoutName, matchData, noShow, set } = useStateStore();

    return (
        <View style={styles.container}>
            <Text>{scoutName}</Text>
            <Text>{JSON.stringify(matchData)}</Text>
            <Counter variable='reefAutonL1Count' disabled={noShow} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5
    },
    Slider: {
        width: "75%",
    },
    tinyLogo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    }
});
