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
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles, theme } from './Styles'
import {
	Checkbox,
	Button,
	RadioButton
} from 'react-native-paper';

export function Auton({ props, setProps }) {
	return (
		<View style={styles.generalViewStyle}>
			<Text style={{ fontSize: 30 }}>Auton</Text>
			<Text></Text>
			<View style={styles.hstack}>
				<Text style={{ fontSize: 16 }}>Left the starting zone?</Text>
				<Checkbox
					status={props.leftAutonZone ? 'checked' : 'unchecked'}
					onPress={() => {
						setProps.setLeftAutonZone(!props.leftAutonZone);
					}}
					color='lime'
				/>
			</View>
			<Text></Text>
			<View style={styles.hstack}>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 20 }}>Scored Notes</Text>
					<Button buttonColor='green' mode="contained" onPress={() => setProps.setAutonNotes(props.autonNotes + 1)}>+</Button>
					<Text style={{ fontSize: 20 }}>{props.autonNotes}</Text>
					<Button buttonColor='darkred' mode="contained" onPress={() => setProps.setAutonNotes(props.autonNotes - 1)}>-</Button>
				</View>
				<View style={styles.vstack}>
					<Text style={{ fontSize: 20 }}>Failed Notes</Text>
					<Button buttonColor='green' mode="contained" onPress={() => setProps.setAutonNotesAttempts(props.autonNotesAttempts + 1)}>+</Button>
					<Text style={{ fontSize: 20 }}>{props.autonNotesAttempts}</Text>
					<Button buttonColor='darkred' mode="contained" onPress={() => setProps.setAutonNotesAttempts(props.autonNotesAttempts - 1)}>-</Button>
				</View>
			</View>
			<Text></Text>
			<View style={styles.hstackFullWidth}>
				<Image
					style={styles.setupImage}
					source={(props.station === "Blue 1" || props.station === "Blue 2" || props.station === "Blue 3")
						? require('../assets/BlueStartPosition.png') : require('../assets/RedStartPosition.png')} />
				<View style={styles.vstack}>
					<View style={styles.radioView}>
						<Text>A</Text>
						<Checkbox status={props.usedNoteA ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteA(!props.usedNoteA); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>B</Text>
						<Checkbox status={props.usedNoteB ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteB(!props.usedNoteB); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>C</Text>
						<Checkbox status={props.usedNoteC ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteC(!props.usedNoteC); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>D</Text>
						<Checkbox status={props.usedNoteD ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteD(!props.usedNoteD); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>E</Text>
						<Checkbox status={props.usedNoteE ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteE(!props.usedNoteE); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>F</Text>
						<Checkbox status={props.usedNoteF ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteF(!props.usedNoteF); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>G</Text>
						<Checkbox status={props.usedNoteG ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteG(!props.usedNoteG); }} color='lime' />
					</View>
					<View style={styles.radioView}>
						<Text>H</Text>
						<Checkbox status={props.usedNoteH ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteH(!props.usedNoteH); }} color='lime' />
					</View>
				</View>
			</View>
		</View >
	)
}