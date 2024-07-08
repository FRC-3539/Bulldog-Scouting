import {
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Setup } from './components/Setup';
import { Auton } from './components/Auton';
import { styles, theme } from './components/Styles'
import { Teleop } from './components/Teleop';
import { EndGame } from './components/Endgame';
import { Submit } from './components/Submit';
import { PaperProvider } from 'react-native-paper';
import FocusRender from 'react-navigation-focus-render'
import { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const Tab = createMaterialTopTabNavigator();


export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';

export default function App() {

	//Setup
	const [noShow, setNoShow] = useState(false);
	const [preloaded, setPreloaded] = useState(false);
	const [station, setStation] = useState("red1");
	const [startArea, setStartArea] = useState("A");
	const [match, setMatch] = useState("1");
	const [matchData, setMatchData] = useState({}); // Create an empty dictionary to store the match data.


	//Auton
	const [autonNotes, setAutonNotes] = useState(0);
	const [autonNotesAttempts, setAutonNotesAttempts] = useState(0);
	const [teamNumber, setTeamNumber] = useState('');
	const [leftAutonZone, setLeftAutonZone] = useState(false);

	const [usedNoteA, setusedNoteA] = useState(false);
	const [usedNoteB, setusedNoteB] = useState(false);
	const [usedNoteC, setusedNoteC] = useState(false);
	const [usedNoteD, setusedNoteD] = useState(false);
	const [usedNoteE, setusedNoteE] = useState(false);
	const [usedNoteF, setusedNoteF] = useState(false);
	const [usedNoteG, setusedNoteG] = useState(false);
	const [usedNoteH, setusedNoteH] = useState(false);

	// Teleop
	const [teleopSpeaker, setTeleopSpeaker] = useState(0);
	const [teleopAmp, setTeleopAmp] = useState(0);
	const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
	const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
	const [teleopAmplified, setTeleopAmplified] = useState(0);
	const [usedAmplification, setUsedAmplification] = useState(0);
	const [teleopPass, setTeleopPass] = useState(0);
	const [slams, setSlams] = useState(0);
	const [shotsBlocked, setShotsBlocked] = useState(0);

	// EndGame
	const [sideClimb, setSideClimb] = useState(false);
	const [climbSpeed, setClimbSpeed] = useState('No Climb');

	//Submit
	const [robotRemarks, setRobotRemarks] = useState('');
	const [matchScoreRed, setMatchScoreRed] = useState('');
	const [matchScoreBlue, setMatchScoreBlue] = useState('');

	useEffect(() => {
		const loadData = async () => { //Must create a new function to use await
			try {
				console.log(qrDataFilePath);

				const fileContents = await FileSystem.readAsStringAsync(qrDataFilePath);
				console.log("File Contents: ", fileContents);
				const data = JSON.parse(fileContents);
				if (data != null || data != '' || data != ' ')
					setMatchData(data);
			} catch (error) {
				console.error("Failed to read or parse the qrDataFile file", error);
			}
		};
		loadData();
	}, []);

	var props = {
		matchData, robotRemarks, climbSpeed, sideClimb,
		matchScoreRed, matchScoreBlue,
		teleopAmp, teleopSpeakerAttempts,
		teleopAmpAttempts, teleopPass, teleopAmplified,
		slams, shotsBlocked, usedAmplification,
		usedNoteA, usedNoteB, usedNoteC,
		usedNoteD, usedNoteE, usedNoteF,
		usedNoteG, usedNoteH, autonNotesAttempts,
		autonNotes, leftAutonZone, startArea,
		station, preloaded, noShow,
		teamNumber, match, teleopSpeaker,
	};

	var setProps = {
		setMatchData, setRobotRemarks, setClimbSpeed, setSideClimb,
		setMatchScoreRed, setMatchScoreBlue,
		setTeleopAmp, setTeleopSpeakerAttempts,
		setTeleopAmpAttempts, setTeleopPass, setTeleopAmplified,
		setSlams, setShotsBlocked, setUsedAmplification,
		setusedNoteA, setusedNoteB, setusedNoteC,
		setusedNoteD, setusedNoteE, setusedNoteF,
		setusedNoteG, setusedNoteH, setAutonNotesAttempts,
		setAutonNotes, setLeftAutonZone, setStartArea,
		setStation, setPreloaded, setNoShow,
		setTeamNumber, setMatch, setTeleopSpeaker
	};


	return (<NavigationContainer>
		<PaperProvider>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar
					animated={true}
					backgroundColor={styles.safeArea.backgroundColor}
					barStyle="dark-content"
					hidden={false}
				/>
				<Tab.Navigator screenOptions={{
					tabBarItemStyle: {
						padding: 0,
						margin: 0,
					},
				}
				}>
					<Tab.Screen name="Setup" children={() =>
						<FocusRender><Setup props={props} setProps={setProps} /></FocusRender>} />
					<Tab.Screen name="Auton" children={() =>
						<FocusRender><Auton props={props} setProps={setProps} /></FocusRender>} />
					<Tab.Screen name="Teleop" children={() =>
						<FocusRender><Teleop props={props} setProps={setProps} /></FocusRender>} />
					<Tab.Screen name="EndGame" children={() =>
						<FocusRender><EndGame props={props} setProps={setProps} /></FocusRender>} />
					<Tab.Screen name="Submit" children={() =>
						<FocusRender><Submit
							props={props}
							setProps={setProps}
							navigation={useNavigation()} /></FocusRender>} />
				</Tab.Navigator>
			</SafeAreaView>
		</PaperProvider>
	</NavigationContainer>


	);
}