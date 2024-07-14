import {
	View,
	Text,
	Image,
	Button,

} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './Styles'
import Checkbox from 'expo-checkbox';

export function Auton({ updateStates, resetTrigger, station }) {
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
	}, [resetTrigger]);

	// Intermediary state updater function
	// Sends update to main app and updates local state
	const updateState = (stateName, stateUpdateFunction, stateValue) => {
		updateStates({stateName: stateValue});
		stateUpdateFunction(stateValue);
	};

	return (
		<View style={styles.generalViewStyle}>
			<View style={styles.vstack}>
				<Text></Text>
				<View style={styles.hstack}>
					<Text style={{ fontSize: 16 }}>Left the starting zone?</Text>
					<Checkbox
						value={leftAutonZone}
						onValueChange={
							() => updateState('leftAutonZone', setLeftAutonZone, !leftAutonZone)
						}
					/>
				</View>
				<Text></Text>
				<View style={styles.hstack}>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Scored Notes</Text>
						<Button
							title='   +   '
							onPress={
								() => updateState('autonNotes', setAutonNotes, autonNotes + 1)
							}
						/>
						<Text style={{ fontSize: 20 }}>{autonNotes}</Text>
						<Button
							title='   -   '
							onPress={
								() => updateState('autonNotes', setAutonNotes, Math.max(autonNotes - 1, 0))
							}
						/>
					</View>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Failed Notes</Text>
						<Button
							title='   +   '
							onPress={
								() => updateState('autonNoteAttempts', setAutonNoteAttempts, autonNoteAttempts + 1)
							}
						/>
						<Text style={{ fontSize: 20 }}>{autonNoteAttempts}</Text>
						<Button
							title='   -   '
							onPress={
								() => updateState('autonNoteAttempts', setAutonNoteAttempts, Math.max(autonNoteAttempts - 1, 0))
							}
						/>
					</View>
				</View>
				<Text></Text>
				<View style={styles.hstackFullWidth}>
					<Image
						style={styles.setupImage}
						source={station?.includes('blue')? require('../assets/BlueHalfAuton.png')
							: require('../assets/RedHalfAuton.png')}
					/>
					<View style={styles.vstack}>
						<View style={styles.radioView}>
							<Text>A</Text>
							<Checkbox
								value={usedNoteA}
								onValueChange={
									() => updateState('usedNoteA', setUsedNoteA, !usedNoteA)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>B</Text>
							<Checkbox
								value={usedNoteB}
								onValueChange={
									() => updateState('usedNoteB', setUsedNoteB, !usedNoteB)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>C</Text>
							<Checkbox
								value={usedNoteC}
								onValueChange={
									() => updateState('usedNoteC', setUsedNoteC, !usedNoteC)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>D</Text>
							<Checkbox
								value={usedNoteD}
								onValueChange={
									() => updateState('usedNoteD', setUsedNoteD, !usedNoteD)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>E</Text>
							<Checkbox
								value={usedNoteE}
								onValueChange={
									() => updateState('usedNoteE', setUsedNoteE, !usedNoteE)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>F</Text>
							<Checkbox
								value={usedNoteF}
								onValueChange={
									() => updateState('usedNoteF', setUsedNoteF, !usedNoteF)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>G</Text>
							<Checkbox
								value={usedNoteG}
								onValueChange={
									() => updateState('usedNoteG', setUsedNoteG, !usedNoteG)
								}
							/>
						</View>
						<View style={styles.radioView}>
							<Text>H</Text>
							<Checkbox
								value={usedNoteH}
								onValueChange={
									() => updateState('usedNoteH', setUsedNoteH, !usedNoteH)
								}
							/>
						</View>
					</View>
				</View>
			</View >
		</View>
	)
}