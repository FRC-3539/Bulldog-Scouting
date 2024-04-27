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

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    generalViewStyle: {
        alignItems: 'center',
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    setupImage:
    {
        width: '50%',
        height: undefined,
        resizeMode: 'contain',
    },
    radioStyle:
    {
        padding: 0,
        margin: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        color: 'black',

    },
    radioLabelStyle:
    {
        paddingTop: 0,
        paddingBottom: 0,
        padding: 0,
        margin: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    radioView:
    {
        flexDirection: 'row',
        paddingTop: 0,
        paddingBottom: 0,
        padding: 0,
        margin: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        color: 'black',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hstackFullWidth:
    {
        padding: 2,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        width:'100%',
    },
    hstack:
    {
        padding: 2,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    vstack:
    {
        paddingHorizontal: 10,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

});
