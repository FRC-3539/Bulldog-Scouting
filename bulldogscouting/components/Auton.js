import {
	View,
	Text,
	Image,
	Pressable,

} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Styles'
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { resetContext } from '../App'


export function Auton({ route, navigation }) {
	const { updateStates, getStation, getNoShow } = route.params;

	// States that store specific match data that will be cleared after each submit.
	const [autonNotes, setAutonNotes] = useState(0);
	const [autonNoteAttempts, setAutonNoteAttempts] = useState(0);
	const [leftAutonZone, setLeftAutonZone] = useState(false);
	const [usedNoteA, setUsedNoteA] = useState(false);
	const [usedNoteB, setUsedNoteB] = useState(false);
	const [usedNoteC, setUsedNoteC] = useState(false);
	const [usedNoteD, setUsedNoteD] = useState(false);
	const [usedNoteE, setUsedNoteE] = useState(false);
	const [usedNoteF, setUsedNoteF] = useState(false);
	const [usedNoteG, setUsedNoteG] = useState(false);
	const [usedNoteH, setUsedNoteH] = useState(false);

	// On change in reset trigger variable from main app, reset state
	useEffect(() => {
		console.log('Auton reset trigger activated');
		updateState('autonNotes', setAutonNotes, 0);
		updateState('autonNoteAttempts', setAutonNoteAttempts, 0);
		updateState('leftAutonZone', setLeftAutonZone, false);
		updateState('usedNoteA', setUsedNoteA, false);
		updateState('usedNoteB', setUsedNoteB, false);
		updateState('usedNoteC', setUsedNoteC, false);
		updateState('usedNoteD', setUsedNoteD, false);
		updateState('usedNoteE', setUsedNoteE, false);
		updateState('usedNoteF', setUsedNoteF, false);
		updateState('usedNoteG', setUsedNoteG, false);
		updateState('usedNoteH', setUsedNoteH, false);
	}, [resetContext]);

	// Intermediary state updater function
	// Sends update to main app and updates local state
	const updateState = (stateName, stateUpdateFunction, stateValue) => {
		if (!getNoShow()) {
			updateStates({ [stateName]: stateValue });
			stateUpdateFunction(stateValue);
		}
	};


	// Plus button component to make the code cleaner
	const plusButton = (prop, setProp, pressStyle = styles.plusButtonPressed, style = styles.plusButton, disabledStyle = styles.buttonDisabled) => {
		return (
			<Pressable
				onPress={() => {
					setProp(prop + 1)
				}}
				disabled={getNoShow()}>

				{({ pressed }) => (
					<LinearGradient
						colors={pressed ? ['#268118', '#268118', '#268118'] : ['#38bf24', '#32a321', '#29871b']}
						style={pressed ? pressStyle : style}>
						<Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 30 }}>+</Text>
					</LinearGradient>
				)}
			</Pressable >
		)
	}
	// Minus button component to make the code cleaner
	const minusButton = (prop, setProp, pressStyle = styles.minusButtonPressed, style = styles.minusButton, disabledStyle = styles.buttonDisabled) => {
		return (
			<Pressable
				onPress={() => {
					setProp(Math.max(prop - 1, 0))
				}}
				disabled={getNoShow()}>

				{({ pressed }) => (
					<LinearGradient
						colors={pressed ? ['#811818', '#811818', '#811818'] : ['#c12525', '#a12121', '#881b1b']}
						style={pressed ? pressStyle : style}>
						<Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 30 }}>-</Text>
					</LinearGradient>
				)}
			</Pressable>
		)
	}
	// Counter component to make the code cleaner
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
	// Radio button component to make the code cleaner
	const radioButton = (label, name, prop, setProp) => {
		return (
			<View style={styles.radioView}>
				<Text>{label}</Text>
				<Checkbox
					value={prop}
					style={styles.checkboxStyle}
					onValueChange={
						() => updateState(name, setProp, !prop)
					}
				/>
			</View>)
	}

	return (
		<View style={styles.vstack}>
			<View style={styles.vstack}>
				<Text></Text>
				<View style={styles.hstack}>
					<Text style={{ fontSize: 16 }}>Left the starting zone?</Text>
					<Checkbox
						value={leftAutonZone}
						style={styles.checkboxStyle}
						onValueChange={
							() => updateState('leftAutonZone', setLeftAutonZone, !leftAutonZone)
						}
					/>
				</View>
				<Text></Text>
				<View style={styles.hstack}>
					{counter(autonNotes, setAutonNotes, 'Scored Notes', true)}
					{counter(autonNoteAttempts, setAutonNoteAttempts, 'Missed Notes', true)}
				</View>
				<Text></Text>
				<View style={styles.hstackFullWidth}>
					<Image
						style={styles.setupImage}
						source={getStation()?.includes('blue') ? require('../assets/BlueHalfAuton.png')
							: require('../assets/RedHalfAuton.png')}
					/>
					<View style={styles.vstack}>
						{radioButton('B', 'usedNoteB', usedNoteB, setUsedNoteB)}
						{radioButton('C', 'usedNoteC', usedNoteC, setUsedNoteC)}
						{radioButton('D', 'usedNoteD', usedNoteD, setUsedNoteD)}
						{radioButton('E', 'usedNoteE', usedNoteE, setUsedNoteE)}
						{radioButton('F', 'usedNoteF', usedNoteF, setUsedNoteF)}
						{radioButton('G', 'usedNoteG', usedNoteG, setUsedNoteG)}
						{radioButton('H', 'usedNoteH', usedNoteH, setUsedNoteH)}
					</View>
				</View>
			</View >
		</View>
	)
}