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
import { styles, theme } from './Styles'
import {
    SegmentedButtons,
    RadioButton,
    Checkbox,
} from 'react-native-paper';

export function EndGame({ props, setProps }) {
    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.hstack}>
                <View style={styles.vstack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Climb Speed</Text>
                    <RadioButton.Group value={props.climbSpeed} onValueChange={nextValue => { setProps.setClimbSpeed(nextValue) }}>
                        <View style={styles.vstackRadio}>
                            <View style={styles.radioView}>
                                <Text>No Climb</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='lime' color='lime' uncheckedColor='black' value="No Climb" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Slow</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='lime' color='lime' uncheckedColor='black' value="Slow" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Average</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='lime' color='lime' uncheckedColor='black' value="Average" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Fast</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='lime' color='lime' uncheckedColor='black' value="Fast" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Super Fast</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='lime' color='lime' uncheckedColor='black' value="Super Fast" />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.vstack}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Side Climb</Text>
                    <Checkbox status={props.sideClimb ? 'checked' : 'unchecked'} onPress={() => { setProps.setSideClimb(!props.sideClimb); }} color='lime' />
                </View>
            </View>

        </View>
    )
}