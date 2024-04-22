import {
  Button,
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
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  generalViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});

async function test({props}) {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    let data = JSON.stringify({ match: props.match, isRedAlliance: props.isRedAlliance, teamNumber: props.teamNumber, notes: props.notes, bumps: props.bumps }); // Compile data to a json string.
    // Create file and pass it's SAF URI
    await StorageAccessFramework.createFileAsync(directoryUri, "test", "text/plain").then(async (fileUri) => {
      // Save data to newly created file
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
      alert("Submitted");
    })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("You must allow permission to save.");
  }
}


function Setup({props}) {
  return (

    <View style={styles.generalViewStyle}>
      <Text>Setup</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.setMatch}
        value={props.match}
        placeholder="Match Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={props.setTeamNumber}
        value={props.teamNumber}
        placeholder="Team Number"
        keyboardType="numeric"
      />
    </View>
  )
}

function Auton({props}) {
  return (
    <View style={styles.generalViewStyle}>
      <Text>Auton</Text>
      <Button title="Up" onPress={() => props.setNotes(props.notes + 1)} />
      <Button title="Down" onPress={() => props.setNotes(props.notes - 1)} />
      <Text>{props.notes}</Text>
    </View>
  )
}

function Teleop({props}) {
  return (
    <View style={styles.generalViewStyle}>

      <Text>Teleop</Text>

      <Button title="Up" onPress={() => props.setBumps(props.bumps + 1)} />
      <Button title="Down" onPress={() => props.setBumps(props.bumps - 1)} />
      <Text>{props.bumps}</Text>

    </View>
  )
}

function EndGame({props}) {
  return (
    <View style={styles.generalViewStyle}>

      <Text>EndGame</Text>

    </View>
  )
}

function Submit({props}) {
  return (
    <View style={styles.generalViewStyle}>
      <Text>Submit</Text>
      <Button title="bumps" onPress={() => props.setBumps(props.bumps+1)} />
      <Button title="Submit" onPress={() => test(props = {props})} />
      <Text>Team = {props.teamNumber}</Text>
      <Text>Match = {props.match}</Text>
      <Text>Bumps = {props.bumps}</Text>
      <Text>Notes = {props.notes}</Text>

    </View>
  )
}


export default function App() {
  return (<NavigationContainer>{ScoutingApp()}</NavigationContainer>)
}


function ScoutingApp() {
  const [isRedAlliance, setIsRedAlliance] = useState(true);
  const [station, setStation] = useState(1);
  const [match, setMatch] = useState(1);
  const [bumps, setBumps] = useState(0);
  const [notes, setNotes] = useState(0);
  const [teamNumber, setTeamNumber] = React.useState('');

  var props = {isRedAlliance, setIsRedAlliance, teamNumber, setTeamNumber, match, setMatch, bumps, setBumps, notes, setNotes};


  return (
    <SafeAreaView style={styles.droidSafeArea}>
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
const { StorageAccessFramework } = FileSystem;