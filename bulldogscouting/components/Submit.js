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

const { StorageAccessFramework } = FileSystem;

export var matchData = {}; // Create an empty dictionary to store the match data.

// async function WriteToFile({ props }) {
//     const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync("content://com.android.externalstorage.documents/tree/primary%3ATest");
//     // Check if permission granted
//     if (permissions.granted) {
//       // Get the directory uri that was approved
//       let directoryUri = permissions.directoryUri;
//       let data = JSON.stringify({ match: props.match, isRedAlliance: props.isRedAlliance, teamNumber: props.teamNumber, notes: props.notes, bumps: props.bumps }); // Compile data to a json string.
//       // Create file and pass it's SAF URI
//       await StorageAccessFramework.createFileAsync(directoryUri, "test", "text/plain").then(async (fileUri) => {
//         // Save data to newly created file
//         await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
//         console.log(directoryUri)
//         alert("Submitted");
//       })
//         .catch((e) => {
//           console.log(e);
//         });
//     } else {
//       alert("You must allow permission to save.");
//     }
//   }

export function Submit({ props }) {
  const [permissionGranted, setPermissionGranted] = React.useState(null);
  const [directoryUri, setDirectoryUri] = React.useState(null);

  React.useEffect(() => {
    const checkPermission = async () => {
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      setPermissionGranted(permissions.granted);
      //console.log(permissionGranted)
    };

    checkPermission();
  }, []);

  const getDirectory = async () => {
    try {
      if (permissionGranted) {
        const { directoryUri } = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        setDirectoryUri(directoryUri);
      } else {
        Alert.alert('Permission Denied', 'You must allow permission to save.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while accessing the directory.');
    }
  };

  const writeToFile = async () => {
    try {
      if (permissionGranted && directoryUri) {
        const data = 'Hello, world! This is a test text file.';
        const fileUri = await FileSystem.writeAsStringAsync(directoryUri + '/example.txt', data, { encoding: FileSystem.EncodingType.UTF8 });
        Alert.alert('Success', 'Text saved to file.');
      } else {
        Alert.alert('Permission Denied', 'You must allow permission and select a directory to save the file.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving the file.');
    }
  };


  return (
    <View style={styles.generalViewStyle}>
      <Text>Submit</Text>
      <Button title="bumps" onPress={() => props.setBumps(props.bumps + 1)} />
      <Button title="Submit" onPress={() => writeToFile()} />
      <Text>Team = {props.teamNumber}</Text>
      <Text>Match = {props.match}</Text>
      <Text>Bumps = {props.bumps}</Text>
      <Text>Notes = {props.notes}</Text>
      <Text>preloaded = {props.preloaded.toString()}</Text>
      <Text>no show = {props.noShow.toString()}</Text>

    </View>
  )
}
