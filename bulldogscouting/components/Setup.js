import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  Switch,
  Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Radio, Button, HStack, NativeBaseProvider, extendTheme, Center, VStack } from 'native-base';
import { styles, theme } from './Styles'

export function Setup({ props }) {
  return (
    <View style={styles.generalViewStyle}>
      <Text></Text>
      <Text style={{ fontSize: 25 }}>Alliance Station</Text>
      <Text></Text>
      <Radio.Group value={props.station} onChange={nextValue => { props.setStation(nextValue) }}>
        <HStack space="10" justifyContent="center">
          <Center padding="5" bg="primary.100" rounded="md">
            <VStack space={2} justifyContent="center">
              <Radio value="Red 1">One</Radio>
              <Radio value="Red 2">Two</Radio>
              <Radio value="Red 3">Three</Radio>
            </VStack>
          </Center>
          <Center padding="5" bg="primary.50" rounded="md">
            <VStack space={2} justifyContent="center">
              <Radio value="Blue 1">One</Radio>
              <Radio value="Blue 2">Two</Radio>
              <Radio value="Blue 3">Three</Radio>
            </VStack>
          </Center>
        </HStack>
      </Radio.Group>
      <Text></Text>
      <HStack space={0
      } justifyContent="center">
        <VStack width="50%">
          <Center>
            <Text style={{ fontSize: 18 }}>Preloaded</Text>
            <Switch onValueChange={() => { props.setPreloaded(!props.preloaded) }} value={props.preloaded}></Switch>
          </Center>
        </VStack>
        <VStack width="50%">
          <Center>
            <Text style={{ fontSize: 18 }}>No Show</Text>
            <Switch onValueChange={() => { props.setNoShow(!props.noShow) }} value={props.noShow}></Switch>
          </Center>
        </VStack>
      </HStack>
      <Text></Text>
      <HStack space={2} justifyContent="center">
        <VStack alignContent="center" justifyContent="center">
          <Text>Match Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={props.setMatch}
            value={props.match}
            placeholder="Match Number"
            keyboardType="number-pad"
            inputMode='numeric'
          /></VStack>
        <VStack>
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
        </VStack>

      </HStack>
      <Text></Text>
      <HStack space={0} justifyContent="center" width="100%" height="40%">
        <Image
          style={styles.setupImage}
          source={(props.station === "Blue 1" || props.station === "Blue 2" || props.station === "Blue 3")
            ? require('../assets/BlueStartPosition.png') : require('../assets/RedStartPosition.png')} />
        <Center width={"50%"}>
          <Center padding="5" bg={(props.station === "Blue 1" || props.station === "Blue 2" || props.station === "Blue 3") ? 'primary.50' : 'primary.100'} alignContent="center" rounded="md">
            <Radio.Group value={props.startArea} onChange={nextValue => { props.setStartArea(nextValue) }}>
              <VStack width="100%" space="2">
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
                <Radio value="C">C</Radio>
                <Radio value="D">D</Radio>
                <Radio value="E">E</Radio>
                <Radio value="F">F</Radio>
              </VStack>
            </Radio.Group>
          </Center>
        </Center>

      </HStack>
    </View>
  )
}