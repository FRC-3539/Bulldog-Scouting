import {
	SafeAreaView,
	StatusBar,
	Alert
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Setup } from './components/Setup';
import { Auton } from './components/Auton';
import { styles } from './components/Styles'
import { Teleop } from './components/Teleop';
import { EndGame } from './components/Endgame';
import { Submit } from './components/Submit';
import { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { LogBox } from 'react-native';



const Tab = createMaterialTopTabNavigator();

export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';

export default function App() {

	// Ignore that stupid warning
	LogBox.ignoreLogs([
		'Non-serializable values were found in the navigation state',
	]);

	// Main state storage, not passed to children components
	const state = useRef({});

	// Reset trigger variable
	const [resetTrigger, setResetTrigger] = useState(false);

	// Update callback for child components
	const updateStates = (values) => {
		state.current = {
			...state.current,
			...values
		};
	};

	function getStation() {
		return state.current.station;
	}
	function getNoShow()
	{
		return state.current.noShow;
	}

	async function triggerFileWrite() {
		Alert.alert(`Confirmation`, 'Are you ready to submit?', [
			{
				text: 'Cancel', onPress: () => { }
			},
			{
				text: 'Continue', onPress: () => {
					async function submit() {
						const dirInfo = await FileSystem.getInfoAsync(filePath);
						let existingContent = "";
						if (dirInfo.exists) {
							existingContent = await FileSystem.readAsStringAsync(filePath);
							if (existingContent.trim() !== '') {
								// Parse existing JSON
								fileContent = JSON.parse(existingContent);
							}
							else {
								fileContent = {};
							}
						}
						else {
							fileContent = {};
						}

						// Check if the "matches" list exists, if not create it.
						if (!fileContent.matches) {
							fileContent.matches = [];
						}

						// Add the new data to the "matches" list.
						fileContent.matches.push(state.current);

						// Write data to file
						await FileSystem.writeAsStringAsync(filePath, JSON.stringify(fileContent, null, 2));

						// Trigger state reset in individual components
						setResetTrigger(!resetTrigger);
					}

					submit();

				}
			}
		]);
	}

	async function share() {
		console.log("Sharing data");
		const currentDate = new Date();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		const day = currentDate.getDate().toString().padStart(2, '0');
		const year = currentDate.getFullYear();
		const hour = currentDate.getHours().toString().padStart(2, '0');
		const min = currentDate.getMinutes().toString().padStart(2, '0');
		const second = currentDate.getSeconds().toString().padStart(2, '0');
		const dateString = `${month}-${day}-${year}_${hour}-${min}-${second}`;
		const newFilePath = FileSystem.cacheDirectory + `data-${dateString}-${state.current.station}.json`; //Cache directory will auto clear when it has to by the filesystem

		await FileSystem.copyAsync({ from: filePath, to: newFilePath });
		await Sharing.shareAsync(newFilePath)
	}

	useEffect(() => {
		const loadData = async () => { //Must create a new function to use await
			try {
				const dirInfo = await FileSystem.getInfoAsync(qrDataFilePath);
				if (dirInfo.exists) {
					console.log(qrDataFilePath);

					const fileContents = await FileSystem.readAsStringAsync(qrDataFilePath);
					console.log("File Contents: ", fileContents);
					const data = JSON.parse(fileContents);
					if (data != null || data != '' || data != ' ')
						setMatchData(data);
				}
			} catch (error) {
				console.error("Failed to read or parse the qrDataFile file", error);
			}
		};
		loadData();
	}, []);
	return (<NavigationContainer>
		<SafeAreaView style={styles.safeArea}>
			<StatusBar
				animated={true}
				backgroundColor={styles.safeArea.backgroundColor}
				barStyle="dark-content"
				hidden={false}
			/>
			<Tab.Navigator screenOptions={{
				tabBarItemStyle: {
					padding: 0,
					margin: 0,
				},
			}}>
				<Tab.Screen name="Setup" component={Setup} initialParams={{
					updateStates: updateStates,
					resetTrigger: resetTrigger,
					getStation: getStation,
					getNoShow: getNoShow,
				}} />
				{/* <Tab.Screen name="Auton" children={() =>
					<Auton updateStates={updateStates} resetTrigger={resetTrigger} station={station} />} /> */}
				<Tab.Screen name="Auton" component={Auton} initialParams={{
					updateStates: updateStates,
					resetTrigger: resetTrigger,
					getStation: getStation,
					getNoShow: getNoShow,
				}} />
				<Tab.Screen name="Teleop" component={Teleop} initialParams={{
					updateStates: updateStates,
					resetTrigger: resetTrigger,
					getStation: getStation,
					getNoShow: getNoShow,
				}} />
				<Tab.Screen name="EndGame" component={EndGame} initialParams={{
					updateStates: updateStates,
					resetTrigger: resetTrigger,
					getStation: getStation,
					getNoShow: getNoShow,
				}} />
				<Tab.Screen name="Submit" component={Submit} initialParams={{
					updateStates: updateStates,
					resetTrigger: resetTrigger,
					triggerWriteToFile: triggerFileWrite,
					getStation: getStation,
					triggerShare: share,
					getNoShow: getNoShow,
				}} />
			</Tab.Navigator>
		</SafeAreaView>
	</NavigationContainer>


	);
}