import {
    View,
    Text,
    Button,
} from 'react-native';
import { styles } from './Styles';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';

export function Teleop({ updateStates, resetTrigger }) {
	const [teleopSpeaker, setTeleopSpeaker] = useState(0);
	const [teleopAmp, setTeleopAmp] = useState(0);
	const [teleopSpeakerAttempts, setTeleopSpeakerAttempts] = useState(0);
	const [teleopAmpAttempts, setTeleopAmpAttempts] = useState(0);
	const [teleopAmplified, setTeleopAmplified] = useState(0);
	const [usedAmplification, setUsedAmplification] = useState(false);
	const [teleopPass, setTeleopPass] = useState(0);
	const [slams, setSlams] = useState(0);
	const [shotsBlocked, setShotsBlocked] = useState(0);

    // On change in reset trigger variable from main app, reset state
	useEffect(() => {
		console.log('Teleop reset trigger activated');
        updateState('teleopSpeaker', setTeleopSpeaker, 0);
        updateState('teleopAmp', setTeleopAmp, 0);
        updateState('teleopSpeakerAttempts', setTeleopSpeakerAttempts, 0);
        updateState('teleopAmpAttempts', setTeleopAmpAttempts, 0);
        updateState('teleopAmplified', setTeleopAmplified, 0);
        updateState('usedAmplification', setUsedAmplification, false);
        updateState('teleopPass', setTeleopPass, 0);
        updateState('slams', setSlams, 0);
        updateState('shotsBlocked', setShotsBlocked, 0);
	}, [resetTrigger]);

	// Intermediary state updater function
	// Sends update to main app and updates local state
	const updateState = (stateName, stateUpdateFunction, stateValue) => {
		updateStates({stateName: stateValue});
		stateUpdateFunction(stateValue);
	};

    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.vstack}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Speaker</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopSpeaker', setTeleopSpeaker, teleopSpeaker + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopSpeaker}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopSpeaker', setTeleopSpeaker, Math.max(teleopSpeaker - 1, 0))
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopSpeakerAttempts', setTeleopSpeakerAttempts, teleopSpeakerAttempts + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopSpeakerAttempts}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopSpeakerAttempts', setTeleopSpeakerAttempts, Math.max(teleopSpeakerAttempts - 1, 0))
                                }
                            />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Amp</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopAmp', setTeleopAmp, teleopAmp + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopAmp}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopAmp', setTeleopAmp, Math.max(teleopAmp - 1, 0))
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopAmpAttempts', setTeleopAmpAttempts, teleopAmpAttempts + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopAmpAttempts}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopAmpAttempts', setTeleopAmpAttempts, Math.max(teleopAmpAttempts - 1, 0))
                                }
                            />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Passes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopPass', setTeleopPass, teleopPass + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopPass}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopPass', setTeleopPass, Math.max(teleopPass - 1, 0))
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Amplified Notes</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('teleopAmplified', setTeleopAmplified, teleopAmplified + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{teleopAmplified}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('teleopAmplified', setTeleopAmplified, Math.max(teleopAmplified - 1, 0))
                                }
                            />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Slams</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('slams', setSlams, slams + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{slams}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('slams', setSlams, Math.max(slams - 1, 0))
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Shots Blocked</Text>
                        <View style={styles.hstack}>
                            <Button
                                title='   +   '
                                onPress={
                                    () => updateState('shotsBlocked', setShotsBlocked, shotsBlocked + 1)
                                }
                            />
                            <Text style={{ fontSize: 16 }}>{shotsBlocked}</Text>
                            <Button
                                title='   -   '
                                onPress={
                                    () => updateState('shotsBlocked', setShotsBlocked, Math.max(shotsBlocked - 1, 0))
                                }
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.radioView}>
                    <Text>Used Amplication?</Text>
                    <Checkbox
                        value={usedAmplification}
                        onValueChange={
                            () => updateState('usedAmplification', setUsedAmplification, !usedAmplification)
                        }
                    />
                </View>
            </View>
        </View>
    )
}