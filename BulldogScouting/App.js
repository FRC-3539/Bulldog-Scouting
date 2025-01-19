import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import React from 'react';
import Homepage from './Pages/Homepage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Auton from './Pages/Auton';
import Endgame from './Pages/Endgame';
import Teleop from './Pages/Teleop';
import Final from './Pages/Final';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as FileSystem from 'expo-file-system';
import Settings from './Pages/Settings';
import SettingsPassword from './Pages/SettingsPassword';
import QrScan from './Pages/QrScan';
import useStateStore from './Stores/StateStore';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create some file paths that we for sure have permissions to read and write to.
export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';
export const settingsPath = FileSystem.documentDirectory + 'settings.json';

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Auton" component={Auton} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6 name="robot" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Teleop" component={Teleop} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6 name="person" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Endgame" component={Endgame} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6 name="hourglass-end" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Final" component={Final} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome6 name="paper-plane" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { set } = useStateStore();

  // On application load load the matchData and settings from the files.
  useEffect(() => {
    // Lambdas cant be async so make an async function and call it.
    const loadData = async () => {
      try {
        // Make sure the file exists then parse the json.
        const dirInfo = await FileSystem.getInfoAsync(qrDataFilePath);
        if (dirInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(qrDataFilePath);
          const data = JSON.parse(fileContents);
          if (data != null || data != '' || data != ' ')
            set({ matchData: data });
        }
      } catch (error) {
        console.error("Failed to read or parse the qrDataFile file", error);
      }

      try {
        // Make sure the file exists then parse the json.
        const dirInfo = await FileSystem.getInfoAsync(settingsPath);
        if (dirInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(settingsPath);
          const data = JSON.parse(fileContents);
          if (data != null || data != '' || data != ' ')
            set(data);
        }
      } catch (error) {
        console.error("Failed to read or parse the settings file", error);
      }
    };
    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Authentication"
          component={SettingsPassword}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Scan QR Code"
          component={QrScan}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    borderRadius: 5
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
