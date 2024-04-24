import {
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
import { Button, HStack, NativeBaseProvider, extendTheme, Center, VStack } from 'native-base';
import { styles, theme } from './Styles'

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
            <Text>preloaded = {props.preloaded}</Text>
            <Text>no show = {props.noShow}</Text>

        </View>
    )
}
