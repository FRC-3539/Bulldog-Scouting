import { StyleSheet, Text, View, Image } from 'react-native';
import { Switch, } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import {useEndgameStore} from "../Stores/StateStore"
import React, { useEffect, useState } from 'react';
import { Spacer } from 'react-native-stacks';
import endgameBlueBarge from "../assets/endgame_blue.webp"
import endgameRedBarge from "../assets/endgame_red.webp"


export default function Endgame() {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    const [value, setValue] = useState(0)
    const { allianceColor, allianceStation, teamNumber, matchData, matchNumber, set, climbTime, climbPosition, climbAttempt } = useEndgameStore();
    useEffect(() => {
        set({
            teamNumber: matchData?.[matchNumber]?.[allianceColor + allianceStation] ?? ''
        })
    }, [allianceColor, allianceStation, matchNumber, matchData]);
    return (
        <View style={styles.container}>
            <Spacer />
            <Text>Attempt</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={climbAttempt ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => set({ climbAttempt: value })}
                value={climbAttempt}
            />
            <Text>Time Used</Text>
            <RadioButtonGroup
                containerStyle={styles.RadioButtonGroup}
                selected={climbTime}
                onSelected={(value) => set({ climbTime: value })}
                radioBackground="green"
            >
                <RadioButtonItem value="d" label="<5" />
                <RadioButtonItem value="e" label="~5" />
                <RadioButtonItem value="f" label="<10" />

            </RadioButtonGroup>
            <Spacer />
             <Image style={styles.endgameBarge} source={allianceColor == "red" ? endgameRedBarge : endgameBlueBarge} />
             <Spacer />
            <RadioButtonGroup
                containerStyle={styles.RadioButtonGroup}
                selected={climbPosition}
                onSelected={(value) => set({ climbPosition: value })}
                radioBackground="green"
            >
               
                <RadioButtonItem value="a" label="Park" />
                
                <RadioButtonItem value="b" label="Shallow" />
                
                <RadioButtonItem value="c" label="Deep" />
                

            </RadioButtonGroup>
            <Spacer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe3e3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5
    },
    Slider: {
        width: "75%",
    },
    tinyLogo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    RadioButtonGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    endgameBarge: {
        width: '400',
        height: '400',
        resizeMode: "stretch"

    }






});
