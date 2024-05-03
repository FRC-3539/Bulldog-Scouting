import {
    View,
    Text,
} from 'react-native';
import { styles } from './Styles'
import {
    Button,
    Checkbox,
} from 'react-native-paper';


export function Teleop({ props, setProps }) {
    return (
        <View style={styles.generalViewStyle}>
            <View style={styles.vstack}>
                <Text style={{ fontSize: 25 , fontWeight: 'bold' }}>Speaker</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            {/* use math.max(value+1, 0) to limit going below zero */}
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setTeleopSpeaker(props.teleopSpeaker + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopSpeaker}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setTeleopSpeaker(props.teleopSpeaker - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='goldenrod' mode="contained" onPress={() => setProps.setTeleopSpeakerAttempts(props.teleopSpeakerAttempts + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopSpeakerAttempts}</Text>
                            <Button buttonColor='saddlebrown' mode="contained" onPress={() => setProps.setTeleopSpeakerAttempts(props.teleopSpeakerAttempts - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 25, fontWeight: 'bold'  }}>Amp</Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Scored Notes</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setTeleopAmp(props.teleopAmp + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopAmp}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setTeleopAmp(props.teleopAmp - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 }}>Missed Notes</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='goldenrod' mode="contained" onPress={() => setProps.setTeleopAmpAttempts(props.teleopAmpAttempts + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopAmpAttempts}</Text>
                            <Button buttonColor='saddlebrown' mode="contained" onPress={() => setProps.setTeleopAmpAttempts(props.teleopAmpAttempts - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20 , fontWeight: 'bold' }}>Passes</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setTeleopPass(props.teleopPass + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopPass}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setTeleopPass(props.teleopPass - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'  }}>Amplified Notes</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setTeleopAmplified(props.teleopAmplified + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.teleopAmplified}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setTeleopAmplified(props.teleopAmplified - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 20 }}></Text>
                <View style={styles.hstack}>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'  }}>Slams</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setSlams(props.slams + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.slams}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setSlams(props.slams - 1)}>-</Button>
                        </View>
                    </View>
                    <View style={styles.vstack}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'  }}>Shots Blocked</Text>
                        <View style={styles.hstack}>
                            <Button buttonColor='green' mode="contained" onPress={() => setProps.setShotsBlocked(props.shotsBlocked + 1)}>+</Button>
                            <Text style={{ fontSize: 16 }}>{props.shotsBlocked}</Text>
                            <Button buttonColor='darkred' mode="contained" onPress={() => setProps.setShotsBlocked(props.shotsBlocked - 1)}>-</Button>
                        </View>
                    </View>
                </View>
                <View style={styles.hstack}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold'  }}>Used Amplication?</Text>
                    <Checkbox
                        status={props.usedAmplification ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setProps.setUsedAmplification(!props.usedAmplification);
                        }}
                        color='lime'
                    />
                </View>
            </View>
        </View>
    )
}