import { useState } from 'react';
import { Alert, Button, View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { VStack, HStack, Spacer } from 'react-native-stacks';
import useStateStore from '../Stores/StateStore';



export function QrScan() {
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const { matchData, set } = useStateStore();


    async function handleBarCodeScanned({ type, data }) {
        var copyMatchData = { ...matchData };
        setScanned(true);

        // Create an empty dictionary to store parsed data
        var matches = data.toString().split(';');

        // Iterate through each match
        matches.forEach(match => {
            if (!match.includes(",")) return;

            // Split the match by comma to get individual teams
            const loadedMatchData = match.split(',');

            // Extract team colors
            const matchTeams = {
                red1: loadedMatchData[1],
                red2: loadedMatchData[2],
                red3: loadedMatchData[3],
                blue1: loadedMatchData[4],
                blue2: loadedMatchData[5],
                blue3: loadedMatchData[6]
            };

            copyMatchData[loadedMatchData[0]] = matchTeams
        });
        set({ matchData: copyMatchData });

        // Save match data to local storage
        await FileSystem.writeAsStringAsync(qrDataFilePath, JSON.stringify(matchData));

        Alert.alert(
            `Data Added`,
            'Data Added',
            [{ text: 'Continue', onPress: () => setScanned(false) }]
        );
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <VStack>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </VStack>
        );
    }


    return (
        <View >
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                ratio='16:9'
            />
            <View style={styles.hstack}>
                <Button title="Return" onPress={() => setScanMode(!scanMode)} />
                <Button title="Clear Loaded Match Data" onPress={() => showDialog()} />
            </View>
        </View>
    );
}
export default QrScan;

const styles = StyleSheet.create({

    camera: {
        flex: 1,
        aspectRatio: "0.5625",
    }
});
