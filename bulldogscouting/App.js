import {
	SafeAreaView,
	StatusBar,
	Alert
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Setup } from './components/Setup';
import { Auton } from './components/Auton';
import { styles } from './components/Styles'
import { Teleop } from './components/Teleop';
import { EndGame } from './components/Endgame';
import { Submit } from './components/Submit';
import FocusRender from 'react-navigation-focus-render'
import { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const Tab = createMaterialTopTabNavigator();

export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';

export default function App() {
	// Main state storage, not passed to children components
	const [state, setState] = useState({});

	// Reset trigger variable
	const [resetTrigger, setResetTrigger] = useState(false);

	// Update callback for child components
	const updateStates = (values) => {
		setState({
			...state,
			...values
		});
	};

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
						fileContent.matches.push(state);
			
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
		const currentDate = new Date();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		const day = currentDate.getDate().toString().padStart(2, '0');
		const year = currentDate.getFullYear();
		const hour = currentDate.getHours().toString().padStart(2, '0');
		const min = currentDate.getMinutes().toString().padStart(2, '0');
		const second = currentDate.getSeconds().toString().padStart(2, '0');
		const dateString = `${month}-${day}-${year}_${hour}-${min}-${second}`;
		const newFilePath = FileSystem.documentDirectory + `data-${dateString}-${state.station}.json`;
		existingContent = await FileSystem.readAsStringAsync(filePath);
		await FileSystem.writeAsStringAsync(newFilePath, JSON.stringify(existingContent));
		await Sharing.shareAsync(newFilePath)
		await FileSystem.deleteAsync(newFilePath);
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
					<Tab.Screen name="Setup" children={() =>
						<Setup updateStates={updateStates} resetTrigger={resetTrigger} />} />
					<Tab.Screen name="Auton" children={() =>
						<Auton updateStates={updateStates} resetTrigger={resetTrigger} station={state.station} />} />
					<Tab.Screen name="Teleop" children={() =>
						<Teleop updateStates={updateStates} resetTrigger={resetTrigger} />} />
					<Tab.Screen name="EndGame" children={() =>
						<EndGame updateStates={updateStates} resetTrigger={resetTrigger} />} />
					<Tab.Screen name="Submit" children={() =>
						<Submit
							updateStates={updateStates}
							resetTrigger={resetTrigger}
							triggerWriteToFile={triggerFileWrite}
							triggerShare={share}
						/>}
					/>
				</Tab.Navigator>
			</SafeAreaView>
	</NavigationContainer>


	);
}