import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import Counter from '../Components/Counter.js';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import reefImage from "../assets/Reef.webp";
import {useTeleopStore, useStateStore} from "../Stores/StateStore"
import processorImage from "../assets/Processor.webp"
import netImage from "../assets/net_small.webp"

export default function Teleop() {


    const { scoutName, noShow, matchNumber, teamNumber } = useStateStore();
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
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Image style={styles.reefImage} source={reefImage} />

                <View style={styles.counterContainer}>
                    <HStack>
                        <Spacer />
                        <VStack>
                            <Text>Scores</Text>
                            <Counter store="Teleop" variable='reefTeleopL4Count' disabled={noShow} />
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Text>Misses</Text>
                            <Counter store="Teleop" variable='reefTeleopL4MissCount' disabled={noShow} />
                        </VStack>
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter store="Teleop" variable='reefTeleopL3Count' disabled={noShow} />
                        <Spacer />

                        <Counter store="Teleop" variable='reefTeleopL3MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter store="Teleop" variable='reefTeleopL2Count' disabled={noShow} />
                        <Spacer />

                        <Counter store="Teleop" variable='reefTeleopL2MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter store="Teleop" variable='reefTeleopL1Count' disabled={noShow} />
                        <Spacer />
                        <Counter store="Teleop" variable='reefTeleopL1MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                </View>
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Image style={styles.processorImage} source={processorImage} />
                <Spacer />
                <Counter store="Teleop" variable='processorTeleopCount' disabled={noShow} />
                <Spacer />
                <Counter store="Teleop" variable='processorTeleopMissCount' disabled={noShow} />
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Image style={styles.netImage} source={netImage} />
                <Spacer />
                <Counter store="Teleop" variable='netTeleopCount' disabled={noShow} />
                <Spacer />
                <Counter store="Teleop" variable='netTeleopMissCount' disabled={noShow} />
                <Spacer />
            </HStack>
            <Spacer />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3ffe7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterContainer: {
        width: '80%',
        backgroundColor: 'Transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: 110,
    },
    Slider: {
        width: "75%",
    },
    tinyLogo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
    reefImage: {
        width: 75,
        height: 300,
        resizeMode: 'center'
    },
    processorImage: {
        width: 125,
        height: 125,
        resizeMode: 'center',

    },
    netImage: {
        width: 175,
        height: 125,
        resizeMode: "center",
},
});
