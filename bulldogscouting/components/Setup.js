import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { styles, theme } from './Styles'
import {
  RadioButton,
  Switch
} from 'react-native-paper';


export function Setup({ props }) {
  return (

    <View style={styles.generalViewStyle}>
      <Text style={{ fontSize: 25 }}>Alliance Station</Text>
      <RadioButton.Group value={props.station} onValueChange={nextValue => { props.setStation(nextValue) }}>
        <View style={styles.hstack}>
          <View style={styles.vstack}>
            <View style={styles.radioView}>
              <Text>Red 1</Text>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="Red 1" />
            </View>
            <View style={styles.radioView}>
              <Text>Red 2</Text>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="Red 2" />
            </View>
            <View style={styles.radioView}>
              <Text>Red 3</Text>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='red' color='red' uncheckedColor='red' value="Red 3" />
            </View>
          </View>
          <View style={styles.vstack}>

            <View style={styles.radioView}>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="Blue 1" />
              <Text>Blue 1</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="Blue 2" />
              <Text>Blue 2</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='blue' color='blue' uncheckedColor='blue' value="Blue 3" />
              <Text>Blue 3</Text>
            </View>
          </View>
        </View>
      </RadioButton.Group>


      <View style={styles.hstack}>
        <View style={styles.vstack}>
          <Text style={{ fontSize: 18 }}>Preloaded</Text>
          <Switch onValueChange={() => { props.setPreloaded(!props.preloaded) }} value={props.preloaded} color='lime'></Switch>
        </View>
        <View style={styles.vstack}>
          <Text style={{ fontSize: 18 }}>No Show</Text>
          <Switch onValueChange={() => { props.setNoShow(!props.noShow) }} value={props.noShow} color='lime'></Switch>
        </View>
      </View>


      <View style={styles.hstack}>
        <View style={styles.vstack}>
          <Text>Match Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={props.setMatch}
            value={props.match}
            placeholder="Match Number"
            keyboardType="number-pad"
            inputMode='numeric'
          />
        </View>
        <View style={styles.vstack}>
          <Text>Team Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={props.setTeamNumber}
            value={props.teamNumber}
            placeholder="Team Number"
            keyboardType="number-pad"
            maxLength={5}
            inputMode='numeric'
          />
        </View>
      </View>

      <View style={styles.hstackFullWidth}>
        <Image
          style={styles.setupImage}
          source={(props.station === "Blue 1" || props.station === "Blue 2" || props.station === "Blue 3")
            ? require('../assets/BlueStartPosition.png') : require('../assets/RedStartPosition.png')} />
        <View style={styles.vstack}>
          <RadioButton.Group value={props.startArea} onValueChange={nextValue => { props.setStartArea(nextValue) }}>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="A" />
              <Text>A</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="B" />
              <Text>B</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="C" />
              <Text>C</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="D" />
              <Text>D</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="E" />
              <Text>E</Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton position='leading' style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='black' color='black' uncheckedColor='black' value="F" />
              <Text>F</Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </View>
  )
}