import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import { VStack, HStack, Spacer } from 'react-native-stacks';
import { useNavigation } from '@react-navigation/native';


export default function SettingsPassword() {
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const saveToFile = () => {
        
    }

    const handlePasswordSubmit = () => {
        if (password === '') { // Change password!
            navigation.navigate('Settings');
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <View style={styles.container}>
            <Spacer />
            <Spacer />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
                value={password}
                secureTextEntry={true}
            />
            <Spacer />
            <HStack>
                <Spacer />
                <Spacer />
                <Button title="Submit" onPress={handlePasswordSubmit} />
                <Spacer />
                <Spacer />
            </HStack>
            <Spacer />
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
        width: 90
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