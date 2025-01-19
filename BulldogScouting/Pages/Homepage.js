import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import startPositionImage from "../assets/AutonStartingPosition.png";
import startPositionImageRotated from "../assets/AutonStartingPositionRotated.png";
import { Switch } from 'react-native';
import useStateStore from "../Stores/StateStore"
import { VStack, HStack, Spacer } from 'react-native-stacks';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { QrScan } from './QrScan';
import * as FileSystem from 'expo-file-system';
import { qrDataFilePath } from '../App';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function Homepage() {
    const { scoutName, teamNumber, preload, noShow, startPosition, matchNumber, allianceColor, allianceStation, rotateField, matchData, set } = useStateStore();
    const navigation = useNavigation();

    useEffect(() => {
        set({
            teamNumber: matchData?.[matchNumber]?.[allianceColor + allianceStation] ?? ''
        })
    }, [allianceColor, allianceStation, matchNumber, matchData]);

    return (
        <View style={styles.container}>
            <HStack>
                <Spacer />
                <VStack>
                    <Text>Scout Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ scoutName: text })}
                        placeholder='Scout Name'
                        value={scoutName} />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Match #</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ matchNumber: text })}
                        placeholder='Match #'
                        value={matchNumber}
                        keyboardType='numeric' />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Team #</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ teamNumber: text })}
                        placeholder='Team #'
                        value={teamNumber}
                        keyboardType='numeric' />
                </VStack>
                <Spacer />
                <FontAwesome6 name="gear" size={24} color='gray' onPress={() => navigation.navigate('Authentication')} />
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <VStack>
                    <Text>Preload</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={preload ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={(value) => set({ preload: value })}
                        value={preload}
                    />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>No Show</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={noShow ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={(value) => set({ noShow: value })}
                        value={noShow}
                    />
                </VStack>
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Image style={styles.startPositionImage} source={rotateField ? startPositionImageRotated : startPositionImage} />
                <RadioButtonGroup
                    style={styles.RadioButtonGroup}
                    selected={startPosition}
                    onSelected={(value) => set({ startPosition: value })}
                    radioBackground="green"
                >
                    <RadioButtonItem value="a" label="A" />
                    <RadioButtonItem value="b" label="B" />
                    <RadioButtonItem value="c" label="C" />
                </RadioButtonGroup>
            </HStack>
        </View >
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
        borderRadius: 5,
        width: 90
    },
    Slider: {
        width: "75%",
    },

    startPositionImage: {
        width: 300, // Adjust width to fit within the screen
        height: 400, // Adjust height to fit within the screen
        resizeMode: 'center',
    }
});
