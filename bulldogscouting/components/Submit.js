import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
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

async function share() {
  Sharing.shareAsync("file:///data/user/0/host.exp.exponent/files/parsed_data.json")
}

async function WriteToFile({ props, navigation }) {

  let data = JSON.stringify({ match: props.match, isRedAlliance: props.isRedAlliance, teamNumber: props.teamNumber, notes: props.teleopSpeaker, bumps: props.bumps }); // Compile data to a json string.

  // Define file path
  const filePath = FileSystem.documentDirectory + 'parsed_data.json';

  // Write data to file
  await FileSystem.writeAsStringAsync(filePath, data);
  console.log(filePath)

  Alert.alert(
    `Submitted`,
    'Your data has been submitted.',
    [
      { text: 'Continue', onPress: () => navigation.navigate('Setup') },
    ]
  );
}

export function Submit({ props, navigation }) {
  // Inside your component function

  return (
    <View style={styles.generalViewStyle}>

      <View style={styles.vstack}>
        <View style={styles.hstack}>
          
          <View style={styles.vstack}>
          <Text style={{color:'red', fontWeight:'bold', fontSize:16}}>Red Score</Text>

            <TextInput
              style={styles.SingleLineInput}
              onChangeText={props.setMatchScoreRed}
              value={props.matchscoreRed}
              placeholder="Red Match Score"
              keyboardType="number-pad"
              inputMode='numeric'
            />
          </View>
          <View style={styles.vstack}>
          <Text style={{color:'blue', fontWeight:'bold', fontSize:16}}>Blue Score</Text>
            <TextInput
              style={styles.SingleLineInput}
              onChangeText={props.setMatchScoreBlue}
              value={props.matchscoreBlue}
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
          onChangeText={props.setRobotRemarks}
          value={props.robotRemarks}
          placeholder="Any thing else you wanna say about this robot?"
        />
        <Button buttonColor='purple' mode="contained" onPress={() => WriteToFile({ props, navigation })}>Submit</Button>
        <Button buttonColor='darkred' mode="contained" onPress={() => share()}>Share</Button>
      </View>

    </View>
  )
}
