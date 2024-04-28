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
import { NavigationContainer } from '@react-navigation/native';
import { Setup } from './components/Setup';
import { Auton } from './components/Auton';
import { styles, theme } from './components/Styles'
import { Teleop } from './components/Teleop';
import { EndGame } from './components/Endgame';
import { Submit } from './components/Submit';

const Tab = createMaterialTopTabNavigator();


export default function App() {
	return (<NavigationContainer>{ScoutingApp()}</NavigationContainer>)
}

function ScoutingApp() {
	const [isRedAlliance, setIsRedAlliance] = useState(true);
	const [noShow, setNoShow] = useState(false);
	const [preloaded, setPreloaded] = useState(false);
	const [station, setStation] = useState("red1");
	const [startArea, setStartArea] = useState("A");
	const [match, setMatch] = useState("1");
	const [teleopSpeaker, setTeleopSpeaker] = useState(0);
	const [teleopAmp, setTeleopAmp] = useState(0);
	const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
	const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
	const [teleopAmplified, setTeleopAmplified] = useState(0);
	const [teleopPass, setTeleopPass] = useState(0);
	const [teleopDrop, setTeleopDrop] = useState(0);
	const [slams, setSlams] = useState(0);
	const [shotsBlocked, setShotsBlocked] = useState(0);

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


	var props = {
		teleopAmp, setTeleopAmp,teleopSpeakerAttempts, setTeleopSpeakerAttempts,
		teleopAmpAttempts, setTeleopAmpAttempts, teleopPass, setTeleopPass,
		teleopDrop, setTeleopDrop, teleopAmplified, setTeleopAmplified,
		slams, setSlams,shotsBlocked, setShotsBlocked,
		usedNoteA, setusedNoteA, usedNoteB, setusedNoteB, usedNoteC, setusedNoteC,
		usedNoteD, setusedNoteD, usedNoteE, setusedNoteE, usedNoteF, setusedNoteF,
		usedNoteG, setusedNoteG, usedNoteH, setusedNoteH, autonNotesAttempts, setAutonNotesAttempts,
		autonNotes, setAutonNotes, leftAutonZone, setLeftAutonZone, startArea, setStartArea,
		station, setStation, preloaded, setPreloaded, noShow, setNoShow, isRedAlliance, setIsRedAlliance,
		teamNumber, setTeamNumber, match, setMatch, teleopSpeaker, setTeleopSpeaker
	};

	return (
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
					<Setup props={props}
					></Setup>} />
				<Tab.Screen name="Auton" children={() =>
					<Auton props={props}
					></Auton>} />
				<Tab.Screen name="Teleop" children={() =>
					<Teleop props={props}
					></Teleop>} />
				<Tab.Screen name="EndGame" children={() =>
					<EndGame props={props}
					></EndGame>} />
				<Tab.Screen name="Submit" children={() =>
					<Submit
						props={props}
					></Submit>} />
			</Tab.Navigator>
		</SafeAreaView>

	);
}
