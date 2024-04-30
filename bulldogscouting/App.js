import {
	TextInput,
	View,
	Text,
	Alert,
	SafeAreaView,
	StyleSheet,
	Platform,
	StatusBar,
	Image,
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

const Tab = createMaterialTopTabNavigator();

export default function App() {

	//Setup
	const [isRedAlliance, setIsRedAlliance] = useState(true);
	const [noShow, setNoShow] = useState(false);
	const [preloaded, setPreloaded] = useState(false);
	const [station, setStation] = useState("red1");
	const [startArea, setStartArea] = useState("A");
	const [match, setMatch] = useState("1");

	//Auton
	const [autonNotes, setAutonNotes] = useState(0);
	const [autonNotesAttempts, setAutonNotesAttempts] = useState(0);
	const [teamNumber, setTeamNumber] = React.useState('');
	const [leftAutonZone, setLeftAutonZone] = React.useState(false);

	const [usedNoteA, setusedNoteA] = React.useState(false);
	const [usedNoteB, setusedNoteB] = React.useState(false);
	const [usedNoteC, setusedNoteC] = React.useState(false);
	const [usedNoteD, setusedNoteD] = React.useState(false);
	const [usedNoteE, setusedNoteE] = React.useState(false);
	const [usedNoteF, setusedNoteF] = React.useState(false);
	const [usedNoteG, setusedNoteG] = React.useState(false);
	const [usedNoteH, setusedNoteH] = React.useState(false);

	// Teleop
	const [teleopSpeaker, setTeleopSpeaker] = useState(0);
	const [teleopAmp, setTeleopAmp] = useState(0);
	const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
	const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
	const [teleopAmplified, setTeleopAmplified] = useState(0);
	const [usedAmplification, setUsedAmplification] = useState(0);
	const [teleopPass, setTeleopPass] = useState(0);
	const [teleopDrop, setTeleopDrop] = useState(0);
	const [slams, setSlams] = useState(0);
	const [shotsBlocked, setShotsBlocked] = useState(0);

	// EndGame
	const [climbed, setClimbed] = useState(false);
	const [sideClimb, setSideClimb] = useState(false);
	const [climbSpeed, setClimbSpeed] = useState(0);

	//Submit
	const [robotRemarks, setRobotRemarks] = useState('');
	const [matchScoreRed, setMatchScoreRed] = useState('');
	const [matchScoreBlue, setMatchScoreBlue] = useState('');

	var props = {
		robotRemarks, setRobotRemarks, climbSpeed, setClimbSpeed, sideClimb, setSideClimb,
		climbed, setClimbed, matchScoreRed, setMatchScoreRed, matchScoreBlue, setMatchScoreBlue,
		teleopAmp, setTeleopAmp, teleopSpeakerAttempts, setTeleopSpeakerAttempts,
		teleopAmpAttempts, setTeleopAmpAttempts, teleopPass, setTeleopPass,
		teleopDrop, setTeleopDrop, teleopAmplified, setTeleopAmplified,
		slams, setSlams, shotsBlocked, setShotsBlocked, usedAmplification, setUsedAmplification,
		usedNoteA, setusedNoteA, usedNoteB, setusedNoteB, usedNoteC, setusedNoteC,
		usedNoteD, setusedNoteD, usedNoteE, setusedNoteE, usedNoteF, setusedNoteF,
		usedNoteG, setusedNoteG, usedNoteH, setusedNoteH, autonNotesAttempts, setAutonNotesAttempts,
		autonNotes, setAutonNotes, leftAutonZone, setLeftAutonZone, startArea, setStartArea,
		station, setStation, preloaded, setPreloaded, noShow, setNoShow, isRedAlliance, setIsRedAlliance,
		teamNumber, setTeamNumber, match, setMatch, teleopSpeaker, setTeleopSpeaker
	};


	return (<NavigationContainer>
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
				}
			}
			}>
				<Tab.Screen name="Setup" children={() =>
					<Setup props={props} />} />
				<Tab.Screen name="Auton" children={() =>
					<Auton props={props} />} />
				<Tab.Screen name="Teleop" children={() =>
					<Teleop props={props} />} />
				<Tab.Screen name="EndGame" children={() =>
					<EndGame props={props} />} />
				<Tab.Screen name="Submit" children={() =>
					<Submit
						props={props}
						navigation={useNavigation()} />} />
			</Tab.Navigator>
		</SafeAreaView>
	</NavigationContainer>

	);
}