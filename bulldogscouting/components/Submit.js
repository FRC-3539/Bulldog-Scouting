import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles, theme } from './Styles'
import * as Sharing from 'expo-sharing';

export var matchData = {}; // Create an empty dictionary to store the match data.

async function share() {
  Sharing.shareAsync("file:///data/user/0/host.exp.exponent/files/parsed_data.json")
}

async function WriteToFile({ props }) {

  let data = JSON.stringify({ match: props.match, isRedAlliance: props.isRedAlliance, teamNumber: props.teamNumber, notes: props.teleopSpeaker, bumps: props.bumps }); // Compile data to a json string.

  // Define file path
  const filePath = FileSystem.documentDirectory + 'parsed_data.json';

  // Write data to file
  await FileSystem.writeAsStringAsync(filePath, data);
  console.log(filePath)
  alert("Submitted");
}

export function Submit({ props }) {

  return (
    <View style={styles.generalViewStyle}>
      <Text>Submit</Text>
      <Button title="Submit" onPress={() => WriteToFile(props = { props })} />
      <Button title="Share" onPress={() => share()} />
      <Text>Team = {props.teamNumber}</Text>
      <Text>Match = {props.match}</Text>
      <Text>Notes = {props.teleopSpeaker}</Text>
      <Text>preloaded = {props.preloaded.toString()}</Text>
      <Text>no show = {props.noShow.toString()}</Text>

    </View>
  )
}
