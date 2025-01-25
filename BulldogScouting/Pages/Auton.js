
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import useStateStore from "../Stores/StateStore"
import Counter from '../Components/Counter.js';
import { HStack, Spacer, VStack } from 'react-native-stacks';
import reefImage from "../assets/Reef.png";
import processorImage from "../assets/Processor.png"
import netImage from "../assets/net.png"

export default function Auton() {
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
                            <Counter variable='reefAutonL4Count' disabled={noShow} />
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Text>Misses</Text>
                            <Counter variable='reefAutonL4MissCount' disabled={noShow} />
                        </VStack>
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter variable='reefAutonL3Count' disabled={noShow} />
                        <Spacer />

                        <Counter variable='reefAutonL3MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter variable='reefAutonL2Count' disabled={noShow} />
                        <Spacer />

                        <Counter variable='reefAutonL2MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <HStack>
                        <Spacer />
                        <Counter variable='reefAutonL1Count' disabled={noShow} />
                        <Spacer />
                        <Counter variable='reefAutonL1MissCount' disabled={noShow} />
                        <Spacer />
                    </HStack>
                </View>
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Image style={styles.processorImage} source={processorImage} />
                <Spacer />
                <Counter variable='processorAutonCount' disabled={noShow} />
                <Spacer />
                <Counter variable='processorAutonMissCount' disabled={noShow} />
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Image style={styles.netImage} source={netImage} />
                <Spacer />
                <Counter variable='netAutonCount' disabled={noShow} />
                <Spacer />
                <Counter variable='netAutonMissCount' disabled={noShow} />
                <Spacer />
            </HStack>
            <Spacer />
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
    counterContainer: {
        width: '80%',
        backgroundColor: '#fff',
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
