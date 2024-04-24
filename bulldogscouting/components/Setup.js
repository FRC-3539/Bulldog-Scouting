import {
  TextInput,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  Switch,
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
      <Radio.Group name="AllianceStation" value={props.station} onChange={nextValue => { props.setStation(nextValue) }}>
        <HStack space="10" justifyContent="center">
          <Center padding="5" bg="primary.100" rounded="md" shadow={3}>
            <VStack space={2} justifyContent="center">
              <Radio value="Red 1">One</Radio>
              <Radio value="Red 2">Two</Radio>
              <Radio value="Red 3">Three</Radio>
            </VStack>
          </Center>
          <Center padding="5" bg="primary.50" rounded="md" shadow={3}>
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
        <TextInput
          style={styles.input}
          onChangeText={props.setMatch}
          value={props.match}
          placeholder="Match Number"
          keyboardType="number-pad"
          inputMode='numeric'
        />
        <TextInput
          style={styles.input}
          onChangeText={props.setTeamNumber}
          value={props.teamNumber}
          placeholder="Team Number"
          keyboardType="number-pad"
          maxLength={5}
          inputMode='numeric'
        />
      </HStack>
    </View>
  )
}