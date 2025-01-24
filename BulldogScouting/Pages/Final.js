import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { Switch, } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';

export default function Final() {
    const [Textinput, setText] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <Spacer />
            <HStack>
            <Spacer/>
                <Text>Tipped</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Spacer />
                <Text>Broken</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

                <Spacer />

                <Text>Disabled</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Spacer/>
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Text>Red Flag</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

                <Spacer />

                <Text>Yellow Flag</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> <Spacer />
            </HStack>
            <Spacer />
            <Text>Comments?</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder='Text?'
                value={Textinput}
                multiline={true} />

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
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: '50%',
        height: '15%',
        textAlignVertical: 'top',
        

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
