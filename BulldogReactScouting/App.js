import {
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const generalViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: "100%",
  backgroundColor: '#fff',
}

async function test() {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    let data = "Hello World";
    // Create file and pass it's SAF URI
    await StorageAccessFramework.createFileAsync(directoryUri, "test", "text/plain").then(async (fileUri) => {
      // Save data to newly created file
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
    })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("You must allow permission to save.");
  }
}

function Setup()
{
  return (
    <View style={generalViewStyle}>
      
      <Text>Setup</Text>
      
    </View>
  )
}

function Auton() {
  return (
    <View style={generalViewStyle}>
      
      <Text>Auton</Text>
      
      <Button title="One"/>
      
    </View>
  )
}

function Teleop()
{
  return (
    <View style={generalViewStyle}>
      
      <Text>Teleop</Text>
      
    </View>
  )
}

function EndGame()
{
  return (
    <View style={generalViewStyle}>
      
      <Text>EndGame</Text>
      
    </View>
  )
}


export default function App() {
  return (<NavigationContainer>{ScoutingApp()}</NavigationContainer>)
}
function ScoutingApp() {
  return (
    <View style={{ flex: 1, paddingTop: "10%", backgroundColor: "#fff" }}>
      <Tab.Navigator>
      <Tab.Screen name="Setup" component={Setup} />
        <Tab.Screen name="Auton" component={Auton} />
        <Tab.Screen name="Teleop" component={Teleop} />
        <Tab.Screen name="EndGame" component={EndGame} />
      </Tab.Navigator>
    </View>
  );
}
const { StorageAccessFramework } = FileSystem;