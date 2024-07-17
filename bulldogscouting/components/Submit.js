import {
    TextInput,
    View,
    Text,
    Alert,
    Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Styles'
import * as FileSystem from 'expo-file-system';
import { filePath, resetContext } from '../App'

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
                    text => updateState('robotRemarks', setRobotRemarks, text.trim())
                }
                value={robotRemarks}
                placeholder="Anything else you want to say about this robot?"
            />
            <View style={styles.hstack}>
                <Button title="Submit" onPress={() => triggerWriteToFile(navigation)} />
            </View>
            <View style={styles.hstack}>
                <Button title="Share" onPress={() => triggerShare()} />
                <Button title="Clear" onPress={() => showDialog()} />
            </View>



        </View>
    )
}
