import { StyleSheet, Text, View, Image} from 'react-native';
import { Switch, } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import useStateStore from "../Stores/StateStore"
import React, { useEffect, useState } from 'react';
import { Spacer } from 'react-native-stacks';
import {endgameBlueBarge} from "../assets/endgame_blue.png"
import {endgameRedBarge} from "../assets/endgame_red.png"

export default function Endgame() {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);
    const [value, setValue] = useState(0)
    const { allianceColor, allianceStation, teamNumber, matchData, matchNumber, set, climbTime, climbPosition } = useStateStore();
    useEffect(() => {
        set({
            teamNumber: matchData?.[matchNumber]?.[allianceColor + allianceStation] ?? ''
        })
    }, [allianceColor, allianceStation, matchNumber, matchData]);
    return (


        <View style={styles.container}>

            <Text>Attempt</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
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

            
           
<Spacer/>
            <RadioButtonGroup
                containerStyle={styles.RadioButtonGroup}
                selected={climbPosition}
                onSelected={(value) => set({ climbPosition: value })}
                radioBackground="green"
            >

                <Spacer />
                <RadioButtonItem value="a" label="park" />
                <Spacer />
                <RadioButtonItem value="b" label="shallow" />
                <Spacer />
                <RadioButtonItem value="c" label="deep" />
                <Spacer />

            </RadioButtonGroup>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    
    




});
