import {
    TextInput,
    View,
    Text,
    Alert,
    SafeAreaView,
    StyleSheet,
    Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, HStack, NativeBaseProvider, extendTheme, Center, VStack } from 'native-base';
import { styles, theme } from './Styles'

export function Auton({ props }) {
    return (
        <View style={styles.generalViewStyle}>
            <Text style={{ fontSize: 30 }}>Auton</Text>
            <VStack space={1} justifyContent="center">
                <HStack space={2} justifyContent="center">
                    <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3}>
                        <VStack space={1} justifyContent="center">
                            <Center><Text style={{ fontSize: 20 }}>Notes</Text></Center>
                            <Center><Text style={{ fontSize: 20 }}>{props.notes}</Text></Center>
                            <Button onPress={() => props.setNotes(props.notes + 1)}>+</Button>
                            <Button onPress={() => props.setNotes(props.notes - 1)}>-</Button>
                        </VStack>
                    </Center>
                    <Center h="40" w="20" bg="primary.400" rounded="md" shadow={3}>
                        <VStack space={1} justifyContent="center">
                            <Center><Text style={{ fontSize: 20 }}>Bumps</Text></Center>
                            <Center><Text style={{ fontSize: 20 }}>{props.bumps}</Text></Center>
                            <Button onPress={() => props.setBumps(props.bumps + 1)}>+</Button>
                            <Button onPress={() => props.setBumps(props.bumps - 1)}>-</Button>
                        </VStack>
                    </Center>
                    <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
                </HStack>
            </VStack>
        </View >
    )
}