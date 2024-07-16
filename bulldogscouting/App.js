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

// Create some file paths that we for sure have permissions to read and write to.
export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';


// Global variable that just needs to be changed in order to request each page to reset.
export let resetContext = false;

export default function App() {

	LogBox.ignoreLogs([
		'Non-serializable values were found in the navigation state',
	]);

	// Main state storage, not passed to child components
	const state = useRef({});

	// Update callback for child components
	const updateStates = (values) => {
		state.current = {
			...state.current,
			...values
		};
	};


	// Function passed to child components to get the current selected driverstation.
	function getStation() {
		return state.current.station;
	}

	// Function passed to child components to get the current state of the no show selector.
	function getNoShow() {
		return state.current.noShow;
	}

	// Function to write the "states" to file.
	async function triggerFileWrite(navigation) {
		Alert.alert(`Confirmation`, 'Are you ready to submit?', [
			{
				text: 'Cancel', onPress: () => { }
			},
			{
				text: 'Continue', onPress: () => {
					// Create an async function since lambdas cant be async.
					async function submit() {

						//Check to see if the directory/file exists.
						const dirInfo = await FileSystem.getInfoAsync(filePath);
						let existingContent = "";
						if (dirInfo.exists) {
							//If the file exists then read it in so we can add to it.
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
						resetContext = !resetContext;
						navigation.navigate('Setup')
					}
					submit();

				}
			}
		]);
	}

	// Share function that is passed to the submit page.
	async function share() {
		//Get the current date and time to rename the json before we send it.
		const currentDate = new Date();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		const day = currentDate.getDate().toString().padStart(2, '0');
		const year = currentDate.getFullYear();
		const hour = currentDate.getHours().toString().padStart(2, '0');
		const min = currentDate.getMinutes().toString().padStart(2, '0');
		const second = currentDate.getSeconds().toString().padStart(2, '0');
		const dateString = `${month}-${day}-${year}_${hour}-${min}-${second}`;
		// Cache directory will auto clear when it has to by the filesystem
		const newFilePath = FileSystem.cacheDirectory + `data-${dateString}-${state.current.station}.json`;

		// Copy the json to the new file name in the cache directory
		await FileSystem.copyAsync({ from: filePath, to: newFilePath });
		// Share the new copy
		await Sharing.shareAsync(newFilePath)
	}


	//Main app code.
	return (
		<NavigationContainer>
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
						getStation: getStation,
						getNoShow: getNoShow,
					}} />
					<Tab.Screen name="Auton" component={Auton} initialParams={{
						updateStates: updateStates,
						getStation: getStation,
						getNoShow: getNoShow,
					}} />
					<Tab.Screen name="Teleop" component={Teleop} initialParams={{
						updateStates: updateStates,
						getStation: getStation,
						getNoShow: getNoShow,
					}} />
					<Tab.Screen name="EndGame" component={EndGame} initialParams={{
						updateStates: updateStates,
						getStation: getStation,
						getNoShow: getNoShow,
					}} />
					<Tab.Screen name="Submit" component={Submit} initialParams={{
						updateStates: updateStates,
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