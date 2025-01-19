import { useState } from 'react';
import { StyleSheet } from 'react-native';
import React from 'react';
import Homepage from './Pages/Homepage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Auton from './Pages/Auton';
import Endgame from './Pages/Endgame';
import Teleop from './Pages/Teleop';
import Final from './Pages/Final';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as FileSystem from 'expo-file-system';



const Tab = createBottomTabNavigator();

// Create some file paths that we for sure have permissions to read and write to.
export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';

export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="house" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Auton" component={Auton} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="robot" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Teleop" component={Teleop} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="person" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Endgame" component={Endgame} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="hourglass-end" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Final" component={Final} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="paper-plane" size={size} color={color} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5
  },
  Slider: {
    width: "75%",
  },
  tinyLogo: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  }


});
