import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Switch, Alert } from 'react-native';
import { useSettingsStore } from "../Stores/StateStore"
import { VStack, HStack, Spacer } from 'react-native-stacks';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { settingsPath, qrDataFilePath } from '../Stores/StateStore';

export default function Settings() {
    const navigation = useNavigation();

    const { allianceColor, allianceStation, rotateField, set } = useSettingsStore();

    useEffect(() => {
        const saveSettings = async () => {
            // Save match data to local storage
            try {
                await FileSystem.writeAsStringAsync(settingsPath, JSON.stringify({ allianceColor: allianceColor, allianceStation: allianceStation, rotateField: rotateField }));

            } catch (error) {
                console.error(error);
                console.log(await FileSystem.getInfoAsync(settingsPath));
            }
        }
        saveSettings();


    }, [allianceColor, allianceStation, rotateField]);

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
            <Button title="Clear Loaded Match Data" onPress={() => Alert.alert(
                "Clear Data",
                "Are you sure you want to clear the loaded match data?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            set({ matchData: {} });
                            await FileSystem.writeAsStringAsync(qrDataFilePath, JSON.stringify({}));
                        }
                    }
                ]
            )} />

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