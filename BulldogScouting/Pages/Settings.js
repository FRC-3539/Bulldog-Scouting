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





export default function Settings() {
    const navigation = useNavigation();

    const { scoutName, teamNumber, preload, noShow, startPosition, matchNumber, allianceColor, allianceStation, rotateField, set } = useStateStore();


    const openPasswordModal = () => {
        setPasswordModalVisible(true);
        setPassword('');
    };
    const closePasswordModal = () => {
        setPasswordModalVisible(false);
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            <HStack>
                <Text>red</Text>
                <Switch
                    trackColor={{ false: '#ff8181', true: '#81b0ff' }}
                    thumbColor={allianceColor == 'red' ? '#FF0000' : '#0000FF'}
                    onValueChange={(value) => set({ allianceColor: value ? "blue" : "red" })}
                    value={allianceColor != 'red'}
                />
                <Text>blue</Text>
            </HStack>
            <VStack>
                <Text>Rotate Field</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={rotateField ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={(value) => set({ rotateField: value })}
                    value={rotateField}
                />
                <Text>Alliance Station</Text>
                <HStack>
                    <RadioButtonGroup
                        selected={allianceStation.toString()}
                        onSelected={(value) => set({ allianceStation: parseInt(value) })}
                        radioBackground="green"
                    >
                        <RadioButtonItem value="1" label="1" />
                        <RadioButtonItem value="2" label="2" />
                        <RadioButtonItem value="3" label="3" />
                    </RadioButtonGroup>
                </HStack>
            </VStack>
            <Spacer />
            <Button title="Scan Match Data" onPress={() => navigation.navigate("Scan QR Code")} />
            <Spacer />

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