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
import {resetContext } from '../App'


export function Teleop({ route, navigation }) {
    const { updateStates, getStation, getNoShow } = route.params;

    const [teleopSpeaker, setTeleopSpeaker] = useState(0);
    const [teleopAmp, setTeleopAmp] = useState(0);
    const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
    const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
    const [teleopAmplified, setTeleopAmplified] = useState(0);
    const [usedAmplification, setUsedAmplification] = useState(false);
    const [teleopPass, setTeleopPass] = useState(0);
    const [slams, setSlams] = useState(0);
    const [shotsBlocked, setShotsBlocked] = useState(0);

    // On change in reset trigger variable from main app, reset state
    useEffect(() => {
        console.log('Teleop reset trigger activated');
        updateState('teleopSpeaker', setTeleopSpeaker, 0);
        updateState('teleopAmp', setTeleopAmp, 0);
        updateState('teleopSpeakerAttempts', setTeleopSpeakerAttempts, 0);
        updateState('teleopAmpAttempts', setTeleopAmpAttempts, 0);
        updateState('teleopAmplified', setTeleopAmplified, 0);
        updateState('usedAmplification', setUsedAmplification, false);
        updateState('teleopPass', setTeleopPass, 0);
        updateState('slams', setSlams, 0);
        updateState('shotsBlocked', setShotsBlocked, 0);
    }, [resetContext]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };



	const plusButton = (prop, setProp, pressStyle = styles.plusButtonPressed, style = styles.plusButton, disabledStyle = styles.buttonDisabled) => {
		return (
			<Pressable
				onPress={() => {
					setProp(prop + 1)
				}}
				disabled={getNoShow()}>

				{({pressed}) => (
						<LinearGradient
						// Button Linear Gradient
						colors={pressed?['#268118','#268118','#268118']:['#38bf24', '#32a321', '#29871b']}
						style={pressed?pressStyle:style}>
						<Text style={{color:'white', fontStyle:'Bold', fontSize:30}}>+</Text>
					</LinearGradient>
						)}
			</Pressable >
		)
	}
    const minusButton = (prop, setProp, pressStyle = styles.minusButtonPressed, style = styles.minusButton, disabledStyle = styles.buttonDisabled) => {
        return (
            <Pressable
                onPress={() => {
                    setProp(Math.max(prop - 1, 0))
                }}
                disabled={getNoShow()}>

				{({pressed}) => (
						<LinearGradient
						// Button Linear Gradient
						colors={pressed?['#811818','#811818','#811818']:['#c12525', '#a12121', '#881b1b']}
						style={pressed?pressStyle:style}>
						<Text style={{color:'white', fontStyle:'Bold', fontSize:30}}>-</Text>
					</LinearGradient>
						)}
            </Pressable>
        )
    }
    const counter = (prop, setProp, name, bold) => {
        return (
            <View style={styles.vstack}>
                <Text style={{ fontSize: 20, fontWeight: bold ? 'bold' : 'regular' }}>{name}</Text>
                <View style={styles.hstack}>
                    {plusButton(prop, setProp)}
                    <Text style={{ fontSize: 16 }}>{prop}</Text>
                    {minusButton(prop, setProp)}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.vstack}>
            <View style={styles.vstack}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Speaker</Text>
                <View style={styles.hstack}>
                    {counter(teleopSpeaker, setTeleopSpeaker, 'Scored Notes', false)}
                    {counter(teleopSpeakerAttempts, setTeleopSpeakerAttempts, 'Missed Notes', false)}
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Amp</Text>
                <View style={styles.hstack}>
                    {counter(teleopAmp, setTeleopAmp, 'Scored Notes', false)}
                    {counter(teleopAmpAttempts, setTeleopAmpAttempts, 'Missed Notes', false)}
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    {counter(teleopPass, setTeleopPass, 'Passes', true)}
                    {counter(teleopAmplified, setTeleopAmplified, 'Amplified Notes', true)}
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    {counter(slams, setSlams, 'Slams', true)}
                    {counter(shotsBlocked, setShotsBlocked, 'Shots Blocked', true)}
                </View>
                <View style={styles.radioView}>
                    <Text>Used Amplication?  </Text>
                    <Checkbox
                        value={usedAmplification}
                        style={styles.checkboxStyle}
                        onValueChange={
                            () => updateState('usedAmplification', setUsedAmplification, !usedAmplification)
                        }
                    />
                </View>
                <Text style={{ fontSize: 30 }}></Text>
            </View>
        </View>
    )
}