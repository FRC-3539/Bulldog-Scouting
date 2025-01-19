import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import startPositionImage from "../assets/AutonStartingPosition.png";
import startPositionImageRotated from "../assets/AutonStartingPositionRotated.png";
import { Switch } from 'react-native';
import useStateStore from "../Stores/StateStore"
import { VStack, HStack, Spacer } from 'react-native-stacks';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { QrScan } from './QrScan';



export default function Homepage() {
    const [showSettings, setShowSettings] = useState(false);

    const { scoutName, teamNumber, preload, noShow, startPosition, matchNumber, allianceColor, allianceStation, rotateField, set } = useStateStore();

    const [password, setPassword] = useState('');

    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [scanMode, setScanMode] = useState(false);


    const openPasswordModal = () => {
        setPasswordModalVisible(true);
        setPassword('');
    };
    const closePasswordModal = () => {
        setPasswordModalVisible(false);
        setPassword('');
    };

    const handlePasswordSubmit = () => {
        if (password === 'bb3539') {
            setShowSettings(true);
            closePasswordModal();
        } else {
            alert('Incorrect password');
        }
    };


    if (scanMode) {
        return (
            <View style={styles.container}>
                <QrScan />
                <Button title="Close" onPress={() => setScanMode(false)} />
            </View>
        )
    }

    // Password Screen
    if (isPasswordModalVisible) {
        return (
            <View style={styles.container}>
                <Spacer />
                <Spacer />
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    value={password}
                    secureTextEntry={true}
                />
                <Spacer />
                <HStack>
                    <Spacer />
                    <Spacer />
                    <Button title="Close" onPress={closePasswordModal} />
                    <Spacer />
                    <Button title="Submit" onPress={handlePasswordSubmit} />
                    <Spacer />
                    <Spacer />
                </HStack>
                <Spacer />
                <Spacer />

            </View>
        );
    }


    // Settings Screen
    if (showSettings) {
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
                <Button title="Scan Match Data" onPress={() => setScanMode(true)} />

                <Spacer />
                <Button title="Close Settings" onPress={() => setShowSettings(false)} />
            </View>
        );
    }


    // Normal Home Screen
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
                <FontAwesome6 name="gear" size={24} color='gray' onPress={openPasswordModal} />
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
