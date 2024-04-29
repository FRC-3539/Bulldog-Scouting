import {
    View,
    Text,
} from 'react-native';
import React, { useState } from 'react';
import { styles, theme } from './Styles'
import {
    Button,
    Checkbox,
    ToggleButton
} from 'react-native-paper';


export function Teleop({ props }) {
    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.vstack}>
                <Text style={{ fontSize: 25 }}>Speaker</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            {/* use math.max(value+1, 0) to limit going below zero */}
                        <Button buttonColor='green' mode="contained" onPress={() => props.setTeleopSpeaker(props.teleopSpeaker + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopSpeaker}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setTeleopSpeaker(props.teleopSpeaker - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='goldenrod' mode="contained" onPress={() => props.setTeleopSpeakerAttempts(props.teleopSpeakerAttempts + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopSpeakerAttempts}</Text>
                        <Button buttonColor='saddlebrown' mode="contained" onPress={() => props.setTeleopSpeakerAttempts(props.teleopSpeakerAttempts - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 25 }}>Amp</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='green' mode="contained" onPress={() => props.setTeleopAmp(props.teleopAmp + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopAmp}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setTeleopAmp(props.teleopAmp - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='goldenrod' mode="contained" onPress={() => props.setTeleopAmpAttempts(props.teleopAmpAttempts + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopAmpAttempts}</Text>
                        <Button buttonColor='saddlebrown' mode="contained" onPress={() => props.setTeleopAmpAttempts(props.teleopAmpAttempts - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Passes</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='green' mode="contained" onPress={() => props.setTeleopPass(props.teleopPass + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopPass}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setTeleopPass(props.teleopPass - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Amplified Notes</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='green' mode="contained" onPress={() => props.setTeleopAmplified(props.teleopAmplified + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.teleopAmplified}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setTeleopAmplified(props.teleopAmplified - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Slams</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='green' mode="contained" onPress={() => props.setSlams(props.slams + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.slams}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setSlams(props.slams - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Shots Blocked</Text>
                        <View style={styles.hstack}>
                        <Button buttonColor='green' mode="contained" onPress={() => props.setShotsBlocked(props.shotsBlocked + 1)}>+</Button>
                        <Text style={{ fontSize: 16 }}>{props.shotsBlocked}</Text>
                        <Button buttonColor='darkred' mode="contained" onPress={() => props.setShotsBlocked(props.shotsBlocked - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <View style={styles.hstack}>
                    <Text style={{ fontSize: 16 }}>Used Amplication?</Text>
                    <Checkbox
                        status={props.usedAmplification ? 'checked' : 'unchecked'}
                        onPress={() => {
                            props.setUsedAmplification(!props.usedAmplification);
                        }}
                        color='lime'
                    />
                </View>
            </View>
        </View>
    )
}