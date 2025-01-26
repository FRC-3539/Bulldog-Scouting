import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import { Switch, } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import { useFinalStore, useHomeStore } from "../Stores/StateStore"
import { useIsFocused } from '@react-navigation/native';


export default function Final() {
    const { isTipped, set, isDisabled, isBroken, redCard, yellowCard, comments } = useFinalStore();
    const isFocused = useIsFocused();
    if (!isFocused) {
        return (<View style={styles.container}></View>)
    }
    return (
        <View style={styles.container}>
            <Spacer />
            <HStack>
                <Spacer />
                <Text>Tipped</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isTipped ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={(value) => set({ isTipped: value })}
                    value={isTipped}
                />
                <Spacer />
                <Text>Broken</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isBroken ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => set({ isBroken: value })}
                    value={isBroken}
                />
                <Spacer />
                <Text>Disabled</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDisabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => set({ isDisabled: value })}
                    value={isDisabled}
                />
                <Spacer />
            </HStack>
            <Spacer />
            <HStack>
                <Spacer />
                <Text>Red Card</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={redCard ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => set({ redCard: value })}
                    value={redCard}
                />
                <Spacer />
                <Text>Yellow Card</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={yellowCard ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => set({ yellowCard: value })}
                    value={yellowCard}
                />
                <Spacer />
            </HStack>
            <Spacer />

            <TextInput
                style={styles.input}
                onChangeText={(value) => set({ comments: value })}
                placeholder='Please enter any comments'
                value={comments}
                multiline={true} />
            <Spacer />
            <Button title="Submit" />
            <Spacer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fce3ff',
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
    },



});
