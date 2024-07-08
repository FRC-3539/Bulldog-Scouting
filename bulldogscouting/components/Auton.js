import {
	View,
	Text,
	Image,
} from 'react-native';
import React from 'react';
import { styles } from './Styles'
import {
	Checkbox,
	Button,
} from 'react-native-paper';

export function Auton({ props, setProps }) {
	return (
		<View style={styles.generalViewStyle}>
			<View style={styles.vstack}>
				<Text></Text>
				<View style={styles.hstack}>
					<Text style={{ fontSize: 16 }}>Left the starting zone?</Text>
					<Checkbox
						status={props.leftAutonZone ? 'checked' : 'unchecked'}
						onPress={() => {
							setProps.setLeftAutonZone(!props.leftAutonZone);
						}}
						color='#4e6e58'
					/>
				</View>
				<Text></Text>
				<View style={styles.hstack}>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Scored Notes</Text>
						<Button buttonColor='#6DD900' mode="contained" onPress={() => setProps.setAutonNotes(props.autonNotes + 1)}>+</Button>
						<Text style={{ fontSize: 20 }}>{props.autonNotes}</Text>
						<Button buttonColor='#e26d5c' mode="contained" onPress={() => setProps.setAutonNotes(Math.max(props.autonNotes - 1,0))}>-</Button>
					</View>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Failed Notes</Text>
						<Button buttonColor='#6DD900' mode="contained" onPress={() => setProps.setAutonNotesAttempts(props.autonNotesAttempts + 1)}>+</Button>
						<Text style={{ fontSize: 20 }}>{props.autonNotesAttempts}</Text>
						<Button buttonColor='#e26d5c' mode="contained" onPress={() => setProps.setAutonNotesAttempts(Math.max(props.autonNotesAttempts - 1,0))}>-</Button>
					</View>
				</View>
				<Text></Text>
				<View style={styles.hstackFullWidth}>
					<Image
						style={styles.setupImage}
						source={(props.station === "blue1" || props.station === "blue2" || props.station === "blue3")
							? require('../assets/BlueHalfAuton.png') : require('../assets/RedHalfAuton.png')}
					/>
					<View style={styles.vstack}>
						<View style={styles.radioView}>
							<Text>A</Text>
							<Checkbox status={props.usedNoteA ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteA(!props.usedNoteA); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>B</Text>
							<Checkbox status={props.usedNoteB ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteB(!props.usedNoteB); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>C</Text>
							<Checkbox status={props.usedNoteC ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteC(!props.usedNoteC); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>D</Text>
							<Checkbox status={props.usedNoteD ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteD(!props.usedNoteD); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>E</Text>
							<Checkbox status={props.usedNoteE ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteE(!props.usedNoteE); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>F</Text>
							<Checkbox status={props.usedNoteF ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteF(!props.usedNoteF); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>G</Text>
							<Checkbox status={props.usedNoteG ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteG(!props.usedNoteG); }} color='#4e6e58' />
						</View>
						<View style={styles.radioView}>
							<Text>H</Text>
							<Checkbox status={props.usedNoteH ? 'checked' : 'unchecked'} onPress={() => { setProps.setusedNoteH(!props.usedNoteH); }} color='#4e6e58' />
						</View>
					</View>
				</View>
			</View >
		</View>
	)
}