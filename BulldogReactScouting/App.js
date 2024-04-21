import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Button, WhiteSpace, Text, View, Tabs } from '@ant-design/react-native'
import * as FileSystem from 'expo-file-system';
import React from 'react'

async function test() {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    let data = "Hello World";
    // Create file and pass it's SAF URI
    await StorageAccessFramework.createFileAsync(directoryUri, "test", "text/plain").then(async (fileUri) => {
      // Save data to newly created file
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
    })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("You must allow permission to save.")
  }
}

export default function App() {
  const tabs = [
    { title: 'Auton' },
    { title: 'Teleop' },
    { title: 'End Game' },
  ]
  const style = {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    backgroundColor: '#fff',
  }

  return (
    <View style={{ flex: 1, paddingTop:"10%", backgroundColor:"#fff" }}>
      <Tabs tabs={tabs}>
        <View style={style}>
          <WhiteSpace />
          <Text>Content of First Tab</Text>
          <WhiteSpace />
          <Button>default</Button>
          <WhiteSpace />
          <Button disabled>default disabled</Button>
          <WhiteSpace />
          <Button type="primary">primary</Button>
          <WhiteSpace />
          <Button type="primary" disabled>
            primary disabled
          </Button>
          <WhiteSpace />
        </View>
        <View style={style}>
          <Text>Content of Second Tab</Text>
        </View>
        <View style={style}>
          <Text>Content of Third Tab</Text>
        </View>
      </Tabs>
    </View>
  );
}
const { StorageAccessFramework } = FileSystem;