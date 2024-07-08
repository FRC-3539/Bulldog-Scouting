import {
    View,
    Text,
} from 'react-native';
import React from 'react';
import { styles } from './Styles'
import {
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
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='#4e6e58' color='#4e6e58' uncheckedColor='black' value="No Climb" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Slow</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='#4e6e58' color='#4e6e58' uncheckedColor='black' value="Slow" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Average</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='#4e6e58' color='#4e6e58' uncheckedColor='black' value="Average" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Fast</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='#4e6e58' color='#4e6e58' uncheckedColor='black' value="Fast" />
                            </View>
                            <View style={styles.radioView}>
                                <Text>Super Fast</Text>
                                <RadioButton style={styles.radioStyle} labelStyle={styles.radioLabelStyle} rippleColor='#4e6e58' color='#4e6e58' uncheckedColor='black' value="Super Fast" />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.vstack}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Side Climb</Text>
                    <Checkbox status={props.sideClimb ? 'checked' : 'unchecked'} onPress={() => { setProps.setSideClimb(!props.sideClimb); }} color='#4e6e58' />
                </View>
            </View>

        </View>
    )
}