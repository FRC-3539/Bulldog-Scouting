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

async function WriteToFile({ props }) {
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

export function Submit({ props }) {
    return (
        <View style={styles.generalViewStyle}>
            <Text>Submit</Text>
            <Button title="bumps" onPress={() => props.setBumps(props.bumps + 1)} />
            <Button title="Submit" onPress={() => WriteToFile(props = { props })} />
            <Text>Team = {props.teamNumber}</Text>
            <Text>Match = {props.match}</Text>
            <Text>Bumps = {props.bumps}</Text>
            <Text>Notes = {props.notes}</Text>
            <Text>preloaded = {props.preloaded.toString()}</Text>
            <Text>no show = {props.noShow.toString()}</Text>

        </View>
    )
}
