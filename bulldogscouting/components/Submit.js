import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { filePath, resetContext } from '../App';
import { styles } from './Styles';

const clearFilePass = '3539' // Set a password for clearing the output data file. Should be a number


// If the password matches make sure the user knows this is permanent before they clear the file.
async function tryClearFile(password, setPassword, hideDialog) {
    if (password == clearFilePass) {
        Alert.alert(
            `Are you sure?`,
            'Clearing the data will erase all currently stored scouting data and will be unrecoverable',
            [
                { text: 'Cancel' },
                { text: 'Continue', onPress: clearFile },
            ]
        );
    }
    else {
        Alert.alert(
            `Error`,
            'Incorrect password.',
            [
                { text: 'Return' },
            ]
        );
    }
    setPassword('') // Clear out the password forum
    hideDialog() // Hide this dialog.
}

// Completely clear the file that contains the scouting data.
async function clearFile() {
    await FileSystem.writeAsStringAsync(filePath, ' ')
}

export function Submit({ route, navigation }) {
    const { updateStates, getStation, triggerWriteToFile, triggerShare, getNoShow } = route.params;

    // States that store specific match data that will be cleared after each submit.
    const [robotRemarks, setRobotRemarks] = useState('');
    const [matchScoreRed, setMatchScoreRed] = useState('');
    const [matchScoreBlue, setMatchScoreBlue] = useState('');

    // States for the password dialog.
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')


    const showDialog = () => setVisible(true)

    const hideDialog = () => {
        setVisible(false)
        setPassword('')
    }

    const green_button_clicked_colors = ['#268118', '#268118', '#268118']
    const green_button_enabled_colors = ['#38bf24', '#32a321', '#29871b']
    const green_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    const red_button_clicked_colors = ['#811818', '#811818', '#811818']
    const red_button_enabled_colors = ['#c12525', '#a12121', '#881b1b']
    const red_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    const yellow_button_clicked_colors = ['#bfaa24', '#bfaa24', '#bfaa24']
    const yellow_button_enabled_colors = ['#ebd12d', '#bfaa24', '#a6931e']
    const yellow_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    // On change in reset trigger variable from main app, reset state
    useEffect(() => {
        console.log('Submit reset trigger activated');
        updateState('robotRemarks', setRobotRemarks, '');
        updateState('matchScoreRed', setMatchScoreRed, '');
        updateState('matchScoreBlue', setMatchScoreBlue, '');
    }, [resetContext]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };

    // Password Dialogs caused app lag so instead we just show a password forum and a couple buttons like the dialog.
    if (visible) {
        return (
            <View style={styles.vstack}>
                <TextInput
                    style={styles.SingleLineInput}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    keyboardType="numeric"
                    secureTextEntry={true}
                />
                <View style={styles.hstack}>
                    <Button title="Cancel" onPress={hideDialog} />
                    <Button title="Continue" onPress={() => tryClearFile(password, setPassword, hideDialog)} />
                </View>
            </View>);
    }

    // If nothing else is happening then display the normal setup screen.
    return (
        <View style={styles.vstack}>
            <View style={styles.hstack}>
                <View style={styles.vstack}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Red Score</Text>
                    <TextInput
                        style={styles.SingleLineInput}
                        onChangeText={
                            text => updateState('matchScoreRed', setMatchScoreRed, text)
                        }
                        value={matchScoreRed}
                        placeholder="Red Match Score"
                        keyboardType="number-pad"
                        inputMode='numeric'
                    />
                </View>
                <View style={styles.vstack}>
                    <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20 }}>Blue Score</Text>
                    <TextInput
                        style={styles.SingleLineInput}
                        onChangeText={
                            text => updateState('matchScoreBlue', setMatchScoreBlue, text)
                        }
                        value={matchScoreBlue}
                        placeholder="Blue Match Score"
                        keyboardType="number-pad"
                        inputMode='numeric'
                    />
                </View>
            </View>
            <TextInput
                editable
                multiline
                style={styles.MultiLineInput}
                numberOfLines={8}
                onChangeText={
                    text => updateState('robotRemarks', setRobotRemarks, text)
                }
                value={robotRemarks}
                placeholder="Anything else you want to say about this robot?"
            />
            <View style={styles.hstack}>
                <Pressable
                    onPress={() => {
                        triggerWriteToFile(navigation)
                    }}>

                    {({ pressed }) => (
                        <LinearGradient
                            colors={pressed ? green_button_clicked_colors : green_button_enabled_colors}
                            style={pressed ? styles.plusButtonPressed : styles.plusButton}>
                            <Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 25 }}>Submit</Text>
                        </LinearGradient>
                    )}
                </Pressable>
            </View>
            <View style={styles.hstackcenter}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                triggerShare()
                            }}>

                            {({ pressed }) => (
                                <LinearGradient
                                    colors={pressed ? yellow_button_clicked_colors : yellow_button_enabled_colors}
                                    style={pressed ? styles.plusButtonPressed : styles.plusButton}>
                                    <Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 25 }}>Share</Text>
                                </LinearGradient>
                            )}
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                showDialog()
                            }}>

                            {({ pressed }) => (
                                <LinearGradient
                                    colors={pressed ? red_button_clicked_colors : red_button_enabled_colors}
                                    style={pressed ? styles.plusButtonPressed : styles.plusButton}>
                                    <Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 25 }}>Clear Data</Text>
                                </LinearGradient>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
