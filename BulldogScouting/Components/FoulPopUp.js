import React, { useState } from 'react';
import { Text, StyleSheet, View, Pressable, Modal, Button, } from 'react-native';
import { useAutonStore, useTeleopStore } from "../Stores/StateStore"
const Stores = { Auton: useAutonStore, Teleop: useTeleopStore }
const FoulPopUp = ({ store, }) => {

    const [popUpOpen, setPopUpOpen] = useState(false);


    return (
        <View
            style={{
                width: '100%',
            }}>
            <Pressable onPress={() => { setPopUpOpen(true) }}
                style={styles.foulBanner}>
                <Text>FOULS</Text>
                {/* <Button onPress={() => { setPopUpOpen(true) }}
                            title='Add Foul Here'></Button> */}
            </Pressable>


            <Modal visible={popUpOpen} onRequestClose={() => { setPopUpOpen(false) }}
                transparent={true}
                animationType='slide'>
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '80%',
                        padding: '5%',
                        backgroundColor: 'white',
                        gap: '2%',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}><Pressable style={{
                        width: '100%',
                        backgroundColor: '#fff8a6',
                        padding: '5%',
                        borderRadius: '5%',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                            <Text>Grabbed Multiple Scoring Elements</Text></Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Text>Touched Opponents Cages</Text>
                        </Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}><Text>Multiple Defenders</Text></Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}><Text>Pinned an Opponent</Text></Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}><Text>Blocked Parts of Gameplay</Text></Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}><Text>Touched Opponent in Their Reef Zone</Text></Pressable>
                        <Pressable style={{
                            width: '100%',
                            backgroundColor: '#fff8a6',
                            padding: '5%',
                            borderRadius: '5%',
                            display: 'flex',
                            alignItems: 'center',
                        }}><Text></Text></Pressable>
                        <Button onPress={() => { setPopUpOpen(false) }}
                            title='Close'></Button>
                    </View>
                </View>
            </Modal >
        </View>

    );
};

const styles = StyleSheet.create({
    foulBanner: {
        width: '100%',
        height: '100px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5%',
        backgroundColor: '#FFD7a6'


    },
});
export default FoulPopUp;