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
import { filePath } from '../App'



const clearFilePass = '3539' // Should be a number


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
    setPassword('');
    hideDialog();
}

async function clearFile() {
    await FileSystem.writeAsStringAsync(filePath, ' ')
}

export function Submit({ route, navigation }) {
	const { updateStates, resetTrigger, getStation, triggerWriteToFile, triggerShare, getNoShow  } = route.params;

    const [robotRemarks, setRobotRemarks] = useState('');
    const [matchScoreRed, setMatchScoreRed] = useState('');
    const [matchScoreBlue, setMatchScoreBlue] = useState('');

    const [visible, setVisible] = React.useState(false)
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
    }, [resetTrigger]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };

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
                <Button title="Submit" onPress={() => triggerWriteToFile()} />
            </View>

            <View style={styles.hstack}>
                <Button title="Share" onPress={() => triggerShare()} />
                <Button title="Clear" onPress={() => showDialog()} />
            </View>



        </View>
    )
}
