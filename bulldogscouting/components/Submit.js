import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  unstable_batchedUpdates,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { styles, theme } from './Styles'
import * as Sharing from 'expo-sharing';
import {
  Button,
} from 'react-native-paper';


export var matchData = {}; // Create an empty dictionary to store the match data.

const filePath = FileSystem.documentDirectory + 'data.json';


async function share() {
  Sharing.shareAsync(filePath)
}

async function WriteToFile({ props, setProps, navigation }) {

  let data = JSON.stringify(props); // Compile data to a json string.

  // Write data to file
  await FileSystem.writeAsStringAsync(filePath, data);

  // //Setup
  // const [noShow, setNoShow] = useState(false);
  // const [preloaded, setPreloaded] = useState(false);
  // const [station, setStation] = useState("red1");
  // const [startArea, setStartArea] = useState("A");
  // const [match, setMatch] = useState("1");

  // //Auton
  // const [autonNotes, setAutonNotes] = useState(0);
  // const [autonNotesAttempts, setAutonNotesAttempts] = useState(0);
  // const [teamNumber, setTeamNumber] = React.useState('');
  // const [leftAutonZone, setLeftAutonZone] = React.useState(false);

  // const [usedNoteA, setusedNoteA] = React.useState(false);
  // const [usedNoteB, setusedNoteB] = React.useState(false);
  // const [usedNoteC, setusedNoteC] = React.useState(false);
  // const [usedNoteD, setusedNoteD] = React.useState(false);
  // const [usedNoteE, setusedNoteE] = React.useState(false);
  // const [usedNoteF, setusedNoteF] = React.useState(false);
  // const [usedNoteG, setusedNoteG] = React.useState(false);
  // const [usedNoteH, setusedNoteH] = React.useState(false);

  // // Teleop
  // const [teleopSpeaker, setTeleopSpeaker] = useState(0);
  // const [teleopAmp, setTeleopAmp] = useState(0);
  // const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
  // const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
  // const [teleopAmplified, setTeleopAmplified] = useState(0);
  // const [usedAmplification, setUsedAmplification] = useState(0);
  // const [teleopPass, setTeleopPass] = useState(0);
  // const [slams, setSlams] = useState(0);
  // const [shotsBlocked, setShotsBlocked] = useState(0);

  // // EndGame
  // const [climbed, setClimbed] = useState(false);
  // const [sideClimb, setSideClimb] = useState(false);
  // const [climbSpeed, setClimbSpeed] = useState(0);

  // //Submit
  // const [robotRemarks, setRobotRemarks] = useState('');
  // const [matchScoreRed, setMatchScoreRed] = useState('');
  // const [matchScoreBlue, setMatchScoreBlue] = useState('');

  // Reset All States except, station and match number.
  // Group all updates into one render.
  unstable_batchedUpdates(() => {
    setProps.setTeamNumber('')
    setProps.setMatch("" + (Number(props.match) + 1))

    setProps.setNoShow(false)
    setProps.setPreloaded(false)
    setProps.setStartArea('A')
    setProps.setAutonNotes(0)
    setProps.setAutonNotesAttempts(0)
    setProps.setLeftAutonZone(false)

    setProps.setusedNoteA(false)
    setProps.setusedNoteB(false)
    setProps.setusedNoteC(false)
    setProps.setusedNoteD(false)
    setProps.setusedNoteE(false)
    setProps.setusedNoteF(false)
    setProps.setusedNoteG(false)
    setProps.setusedNoteH(false)

    setProps.setTeleopSpeaker(0)
    setProps.setTeleopAmp(0)
    setProps.setTeleopSpeakerAttempts(0)
    setProps.setTeleopAmpAttempts(0)
    setProps.setTeleopAmplified(0)
    setProps.setUsedAmplification(0)
    setProps.setTeleopPass(0)
    setProps.setSlams(0)
    setProps.setShotsBlocked(0)

    setProps.setClimbed(false)
    setProps.setSideClimb(false)
    setProps.setClimbSpeed(0)

    setProps.setRobotRemarks("")
    setProps.setMatchScoreRed("")
    setProps.setMatchScoreBlue("")
  })

  Alert.alert(
    `Submitted`,
    'Your data has been submitted.',
    [
      { text: 'Continue', onPress: () => navigation.navigate('Setup') },
    ]
  );
}

export function Submit({ props, setProps, navigation }) {
  // Inside your component function

  return (
    <View style={styles.generalViewStyle}>

      <View style={styles.vstack}>
        <View style={styles.hstack}>

          <View style={styles.vstack}>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Red Score</Text>

            <TextInput
              style={styles.SingleLineInput}
              onChangeText={setProps.setMatchScoreRed}
              value={props.matchScoreRed}
              placeholder="Red Match Score"
              keyboardType="number-pad"
              inputMode='numeric'
            />
          </View>
          <View style={styles.vstack}>
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 16 }}>Blue Score</Text>
            <TextInput
              style={styles.SingleLineInput}
              onChangeText={setProps.setMatchScoreBlue}
              value={props.matchScoreBlue}
              placeholder="Blue Match Score"
              keyboardType="number-pad"
              inputMode='numeric'
            />
          </View>
        </View>
        <TextInput
          editable
          multiline
          style={styles.MultiLineInput}
          numberOfLines={8}
          onChangeText={setProps.setRobotRemarks}
          value={props.robotRemarks}
          placeholder="Any thing else you wanna say about this robot?"
        />
        <Button buttonColor='purple' mode="contained" onPress={() => WriteToFile({ props, setProps, navigation })}>Submit</Button>
        <Button buttonColor='darkred' mode="contained" onPress={() => share()}>Share</Button>
      </View>

    </View>
  )
}
