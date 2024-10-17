import Checkbox from 'expo-checkbox';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { resetContext, softResetContext } from '../App';
import { styles } from './Styles';


export function EndGame({ route, navigation }) {
    const { updateStates, getStation, getNoShow } = route.params;

    // States that store specific match data that will be cleared after each submit.
    const [sideClimb, setSideClimb] = useState(false);
    const [climbSpeed, setClimbSpeed] = useState('No Climb');
    const [spotlit, setSpotlit] = useState(false);

    // On change in reset trigger variable from main app, reset state
    useEffect(() => {
        console.log('Endgame reset trigger activated');
        updateState('sideClimb', setSideClimb, false);
        updateState('climbSpeed', setClimbSpeed, 'No Climb');
        updateState('spotlit', setSpotlit, false);
    }, [resetContext, softResetContext]);

    // Intermediary state updater function
    // Sends update to main app and updates local state
    const updateState = (stateName, stateUpdateFunction, stateValue) => {
        updateStates({ [stateName]: stateValue });
        stateUpdateFunction(stateValue);
    };

    return (
        <View style={styles.vstack}>
            <View style={styles.hstack}>
                <View style={styles.vstack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Climb Speed</Text>
                    <RadioButtonGroup
                        selected={climbSpeed}
                        radioBackground={getNoShow()? "gray":'lime'}
                        
                        radioStyle={styles.radioStyle}
                        onSelected={
                            (nextValue) => {
                                if(!getNoShow())
                                    updateState('climbSpeed', setClimbSpeed, nextValue)
                            }
                        }
                    >
                        <RadioButtonItem label="No Climb" value="No Climb" />
                        <RadioButtonItem label="Slow" value="Slow" />
                        <RadioButtonItem label="Average" value="Average" />
                        <RadioButtonItem label="Fast" value="Fast" />
                        <RadioButtonItem label="Super Fast" value="Super Fast" />
                    </RadioButtonGroup>
                </View>
                <View style={styles.vstack}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Side Climb</Text>
                    <Checkbox
                        value={sideClimb}
                        style={styles.checkboxStyle}
                        disabled={getNoShow()}
                        onValueChange={
                            () => updateState('sideClimb', setSideClimb, !sideClimb)
                        }
                    />
                    <View style={{ height: 30 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Robot climbed on spotlit chain?</Text>
                    <Checkbox
                        value={spotlit}
                        style={styles.checkboxStyle}
                        disabled={getNoShow()}
                        onValueChange={
                            () => updateState('spotlit', setSpotlit, !spotlit)
                        }
                    />
                </View>

            </View>
            
        </View>
    )
}