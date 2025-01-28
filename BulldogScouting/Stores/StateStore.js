import { create } from 'zustand'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Create some file paths that we for sure have permissions to read and write to.
export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';
export const settingsPath = FileSystem.documentDirectory + 'settings.json';

export const useAutonStore = create((set) => ({
    set,
    reefAutonL1Count: [],
    reefAutonL2Count: [],
    reefAutonL3Count: [],
    reefAutonL4Count: [],
    reefAutonL1MissCount: [],
    reefAutonL2MissCount: [],
    reefAutonL3MissCount: [],
    reefAutonL4MissCount: [],
    processorAutonCount: [],
    processorAutonMissCount: [],
    netAutonCount: [],
    netAutonMissCount: [],
    autonFouls: [],
}));

export const useTeleopStore = create((set) => ({
    set,
    reefTeleopL1Count: [],
    reefTeleopL2Count: [],
    reefTeleopL3Count: [],
    reefTeleopL4Count: [],
    reefTeleopL1MissCount: [],
    reefTeleopL2MissCount: [],
    reefTeleopL3MissCount: [],
    reefTeleopL4MissCount: [],
    processorTeleopCount: [],
    processorTeleopMissCount: [],
    netTeleopCount: [],
    netTeleopMissCount: [],
    teleopFouls: [],
}));

export const useSettingsStore = create((set) => ({
    allianceColor: "red",
    allianceStation: 1,
    rotateField: false,
    matchData: {},
    set,
}));

export const useHomeStore = create((set) => ({
    set,
    preload: false,
    noShow: false,
    startPosition: "",
    scoutName: "",
    matchNumber: "1",
    teamNumber: "",
}));

export const useFinalStore = create((set) => ({
    isTipped: false,
    isBroken: false,
    isDisabled: false,
    redCard: false,
    yellowCard: false,
    comments: "",
    set,
}));

export const useEndgameStore = create((set) => ({
    climbAttempt: false,
    climbTime: "",
    climbPosition: "",
    set,
}));

// Share function that is passed to the submit page.
export async function shareFile() {
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
    const { allianceColor, allianceStation } = useSettingsStore.getState();
    const newFilePath = FileSystem.cacheDirectory + `data-${dateString}-${allianceColor}-${allianceStation}.json`;

    // Copy the json to the new file name in the cache directory
    await FileSystem.copyAsync({ from: filePath, to: newFilePath });
    // Share the new copy
    await Sharing.shareAsync(newFilePath).then(async () => {
        await FileSystem.deleteAsync(newFilePath);
    });
}

export const submitToFile = async () => {
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

    // // Add the new data to the "matches" list.
    fileContent.matches.push({
        ...useAutonStore.getState(),
        ...useTeleopStore.getState(),
        ...useSettingsStore.getState(),
        ...useHomeStore.getState(),
        ...useFinalStore.getState(),
        ...useEndgameStore.getState()
    });

    // Write data to file
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(fileContent, null, 2));


}


export const setStoresToDefault = (resetNoShow = true) => {
    useAutonStore.setState(useAutonStore.getInitialState());
    useTeleopStore.setState(useTeleopStore.getInitialState());
    useHomeStore.setState((state) => ({
        ...useHomeStore.getInitialState(),
        noShow: resetNoShow ? false : state.noShow, // Reset these values back to the current state so we don't lose them.
        matchNumber: state.matchNumber,
        scoutName: state.scoutName,
        teamNumber: state.teamNumber,
    }));
    useFinalStore.setState(useFinalStore.getInitialState());
    useEndgameStore.setState(useEndgameStore.getInitialState());
}

export const incrementMatchNumber = () => {
    useHomeStore.setState((state) => ({ matchNumber: (parseInt(state.matchNumber) + 1).toString() }));
}
