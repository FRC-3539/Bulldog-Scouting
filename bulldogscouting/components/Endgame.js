import {
    View,
    Text,
} from 'react-native';
import React from 'react';
import { styles } from './Styles'
import Checkbox from 'expo-checkbox';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";


export function EndGame({ props, setProps }) {
    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.hstack}>
                <View style={styles.vstack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Climb Speed</Text>
                    <RadioButtonGroup selected={props.climbSpeed} onSelected={(nextValue) => { setProps.setClimbSpeed(nextValue) }}>
                            <RadioButtonItem label="No Climb" value="No Climb" />
                            <RadioButtonItem label="Slow" value="Slow" />
                            <RadioButtonItem label="Average" value="Average" />
                            <RadioButtonItem label="Fast" value="Fast" />
                            <RadioButtonItem label="Super Fast" value="Super Fast" />
                    </RadioButtonGroup>
                </View>
                <View style={styles.vstack}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Side Climb</Text>
                    <Checkbox value={props.sideClimb} onValueChange={setProps.setSideClimb} />
                </View>
            </View>

        </View>
    )
}