import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import startPositionImage from "../assets/AutonStartingPosition.webp";
import startPositionImageRotated from "../assets/AutonStartingPositionRotated.webp";
import { Switch } from 'react-native';
import { useStateStore } from "../Stores/StateStore"
import { VStack, HStack, Spacer } from 'react-native-stacks';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

export default function Homepage() {
    const { scoutName, teamNumber, preload, noShow, startPosition, matchNumber, allianceColor, allianceStation, rotateField, matchData, set } = useStateStore();
    const navigation = useNavigation();

    useEffect(() => {
        set({
            teamNumber: matchData?.[matchNumber]?.[allianceColor + allianceStation] ?? ''
        })
    }, [allianceColor, allianceStation, matchNumber, matchData]);

    return (
        <View style={styles.container}>
            <Spacer />
            <HStack>
                <Spacer />
                <VStack>
                    <Text>Scout Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ scoutName: text })}
                        placeholder='Scout Name'
                        value={scoutName} />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Match #</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ matchNumber: text })}
                        placeholder='Match #'
                        value={matchNumber}
                        keyboardType='numeric' />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>Team #</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => set({ teamNumber: text })}
                        placeholder='Team #'
                        value={teamNumber}
                        keyboardType='numeric' />
                </VStack>
                <Spacer />
                <FontAwesome6 name="gear" size={24} color='gray' onPress={() => navigation.navigate('Authentication')} />
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <VStack>
                    <Text>Preload</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={preload ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={(value) => set({ preload: value })}
                        value={preload}
                    />
                </VStack>
                <Spacer />
                <VStack>
                    <Text>No Show</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={noShow ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={(value) => set({ noShow: value })}
                        value={noShow}
                    />
                </VStack>
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Image style={styles.startPositionImage} source={rotateField ? startPositionImageRotated : startPositionImage} />
                <RadioButtonGroup
                    containerStyle={styles.RadioButtonGroup}
                    selected={startPosition}
                    onSelected={(value) => set({ startPosition: value })}
                    radioBackground="green"
                >
                    <RadioButtonItem value={rotateField?"a":"c"} label={rotateField?"A":"C"} />
                    <RadioButtonItem value="b" label="B" />
                    <RadioButtonItem value={rotateField?"c":"a"} label={rotateField?"C":"A"} />
                </RadioButtonGroup>
            </HStack>
            <Spacer />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: 110

    },
    Slider: {
        width: "75%",
    },

    startPositionImage: {
        width: 300, // Adjust width to fit within the screen
        height: 400, // Adjust height to fit within the screen
        resizeMode: 'center',
    },
    RadioButtonGroup: {
        height:'400',
        flexDirection: 'column',
        justifyContent: "space-around",
    },
});
