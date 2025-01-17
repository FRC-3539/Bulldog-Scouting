import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import testimage from "./assets/icon.png";
import Homepage from './Pages/Homepage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Auton from './Pages/Auton';
import Endgame from './Pages/Endgame';
import Teleop from './Pages/Teleop';
import Final from './Pages/Final';


const Tab = createBottomTabNavigator();
export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Auton" component={Auton} />
        <Tab.Screen name="Teleop" component={Teleop} />
        <Tab.Screen name="Endgame" component={Endgame} />
        <Tab.Screen name="Final" component={Final} />
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
