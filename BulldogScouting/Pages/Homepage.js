import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import testimage from "../assets/icon.png";
import { Switch, } from 'react-native';
import useStateStore from "../Stores/StateStore"
import { VStack, HStack, Spacer } from 'react-native-stacks';
export default function Homepage() {

    const [value, setValue] = useState(0)
    const { scoutName, teamNumber, preload, noShow, startPosition, matchNumber, allianceColor, allianceStation, set } = useStateStore();

    return (
        <View style={styles.container}>
            {/* <Text>change</Text>
            <Button title="Click me" onPress={() => setclicks(clicks + 1200
            )}></Button>
            <Text>{clicks}</Text> */}
            <HStack>
<Text>red</Text>
<Switch
                trackColor={{ false: '#ff8181', true: '#81b0ff' }}
                thumbColor={allianceColor=='red' ? '#FF0000' : '#0000FF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => set((state) => ({ allianceColor: value?"blue":"red" }))}
                value={allianceColor!='red'}
            />
<Text>blue</Text>

</HStack>
<Slider
                style={styles.Slider}
                minimumValue={1}
                maximumValue={3}
                step={1}
                value={allianceStation}
                onValueChange={(value) => set((state) => ({ allianceStation: value }))}>

            </Slider>
            <Text>{allianceStation}</Text>
            <HStack>
                <Spacer />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => set((state) => ({ scoutName: text }))}
                    placeholder='Scout Name'
                    value={scoutName} />
                <Spacer />
                <Text>Match #</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => set((state) => ({ matchNumber: text }))}
                    placeholder='Match #'
                    value={matchNumber} />

                <Spacer />
                <Text>Team #</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => set((state) => ({ teamNumber: text }))}
                    placeholder='Team #'
                    value={teamNumber} />

                <Spacer />
            </HStack>
            <Text>Preload</Text>

            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={preload ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => set((state) => ({ preload: value }))}
                value={preload}
            />

            <Text>No Show</Text>

            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={noShow ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => set((state) => ({ noShow: value }))}
                value={noShow}
            />
            {/* <Text>Value: {value}</Text> */}
            <Text></Text>
            <Slider
                style={styles.Slider}
                minimumValue={0}
                maximumValue={100}
                step={10}
                value={startPosition}
                onValueChange={(value) => set((state) => ({ startPosition: value }))}>

            </Slider>
<Text>{startPosition}</Text>
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
    }


});
