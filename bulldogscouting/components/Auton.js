import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
	Image,
	Pressable,
	Text,
	View,
} from 'react-native';
import { resetContext, softResetContext } from '../App';
import { styles } from './Styles';


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

	const score_good_clicked_colors = ['#268118', '#268118', '#268118']
	const score_good_enabled_colors = ['#38bf24', '#32a321', '#29871b']
	const score_good_disabled_colors = ['#ababab', '#ababab', '#ababab']

	const score_bad_clicked_colors = ['#811818', '#811818', '#811818']
	const score_bad_enabled_colors = ['#c12525', '#a12121', '#881b1b']
	const score_bad_disabled_colors = ['#ababab', '#ababab', '#ababab']

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
	}, [resetContext, softResetContext]);

	// Intermediary state updater function
	// Sends update to main app and updates local state
	const updateState = (stateName, stateUpdateFunction, stateValue) => {
		updateStates({ [stateName]: stateValue });
		stateUpdateFunction(stateValue);
	};



	// Plus button component to make the code cleaner
	const plusButton = (name, prop, setProp, disabled, pressStyle = styles.plusButtonPressed, style = styles.plusButton, disabledStyle = styles.buttonDisabled, disabled_colors = score_good_disabled_colors, clicked_colors = score_good_clicked_colors, enabled_colors = score_good_enabled_colors) => {
		return (
			<Pressable
				onPress={() => {
					updateState(name, setProp, prop + 1)
				}}
				disabled={disabled}>

				{({ pressed }) => (
					<LinearGradient
						colors={disabled ? disabled_colors : pressed ? clicked_colors : enabled_colors}
						style={pressed ? pressStyle : style}>
						<Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 30 }}>+</Text>
					</LinearGradient>
				)}
			</Pressable >
		)
	}
	// Minus button component to make the code cleaner
	const minusButton = (name, prop, setProp, disabled, pressStyle = styles.minusButtonPressed, style = styles.minusButton, disabledStyle = styles.buttonDisabled, disabled_colors = score_bad_disabled_colors, clicked_colors = score_bad_clicked_colors, enabled_colors = score_bad_enabled_colors) => {
		return (
			<Pressable
				onPress={() => {
					updateState(name, setProp, Math.max(prop - 1, 0))

				}}
				disabled={disabled}>

				{({ pressed }) => (
					<LinearGradient
						colors={disabled ? disabled_colors : pressed ? clicked_colors : enabled_colors}
						style={pressed ? pressStyle : style}>
						<Text style={{ color: 'white', fontStyle: 'Bold', fontSize: 30 }}>-</Text>
					</LinearGradient>
				)}
			</Pressable>
		)
	}
	// Counter component to make the code cleaner
	const counter = (prop, setProp, name, label, bold, disabled) => {
		return (
			<View style={styles.vstack}>
				<Text style={{ fontSize: 20, fontWeight: bold ? 'bold' : 'regular' }}>{label}</Text>
				<View style={styles.hstack}>
					{plusButton(name, prop, setProp, disabled)}
					<Text style={{ fontSize: 16 }}>{prop}</Text>
					{minusButton(name, prop, setProp, disabled)}
				</View>
			</View>
		)
	}
	// Radio button component to make the code cleaner
	const radioButton = (label, name, disabled, prop, setProp) => {
		return (
			<View style={styles.radioView}>
				<Text>{label}</Text>
				<Checkbox
					value={prop}
					style={styles.checkboxStyle}
					disabled={disabled}
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
						disabled={getNoShow()}
						onValueChange={
							() => updateState('leftAutonZone', setLeftAutonZone, !leftAutonZone)
						}
					/>
				</View>
				<Text></Text>
				<View style={styles.hstack}>
					{counter(autonNotes, setAutonNotes, 'autonNotes', 'Scored Notes', true, getNoShow())}
					{counter(autonNoteAttempts, setAutonNoteAttempts, 'autonNoteAttempts', 'Missed Notes', true, getNoShow())}
				</View>
				<Text></Text>
				<View style={styles.hstackFullWidth}>
					<Image
						style={styles.setupImage}
						source={getStation()?.includes('blue') ? require('../assets/BlueHalfAuton.png')
							: require('../assets/RedHalfAuton.png')}
					/>
					<View style={styles.vstack}>
						{radioButton('A', 'usedNoteA', getNoShow(), usedNoteA, setUsedNoteA)}
						{radioButton('B', 'usedNoteB', getNoShow(), usedNoteB, setUsedNoteB)}
						{radioButton('C', 'usedNoteC', getNoShow(), usedNoteC, setUsedNoteC)}
						{radioButton('D', 'usedNoteD', getNoShow(), usedNoteD, setUsedNoteD)}
						{radioButton('E', 'usedNoteE', getNoShow(), usedNoteE, setUsedNoteE)}
						{radioButton('F', 'usedNoteF', getNoShow(), usedNoteF, setUsedNoteF)}
						{radioButton('G', 'usedNoteG', getNoShow(), usedNoteG, setUsedNoteG)}
						{radioButton('H', 'usedNoteH', getNoShow(), usedNoteH, setUsedNoteH)}
					</View>
				</View>
			</View >
		</View>
	)
}