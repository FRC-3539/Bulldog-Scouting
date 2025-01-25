import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Switch, } from 'react-native';
import { useEndgameStore, useSettingsStore, useHomeStore } from "../Stores/StateStore"
import React, { useEffect } from 'react';
import { Spacer, HStack, VStack } from 'react-native-stacks';
import endgameBlueBarge from "../assets/endgame_blue.webp"
import endgameRedBarge from "../assets/endgame_red.webp"
import RadioButton from "../Components/RadioButton";
import RadioButtonGroup from "../Components/RadioButtonGroup";

export default function Endgame() {
    const { set, climbTime, climbPosition, climbAttempt } = useEndgameStore();
    const { scoutName, noShow, matchNumber, teamNumber } = useHomeStore();
    const { allianceColor } = useSettingsStore();
    return (
        <View style={styles.container}>
            <Spacer />
            <HStack>
                <Spacer />
                <VStack>
                    <Text>Scout Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Scout Name'
                        value={scoutName}
                        editable={false} />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Match #</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Match #'
                        value={matchNumber}
                        keyboardType='numeric'
                        editable={false} />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Team #</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Team #'
                        value={teamNumber}
                        keyboardType='numeric'
                        editable={false} />
                </VStack>
                <Spacer />
            </HStack>
            <HStack>
                <Text>Attempted? </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={climbAttempt ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => {
                        set({
                            climbAttempt: value,
                            ...(value === false && { climbTime: '', climbPosition: '' })
                        });
                    }}
                    value={climbAttempt}
                    disabled={noShow}
                />
            </HStack>
            <Text>Time Used</Text>
            <RadioButtonGroup containerStyle={styles.RadioButtonGroup} selected={climbTime} onChange={(value) => set({ climbTime: value })} disabled={!climbAttempt || noShow}>
                <RadioButton color={'green'} label='<5' value='<5' />
                <RadioButton color={'green'} label='~5' value='~5' />
                <RadioButton color={'green'} label='<10' value='<10' />
            </RadioButtonGroup>
            <Spacer />
            <Image style={styles.endgameBarge} source={allianceColor == "red" ? endgameRedBarge : endgameBlueBarge} />
            <Spacer />
            <RadioButtonGroup containerStyle={styles.RadioButtonGroup} selected={climbPosition} onChange={(value) => set({ climbPosition: value })} disabled={!climbAttempt || noShow}>
                <RadioButton color={'green'} label='Park' value='park' />
                <RadioButton color={'green'} label='Shallow' value='shallow' />
                <RadioButton color={'green'} label='Deep' value='deep' />
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
