import {
	View,
	Text,
	Image,
	Button,

} from 'react-native';
import React from 'react';
import { styles } from './Styles'
import Checkbox from 'expo-checkbox';

export function Auton({ props, setProps }) {
	return (
		<View style={styles.generalViewStyle}>
			<View style={styles.vstack}>
				<Text></Text>
				<View style={styles.hstack}>
					<Text style={{ fontSize: 16 }}>Left the starting zone?</Text>
					<Checkbox
						value={props.leftAutonZone}
						onValueChange={setProps.setLeftAutonZone}
					/>
				</View>
				<Text></Text>
				<View style={styles.hstack}>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Scored Notes</Text>
						<Button title="   +   " onPress={() => setProps.setAutonNotes(props.autonNotes + 1)} />
						<Text style={{ fontSize: 20 }}>{props.autonNotes}</Text>
						<Button title="   -   " onPress={() => setProps.setAutonNotes(Math.max(props.autonNotes - 1, 0))} />
					</View>
					<View style={styles.vstack}>
						<Text style={{ fontSize: 20 }}>Failed Notes</Text>
						<Button title="   +   " onPress={() => setProps.setAutonNotesAttempts(props.autonNotesAttempts + 1)} />
						<Text style={{ fontSize: 20 }}>{props.autonNotesAttempts}</Text>
						<Button title="   -   " onPress={() => setProps.setAutonNotesAttempts(Math.max(props.autonNotesAttempts - 1, 0))} />
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
							<Checkbox value={props.usedNoteA} onValueChange={setProps.setusedNoteA} />
						</View>
						<View style={styles.radioView}>
							<Text>B</Text>
							<Checkbox value={props.usedNoteB} onValueChange={setProps.setusedNoteB} />
						</View>
						<View style={styles.radioView}>
							<Text>C</Text>
							<Checkbox value={props.usedNoteC} onValueChange={setProps.setusedNoteC} />
						</View>
						<View style={styles.radioView}>
							<Text>D</Text>
							<Checkbox value={props.usedNoteD} onValueChange={setProps.setusedNoteD} />
						</View>
						<View style={styles.radioView}>
							<Text>E</Text>
							<Checkbox value={props.usedNoteE} onValueChange={setProps.setusedNoteE} />
						</View>
						<View style={styles.radioView}>
							<Text>F</Text>
							<Checkbox value={props.usedNoteF} onValueChange={setProps.setusedNoteF} />
						</View>
						<View style={styles.radioView}>
							<Text>G</Text>
							<Checkbox value={props.usedNoteG} onValueChange={setProps.setusedNoteG} />
						</View>
						<View style={styles.radioView}>
							<Text>H</Text>
							<Checkbox value={props.usedNoteH} onValueChange={setProps.setusedNoteH} />
						</View>
					</View>
				</View>
			</View >
		</View>
	)
}