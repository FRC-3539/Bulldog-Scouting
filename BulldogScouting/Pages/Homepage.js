import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import testimage from "../assets/icon.png";
import {Switch,} from 'react-native';
export default function Homepage() {
    const [clicks, setclicks] = useState(0);
    const [check, setcheck] = useState(false);
    const [Textinput, setText] = useState("");
    const [value, setValue] = useState(0)
     const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            {/* <Text>change</Text>
            <Button title="Click me" onPress={() => setclicks(clicks + 1200
            )}></Button>
            <Text>{clicks}</Text> */}

    <Text>Scout Name</Text>

            <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder='Scout Name'
                value={Textinput} />
            <Text>{Textinput}</Text>

    <Text>Match #</Text>

    <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder='Match #'
                value={Textinput} />
            <Text>{Textinput}</Text>

    <Text>Team #</Text>

            <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder='Team #'
                value={Textinput} />
            <Text>{Textinput}</Text>

    <Text>Preload</Text>

            <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        
    <Text>No Show</Text>

<Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
            {/* <Text>Value: {value}</Text> */}
        <Text>A                         B                         C</Text>
            <Slider
                style={styles.Slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={value}
                onValueChange={(val) => setValue(val)}>

            </Slider>
      
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
