import {
  TextInput,
  View,
  Text,
  Alert,
  unstable_batchedUpdates,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { styles } from './Styles'
import * as Sharing from 'expo-sharing';
import {
  Button,
  Portal,
  Dialog,
} from 'react-native-paper';


export var matchData = {}; // Create an empty dictionary to store the match data.

const filePath = FileSystem.documentDirectory + 'data.json';

const clearFilePass = '3539'


async function share() {
  Sharing.shareAsync(filePath)
}

async function tryClearFile(password, setPassword, hideDialog) {
  if (password == clearFilePass) {
    Alert.alert(
      `Are you sure?`,
      'Clearing the data will erase all currently stored scouting data and will be unrecoverable',
      [
        { text: 'Cancel' },
        { text: 'Continue', onPress: clearFile },
      ]
    );
  }
  else {
    Alert.alert(
      `Error`,
      'Incorrect password.',
      [
        { text: 'Return' },
      ]
    );
  }
  setPassword('')
  hideDialog()
}

async function clearFile() {
  await FileSystem.writeAsStringAsync(filePath, ' ')
}


async function WriteToFile({ props, setProps, navigation }) {

  let matchData = JSON.stringify(props); // Compile data to a json string.

  const dirInfo = await FileSystem.getInfoAsync(filePath);
  let existingContent = "";
  if (dirInfo.exists) {
    existingContent = await FileSystem.readAsStringAsync(filePath);
    if (existingContent.trim() !== '') {
      fileContent = JSON.parse(existingContent); // Parse existing JSON.
    }
    else {
      fileContent = {};
    }
  }
  else {
    fileContent = {};
  }



  // Check if the "matches" list exists, if not create it.
  if (!fileContent.matches) {
    fileContent.matches = [];
  }

  // Add the new data to the "matches" list.
  fileContent.matches.push(props);

  // Write data to file
  await FileSystem.writeAsStringAsync(filePath, JSON.stringify(fileContent, null, 2));

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

    setProps.setSideClimb(false)
    setProps.setClimbSpeed('No Climb')

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
  const [visible, setVisible] = React.useState(false)

  const [password, setPassword] = useState('')

  const showDialog = () => setVisible(true)

  const hideDialog = () => {
    setVisible(false)
    setPassword('')
  }
  //Ignore the stuiped return button...
  const handleOnChangeText = (text) => {
    if (text.charAt(text.length - 1) === '\n') {
      setProps.setRobotRemarks(text.slice(0, -1));
    } else {
      setProps.setRobotRemarks(text);
    }
  };

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
          onChangeText={handleOnChangeText}
          value={props.robotRemarks}
          placeholder="Any thing else you wanna say about this robot?"
          returnKeyType ='done'
          />
          
        <Button buttonColor='purple' mode="contained" onPress={() => WriteToFile({ props, setProps, navigation })}>Submit</Button>
        <Button buttonColor='darkred' mode="contained" onPress={() => share()}>Share</Button>
        <Button buttonColor='darkred' mode="contained" onPress={() => showDialog()}> Clear File </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Enter Your Password</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.SingleLineInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={() => tryClearFile(password, setPassword, hideDialog)}>Continue</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>

    </View>
  )
}
