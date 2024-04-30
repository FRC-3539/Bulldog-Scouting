import {
	TextInput,
	View,
	Text,
	Alert,
	SafeAreaView,
	StyleSheet,
	Platform,
	Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles, theme } from './Styles'
import { matchData } from './Submit'
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';

import {
	RadioButton,
	Switch,
	Button,
} from 'react-native-paper';


// Keep track of changes so we can update the team number only when we change station, match number,
// or if we load new qr code data, this will allow us to override the teamnumber if we must.
var lastMatch = 0;
var lastStation = '';
var lastMatchData = {};

function compareObjects(obj1, obj2) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Check if the number of keys is the same
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Check if all keys in obj1 are present in obj2 and have the same values
	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	// If all checks passed, the objects are equal
	return true;
}

export function Setup({ props }) {

	//Camera Stuff
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [key, setKey] = useState(0); // Add key state
	const [scanMode, setScanMode] = useState(false); // Add key state

	if (props.match != lastMatch || props.station != lastStation || !compareObjects(matchData, lastMatchData)) {
		if (matchData[props.match] != null && matchData[props.match][props.station] != null) {
			props.setTeamNumber(matchData[props.match][props.station])
			console.log("hi")
		}
		else {
			console.log("hi1")
			props.setTeamNumber('')
		}
	}

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	useFocusEffect(
		useCallback(() => {
			setScanned(false);
			setKey(prevKey => prevKey + 1); // Change key to force remount
			return () => {
				// Cleanup function when the component unmounts
			};
		}, [])
	);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		// Create an empty dictionary to store parsed data
		var matches = data.toString().split(';');

		// Iterate through each match
		matches.forEach(match => {
			if (!match.includes(",")) {
				return;
			}

			// Split the match by comma to get individual teams
			const loadedMatchData = match.split(',');

			// Extract team colors
			const matchTeams = {
				red1: loadedMatchData[1],
				red2: loadedMatchData[2],
				red3: loadedMatchData[3],
				blue1: loadedMatchData[4],
				blue2: loadedMatchData[5],
				blue3: loadedMatchData[6]
			};
			matchData[loadedMatchData[0]] = matchTeams
		});
		console.log(matchData)

		Alert.alert(
			`Data Added`,
			'Data Added',
			[
				{ text: 'Continue', onPress: () => setScanned(false) },
			]
		);
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	lastMatch = props.match
	lastStation = props.station
	lastMatchData = { ...matchData }

	if (scanMode) {
		return (
			<View style={styles.cameraContainer}>
				<Camera
					key={key} // Pass key prop
					style={styles.camera}
					type={Camera.Constants.Type.back}
					barcodeScannerSettings={{
						barcodeTypes: ["qr"],
					}}
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					ratio='16:9'
				/>
				<Button buttonColor='lime' mode="contained" onPress={() => setScanMode(!scanMode)}>Return</Button>
			</View>
		);
	}


	return (
		<View style={styles.generalViewStyle}>
			<Text style={{ fontSize: 25 }}>Alliance Station</Text>
			<RadioButton.Group value={props.station} onValueChange={nextValue => { props.setStation(nextValue) }}>
				<View style={styles.hstack}>
					<View style={styles.vstack}>
						<View style={styles.radioView}>
							<Text>Red 1</Text>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="red1" />
						</View>
						<View style={styles.radioView}>
							<Text>Red 2</Text>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="red2" />
						</View>
						<View style={styles.radioView}>
							<Text>Red 3</Text>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="red3" />
						</View>
					</View>
					<View style={styles.vstack}>

						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="blue1" />
							<Text>Blue 1</Text>
						</View>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="blue2" />
							<Text>Blue 2</Text>
						</View>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="blue3" />
							<Text>Blue 3</Text>
						</View>
					</View>
				</View>
			</RadioButton.Group>

			<View style={styles.hstack}>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 18 }}>Preloaded</Text>
					<Switch onValueChange={() => { props.setPreloaded(!props.preloaded) }} value={props.preloaded} color='lime'></Switch>
				</View>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 18 }}>No Show</Text>
					<Switch onValueChange={() => { props.setNoShow(!props.noShow) }} value={props.noShow} color='lime'></Switch>
				</View>
			</View>


			<View style={styles.hstack}>
				<View style={styles.vstack}>
					<Text>Match Number</Text>
					<TextInput
						style={styles.SingleLineInput}
						onChangeText={props.setMatch}
						value={props.match}
						placeholder="Match Number"
						keyboardType="number-pad"
						inputMode='numeric'
					/>
				</View>
				<View style={styles.vstack}>
					<Text>Team Number</Text>
					<TextInput
						style={styles.SingleLineInput}
						onChangeText={props.setTeamNumber}
						value={props.teamNumber}
						placeholder="Team Number"
						keyboardType="number-pad"
						maxLength={5}
						inputMode='numeric'
					/>
				</View>
			</View>

			<View style={styles.hstackFullWidth}>
				<Image
					style={styles.setupImage}
					source={(props.station === "blue1" || props.station === "blue2" || props.station === "blue3")
						? require('../assets/BlueStartPosition.png') : require('../assets/RedStartPosition.png')} />
				<View style={styles.vstack}>
					<RadioButton.Group value={props.startArea} onValueChange={nextValue => { props.setStartArea(nextValue) }}>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="A" />
							<Text>A</Text>
						</View>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="B" />
							<Text>B</Text>
						</View>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="C" />
							<Text>C</Text>
						</View>
						<View style={styles.radioView}>
							<RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="D" />
							<Text>D</Text>
						</View>
					</RadioButton.Group>
				</View>
			</View>
			<Button buttonColor='purple' mode="contained" onPress={() => setScanMode(!scanMode)}>Scan QR</Button>

		</View>
	)
}