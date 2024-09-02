import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Pressable,
    Text,
    View
} from 'react-native';
import { resetContext, softResetContext } from '../App';
import { styles } from './Styles';


export function Teleop({ route, navigation }) {
    const { updateStates, getStation, getNoShow } = route.params;

    // States that are used just in this page
    const [pickedUpNote, setPickedUpNote] = useState(false);
    const [pickedUpFrom, setPickedUpFrom] = useState("");
    const [pickedTime, setPickedTime] = useState("");

    const [foulMode, setFoulMode] = useState(false);
    const [foulTime, setFoulTime] = useState("");

    // States that store specific match data that will be cleared after each submit.
    const [scoreEvent, setScoreEvent] = useState([]);
    const [foulEvent, setFoulEvent] = useState([]);

    const green_button_clicked_colors = ['#268118', '#268118', '#268118']
    const green_button_enabled_colors = ['#38bf24', '#32a321', '#29871b']
    const green_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    const red_button_clicked_colors = ['#811818', '#811818', '#811818']
    const red_button_enabled_colors = ['#c12525', '#a12121', '#881b1b']
    const red_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    const yellow_button_clicked_colors = ['#bfaa24', '#bfaa24', '#bfaa24']
    const yellow_button_enabled_colors = ['#ebd12d', '#bfaa24', '#a6931e']
    const yellow_button_disabled_colors = ['#ababab', '#ababab', '#ababab']

    // const [pinFoul, setPinFoul] = useState(0); // G420
    // const [oneNoteFoul, setOneNoteFoul] = useState(0); // G409
    // const [stageProtectionFoul, setStageProtectionFoul] = useState(0); // G424
    // const [contactInsideFrameFoul, setContactInsideFrameFoul] = useState(0); // G417
    // const [podiumProtectionFoul, setPodiumProtectionFoul] = useState(0); // G422
    

    // On change in reset trigger variable from main app, reset state
    useEffect(() => {
        console.log('Teleop reset trigger activated');
        updateState('scoreEvent', setScoreEvent, []);
        updateState('foulEvent', setFoulEvent, []);
        setFoulMode(false)
        setFoulTime("")
        setPickedUpNote(false)
        setPickedUpFrom("")

    }, [resetContext, softResetContext]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };

    var speakerCount = 0
    var ampCount = 0
    var trapCount = 0
    var passCount = 0
    var droppedCount = 0
    var missedCount = 0
    var fouls = 0
    scoreEvent.forEach(element => {
        if (element["scorePlace"] == "Speaker")
            speakerCount++
        else if (element["scorePlace"] == "Amp")
            ampCount++
        else if (element["scorePlace"] == "Trap")
            trapCount++
        else if (element["scorePlace"] == "Pass")
            passCount++
        else if (element["scorePlace"] == "Dropped/Destroyed")
            droppedCount++
        else if (element["scorePlace"] == "Missed")
            missedCount++
    });
    fouls = foulEvent.length


    // Plus button component to make the code cleaner
    const scoredButton = (name, disabled, disabled_colors, clicked_colors, enabled_colors) => {
        return (
            <Pressable
                onPress={() => {
                    setPickedUpNote(false)
                    setPickedUpFrom("")
                    addScoreEvent(name)
                }}
                disabled={disabled}
                style={styles.scoreButton}>

                {({ pressed }) => (
                    <LinearGradient
                        // Button Linear Gradient
                        colors={disabled ? disabled_colors : pressed ? clicked_colors : enabled_colors}
                        style={pressed ? styles.scoreButtonGradientPressed : styles.scoreButtonGradient}>
                        <Text style={styles.scoreButtonText}>{name}</Text>
                    </LinearGradient>
                )}
            </Pressable >
        )
    }

    const foulButton = (name, disabled, disabled_colors, clicked_colors, enabled_colors) => {
        return (
            <Pressable
                onPress={() => {
                    addFoulEvent(name)
                    setFoulMode(false)
                }}
                disabled={getNoShow()}
                style={styles.pickupButton}>

                {({ pressed }) => (
                    <LinearGradient
                        // Button Linear Gradient
                        colors={disabled ? disabled_colors : pressed ? clicked_colors : enabled_colors}
                        style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                        <Text style={styles.scoreButtonText}>{name}</Text>
                    </LinearGradient>
                )}
            </Pressable >
        )
    }


    const addScoreEvent = (scorePlace) => {
        updateState("scoreEvent", setScoreEvent, [ // with a new array
            ...scoreEvent, // that contains all the old items
            { "pickupTime": pickedTime, "pickupLocation": pickedUpFrom.toString(), "scorePlace": scorePlace.toString(), "scoreTime": new Date().toISOString() } // and one new item at the end
        ])
    }

    const addFoulEvent = (foulName) => {
        updateState("foulEvent", setFoulEvent, [ // with a new array
            ...foulEvent, // that contains all the old items
            { "foulTime": foulTime, "foulType": foulName, "foulTime": new Date().toISOString() } // and one new item at the end])
        ])
    }

    const pickUpButton = (name, disabled, disabled_colors, clicked_colors, enabled_colors) => {
        return (
            <Pressable
                onPress={() => {
                    setPickedUpNote(true)
                    setPickedUpFrom(name)
                    setPickedTime(new Date().toISOString())

                }}
                disabled={disabled}
                style={styles.pickupButton}>

                {({ pressed }) => (
                    <LinearGradient
                        // Button Linear Gradient
                        colors={disabled ? disabled_colors : pressed ? clicked_colors : enabled_colors}
                        style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                        <Text style={styles.pickupButtonText}>{name}</Text>
                    </LinearGradient>
                )}
            </Pressable >
        )
    }


    if (foulMode) {
        return (
            <View style={styles.vstackFullWidth}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Foul</Text>

                {foulButton("More than 5 second pin", getNoShow(), red_button_disabled_colors, red_button_clicked_colors, red_button_enabled_colors)}
                {foulButton("More than one note", getNoShow(), red_button_disabled_colors, red_button_clicked_colors, red_button_enabled_colors)}
                {foulButton("Contact while climbing", getNoShow(), red_button_disabled_colors, red_button_clicked_colors, red_button_enabled_colors)}
                {foulButton("Contact inside frame", getNoShow(), red_button_disabled_colors, red_button_clicked_colors, red_button_enabled_colors)}
                {foulButton("Podium protection", getNoShow(), red_button_disabled_colors, red_button_clicked_colors, red_button_enabled_colors)}

                <Pressable
                    onPress={() => {
                        setFoulMode(false)
                        setFoulTime("")
                    }}
                    disabled={getNoShow()}
                    style={styles.cancelButton}>

                    {({ pressed }) => (
                        <LinearGradient
                            // Button Linear Gradient
                            colors={getNoShow() ? red_button_disabled_colors : pressed ? red_button_clicked_colors : red_button_enabled_colors}
                            style={pressed ? styles.cancelButtonGradientPressed : styles.cancelButtonGradient}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </LinearGradient>
                    )}
                </Pressable >
            </View>
        )
    }
    if (!pickedUpNote) {
        return (
            <View style={styles.vstackFullWidth}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Pickup Note From</Text>
                <View style={styles.hstackFullWidth}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Speaker: {speakerCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Amp: {ampCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Trap: {trapCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Pass: {passCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Dropped/Destroyed: {droppedCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Missed: {missedCount}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', textAlign: "center" }}>Fouls: {fouls}</Text>
                </View>

                {pickUpButton("Source Area", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
                {pickUpButton("Mid Field", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
                {pickUpButton("Amp/Speaker Area", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
                <Pressable
                    onPress={() => {
                        setFoulMode(true)
                        setFoulTime(new Date().toISOString())
                    }}
                    disabled={getNoShow()}
                    style={styles.pickupButton}>

                    {({ pressed }) => (
                        <LinearGradient
                            // Button Linear Gradient
                            colors={getNoShow() ? yellow_button_disabled_colors : pressed ? yellow_button_clicked_colors : yellow_button_enabled_colors}
                            style={pressed ? styles.pickupButtonGradientPressed : styles.pickupButtonGradient}>
                            <Text style={styles.scoreButtonText}>Foul</Text>
                        </LinearGradient>
                    )}
                </Pressable >
            </View>
        )
    }

    return (
        <View style={styles.vstackFullWidth}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: "center" }}>Picked Up Note From {pickedUpFrom} Was Scored In</Text>
            {scoredButton("Speaker", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
            {scoredButton("Amp", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
            {scoredButton("Trap", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
            {scoredButton("Pass", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
            {scoredButton("Dropped/Destroyed", getNoShow(), green_button_disabled_colors, green_button_clicked_colors, green_button_enabled_colors)}
            {scoredButton("Missed", getNoShow(), yellow_button_disabled_colors, yellow_button_clicked_colors, yellow_button_enabled_colors)}

            <Pressable
                onPress={() => {
                    setPickedUpNote(false)
                    setPickedUpFrom("")
                }}
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