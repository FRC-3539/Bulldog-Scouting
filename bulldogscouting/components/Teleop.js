import {
    View,
    Text,
    Button,
    Pressable,
} from 'react-native';
import { styles } from './Styles';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { resetContext } from '../App'


export function Teleop({ route, navigation }) {
    const { updateStates, getStation, getNoShow } = route.params;

    // States that are used just in this page
    const [pickedUpNote, setPickedUpNote] = useState(false);
    const [pickedUpFrom, setPickedUpFrom] = useState("");
    const [pickedTime, setPickedTime] = useState("");

    // States that store specific match data that will be cleared after each submit.
    const [scoreEvent, setScoreEvent] = useState([]);

    // On change in reset trigger variable from main app, reset state
    useEffect(() => {
        console.log('Teleop reset trigger activated');
        updateState('scoreEvent', setScoreEvent, []);
    }, [resetContext]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };


    // Plus button component to make the code cleaner
    const scoredButton = (name) => {
        return (
        <Pressable
        onPress={() => {
            setPickedUpNote(false)
            setPickedUpFrom("")
            addScoreEvent(name)
        }}
        disabled={getNoShow()}
        style={styles.scoreButton}>

        {({ pressed }) => (
            <LinearGradient
                // Button Linear Gradient
                colors={pressed ? ['#268118', '#268118', '#268118'] : ['#38bf24', '#32a321', '#29871b']}
                style={pressed ? styles.scoreButtonGradientPressed : styles.scoreButtonGradient}>
                <Text style={styles.scoreButtonText}>{name}</Text>
            </LinearGradient>
        )}
    </Pressable >
        )
    }


    // Counter component to make the code cleaner
    const addScoreEvent = (scorePlace) => {
        updateState("scoreEvent", setScoreEvent, [ // with a new array
            ...scoreEvent, // that contains all the old items
            [{ "pickupTime": pickedTime, "pickupLocation": pickedUpFrom.toString(), "scorePlace": scorePlace.toString(), "scoreTime": new Date().toISOString() }] // and one new item at the end
        ])
    }

    if (!pickedUpNote) {
        return (
            <View style={styles.vstackFullWidth}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Pickup Note From</Text>
                <Pressable
                    onPress={() => {
                        setPickedUpNote(true)
                        setPickedUpFrom("Source Area")
                        setPickedTime(new Date().toISOString())

                    }}
                    disabled={getNoShow()}
                    style={styles.pickupButton}>

                    {({ pressed }) => (
                        <LinearGradient
                            // Button Linear Gradient
                            colors={pressed ? ['#268118', '#268118', '#268118'] : ['#38bf24', '#32a321', '#29871b']}
                            style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                            <Text style={styles.pickupButtonText}>Source Area</Text>
                        </LinearGradient>
                    )}
                </Pressable >
                <Pressable
                    onPress={() => {
                        setPickedUpNote(true)
                        setPickedUpFrom("Mid Field")
                        setPickedTime(new Date().toISOString())

                    }}
                    disabled={getNoShow()}
                    style={styles.pickupButton}>

                    {({ pressed }) => (
                        <LinearGradient
                            // Button Linear Gradient
                            colors={pressed ? ['#268118', '#268118', '#268118'] : ['#38bf24', '#32a321', '#29871b']}
                            style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                            <Text style={styles.pickupButtonText}>Mid Field</Text>
                        </LinearGradient>
                    )}
                </Pressable >

                <Pressable
                    onPress={() => {
                        setPickedUpNote(true)
                        setPickedUpFrom("Amp/Speaker Area")
                        setPickedTime(new Date().toISOString())

                    }}
                    disabled={getNoShow()}
                    style={styles.pickupButton}>

                    {({ pressed }) => (
                        <LinearGradient
                            // Button Linear Gradient
                            colors={pressed ? ['#268118', '#268118', '#268118'] : ['#38bf24', '#32a321', '#29871b']}
                            style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                            <Text style={styles.pickupButtonText}>Amp / Speaker Area</Text>
                        </LinearGradient>
                    )}
                </Pressable >
            </View>
        )
    }
    return (
        <View style={styles.vstackFullWidth}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: "center" }}>Picked Up Note From {pickedUpFrom} Was Scored In</Text>
            {scoredButton("Speaker")}
            {scoredButton("Amp")}
            {scoredButton("Trap")}
            {scoredButton("Pass")}
            {scoredButton("Dropped")}
            {scoredButton("Missed")}

            <Pressable
                onPress={() => {
                    setPickedUpNote(false)
                    setPickedUpFrom("")
                }}
                disabled={getNoShow()}
                style={styles.cancelButton}>

                {({ pressed }) => (
                    <LinearGradient
                        // Button Linear Gradient
                        colors={pressed ? ['#811818', '#811818', '#811818'] : ['#c12525', '#a12121', '#881b1b']}
                        style={pressed ? styles.cancelButtonGradientPressed : styles.cancelButtonGradient}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </LinearGradient>
                )}
            </Pressable >

        </View>
    )
}