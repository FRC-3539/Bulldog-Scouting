import {
    View,
    Text,
    Button,
} from 'react-native';
import { styles } from './Styles'
import Checkbox from 'expo-checkbox'

export function Teleop({ props, setProps }) {
    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.vstack}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Speaker</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopSpeaker(props.teleopSpeaker + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopSpeaker}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopSpeaker(Math.max(props.teleopSpeaker - 1, 0))} />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopSpeakerAttempts(props.teleopSpeakerAttempts + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopSpeakerAttempts}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopSpeakerAttempts(Math.max(props.teleopSpeakerAttempts - 1, 0))} />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Amp</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopAmp(props.teleopAmp + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopAmp}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopAmp(Math.max(props.teleopAmp - 1, 0))} />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopAmpAttempts(props.teleopAmpAttempts + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopAmpAttempts}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopAmpAttempts(Math.max(props.teleopAmpAttempts - 1, 0))} />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Passes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopPass(props.teleopPass + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopPass}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopPass(Math.max(props.teleopPass - 1, 0))} />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Amplified Notes</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setTeleopAmplified(props.teleopAmplified + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.teleopAmplified}</Text>
                            <Button title="   -   " onPress={() => setProps.setTeleopAmplified(Math.max(props.teleopAmplified - 1, 0))} />
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Slams</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setSlams(props.slams + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.slams}</Text>
                            <Button title="   -   " onPress={() => setProps.setSlams(Math.max(props.slams - 1, 0))} />
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Shots Blocked</Text>
                        <View style={styles.hstack}>
                            <Button title="   +   " onPress={() => setProps.setShotsBlocked(props.shotsBlocked + 1)} />
                            <Text style={{ fontSize: 16 }}>{props.shotsBlocked}</Text>
                            <Button title="   -   " onPress={() => setProps.setShotsBlocked(Math.max(props.shotsBlocked - 1, 0))} />
                        </View>
                    </View>
                </View>
                <View style={styles.radioView}>
                    <Text>Used Amplication?</Text>
                    <Checkbox value={props.usedAmplification} onValueChange={setProps.setUsedAmplification} />
                </View>
            </View>
        </View>
    )
}