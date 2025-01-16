import { useFocusEffect } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import React, { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	BackHandler,
	Button,
	Image,
	Switch,
	Text,
	TextInput,
	View,
} from 'react-native';
import { qrDataFilePath, resetContext, softResetContext } from '../App';
import { styles } from './Styles';


const clearFilePass = '3539' // Set a password for clearing the qrcodedata. Should be a number

export function Setup({ route, navigation }) {
	//Get the methods that are passed in and store them for later use.
	const { updateStates, getStation, getNoShow, triggerSoftReset } = route.params;

	// States that store specific match data that will be cleared after each submit.
	const [teamNumber, setTeamNumber] = useState('');
	const [scoutName, setScoutName] = useState('');
	const [noShow, setNoShow] = useState(false);
	const [preloaded, setPreloaded] = useState(false);
	const [startArea, setStartArea] = useState('A');

	// States that do not reset between matches
	const [station, setStation] = useState('red1');
	const [match, setMatch] = useState('0'); //Start on match 0 so when we reset when the app starts it will increment to 1
	const [matchData, setMatchData] = useState({});

	//Camera Stuff (not included in main state)
	const [scanned, setScanned] = useState(false);
	const [scanMode, setScanMode] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();
	const [visible, setVisible] = useState(false);
	const [password, setPassword] = useState('');
	const showDialog = () => setVisible(true);

	useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                return true; // Prevent default behavior (closing the app)
            };

            // Add event listener for back button press
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Clean up the event listener when the component is unmounted or loses focus
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );

	// On change in reset trigger variable from main app, reset state
	useEffect(() => {
		updateState('station', setStation, 'red1');

	}, []);

	// On change in reset trigger variable from main app, reset state
	useEffect(() => {
		console.log('Setup reset trigger activated');
		updateState('teamNumber', setTeamNumber, '');
		updateState('noShow', setNoShow, false);
		updateState('preloaded', setPreloaded, false);
		updateState('startArea', setStartArea, 'A');
		updateState('match', setMatch, "" + (Number(match) + 1));
	}, [resetContext]);

	// On change in soft reset trigger variable from main app, reset state
	useEffect(() => {
		console.log('Setup reset trigger activated');
		updateState('preloaded', setPreloaded, false);
		updateState('startArea', setStartArea, 'A');
	}, [softResetContext]);


	// Intermediary state updater function
	// Sends update to main app and updates local state
	const updateState = (stateName, stateUpdateFunction, stateValue) => {
		updateStates({ [stateName]: stateValue });
		stateUpdateFunction(stateValue);
	};

	const hideDialog = () => {
		setVisible(false);
		setPassword('');
	}

	async function handleBarCodeScanned({ type, data }) {
		var copyMatchData = { ...matchData };
		setScanned(true);

		// Create an empty dictionary to store parsed data
		var matches = data.toString().split(';');

		// Iterate through each match
		matches.forEach(match => {
			if (!match.includes(",")) return;

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

			copyMatchData[loadedMatchData[0]] = matchTeams
		});
		setMatchData(copyMatchData);

		// Save match data to local storage
		await FileSystem.writeAsStringAsync(qrDataFilePath, JSON.stringify(matchData));

		Alert.alert(
			`Data Added`,
			'Data Added',
			[{ text: 'Continue', onPress: () => setScanned(false) }]
		);
	}

	// On application load load the matchData from the files.
	useEffect(() => {
		// Lambdas cant be async so make an async function and call it.
		const loadData = async () => {
			try {
				// Make sure the file exists then parse the json.
				const dirInfo = await FileSystem.getInfoAsync(qrDataFilePath);
				if (dirInfo.exists) {
					const fileContents = await FileSystem.readAsStringAsync(qrDataFilePath);
					const data = JSON.parse(fileContents);
					if (data != null || data != '' || data != ' ')
						setMatchData(data);
				}
			} catch (error) {
				console.error("Failed to read or parse the qrDataFile file", error);
			}
		};
		loadData();
	}, []);


	async function clearFile() {
		setMatchData({}); // Sets dont happen till the next code loop so we must clear the file without passing the matchdata
		await FileSystem.writeAsStringAsync(qrDataFilePath, JSON.stringify({}));
	}

	// If the password matches make sure the user knows this is permanent before they clear the file.
	async function tryClearFile(password, setPassword, hideDialog) {
		if (password == clearFilePass) {
			Alert.alert(
				`Are you sure?`,
				'Clearing the data will erase all currently stored match data. This will be unrecoverable.',
				[{ text: 'Cancel' }, { text: 'Continue', onPress: clearFile }]
			);
		}
		else {
			Alert.alert(
				`Error`,
				'Incorrect password.',
				[{ text: 'Return' }]
			);
		}
		setPassword('') // Clear out the password forum
		hideDialog() // Hide this dialog.
	}

	// If the match, station, or matchData changes set the teamnumber to what matchdata says if we have no match data then clear the box.
	useEffect(() => {
		updateState('teamNumber', setTeamNumber, matchData?.[match]?.[station] ?? '');
	}, [match, station, matchData]);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.vstack}>
				<Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
				<Button title="Grant Permission" onPress={requestPermission} />
			</View>
		);
	}

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
			</View>

		)
	}

	// If the user presses the scan qr code button then open the scanner.
	if (scanMode) {
		return (
			<View style={styles.cameraContainer}>
				<CameraView
					style={styles.camera}
					barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
					onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
					ratio='16:9'
				/>
				<View style={styles.hstack}>
					<Button title="Return" onPress={() => setScanMode(!scanMode)} />
					<Button title="Clear Loaded Match Data" onPress={() => showDialog()} />
				</View>
			</View>
		);
	}

	// If nothing else is happening then display the normal setup screen.
	return (
		<View style={styles.vstack}>
			<Text style={{ fontSize: 25 }}>Alliance Station</Text>

			<View style={styles.hstack}>
				<RadioButtonGroup
					selected={station}
					radioBackground="red"
					radioStyle={styles.radioStyle}
					onSelected={
						(nextValue) => updateState('station', setStation, nextValue)
					}
				>
					<RadioButtonItem label="Red 1" value="red1" />
					<RadioButtonItem label="Red 2" value="red2" />
					<RadioButtonItem label="Red 3" value="red3" />
				</RadioButtonGroup>
				<RadioButtonGroup
					selected={station}
					radioBackground="blue"
					radioStyle={styles.radioStyle}
					onSelected={
						(nextValue) => updateState('station', setStation, nextValue)
					}
				>
					<RadioButtonItem label="Blue 1" value="blue1" />
					<RadioButtonItem label="Blue 2" value="blue2" />
					<RadioButtonItem label="Blue 3" value="blue3" />
				</RadioButtonGroup>
			</View>
			<View style={styles.horizontalLine} />


			<View style={styles.hstack}>
				<View style={styles.vstack}>
					<Text>Match Number</Text>n
					<TextInput
						style={styles.SingleLineInput}
						onChangeText={text => updateState('match', setMatch, text)}
						value={match}
						placeholder="Match Number"
						keyboardType="number-pad"
						inputMode='numeric'
					/>
				</View>
				<View style={styles.vstack}>
					<Text>Team Number</Text>
					<TextInput
						style={styles.SingleLineInput}
						onChangeText={text => updateState('teamNumber', setTeamNumber, text)}
						value={teamNumber}
						placeholder="Team Number"
						keyboardType="number-pad"
						maxLength={5}
						inputMode='numeric'
					/>
				</View>
			</View>
			<View style={styles.hstack}>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 18 }}>Preloaded</Text>
					<Switch onValueChange={() => updateState('preloaded', setPreloaded, !preloaded)} value={preloaded} />
				</View>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 18 }}>No Show</Text>
					<Switch onValueChange={() => {
						updateState('noShow', setNoShow, !noShow);
						if (!noShow)
							triggerSoftReset();
					}} value={noShow} />
				</View>
			</View>

			<View style={styles.hstackFullWidth}>
				<Image
					style={styles.setupImage}
					source={station.includes('blue') ? require('../assets/BlueStartPosition.png')
						: require('../assets/RedStartPosition.png')}
				/>
				<View style={styles.vstack}>
					<RadioButtonGroup
						selected={startArea}
						radioBackground={getNoShow() ? "gray" : station?.includes('blue') ? "blue" : "red"}
						radioStyle={styles.radioStyle}
						onSelected={
							(nextValue) => {
								if (!getNoShow())
									updateState('startArea', setStartArea, nextValue)
							}
						}
					>
						<RadioButtonItem label="A" value="A" />
						<RadioButtonItem label="B" value="B" />
						<RadioButtonItem label="C" value="C" />
						<RadioButtonItem label="D" value="D" />
					</RadioButtonGroup>
				</View>
			</View>
			<Button title="Scan QR" onPress={() => setScanMode(!scanMode)} />

		</View>
	)
}