import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React from 'react';
import { Switch, } from 'react-native';
import { HStack, Spacer } from 'react-native-stacks';
import { submitToFile, useFinalStore, useHomeStore, setStoresToDefault, incrementMatchNumber, shareFile } from "../Stores/StateStore"
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function Final() {
    const navigation = useNavigation();
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
            <Button title="Submit" onPress={
                () => {
                    Alert.alert(
                        "Confirm Submission",
                        "Are you sure you want to submit?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "Submit",
                                onPress: () => {
                                    submitToFile().then(() => {
                                        setStoresToDefault();
                                        incrementMatchNumber();
                                        navigation.navigate('Home');
                                    });

                                }
                            }
                        ]
                    );
                }} />
            <Spacer />
            <Button title="Send Data" onPress={() => { shareFile() }} />
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
        width: '70%',
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
