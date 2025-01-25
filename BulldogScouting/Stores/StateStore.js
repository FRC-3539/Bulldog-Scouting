import { create } from 'zustand'
import * as FileSystem from 'expo-file-system';


// Create some file paths that we for sure have permissions to read and write to.
export const qrDataFilePath = FileSystem.documentDirectory + 'qrData.json';
export const filePath = FileSystem.documentDirectory + 'data.json';
export const settingsPath = FileSystem.documentDirectory + 'settings.json';

export const useAutonStore = create((set) => ({
    set,
    reefAutonL1Count: 0,
    reefAutonL2Count: 0,
    reefAutonL3Count: 0,
    reefAutonL4Count: 0,
    reefAutonL1MissCount: 0,
    reefAutonL2MissCount: 0,
    reefAutonL3MissCount: 0,
    reefAutonL4MissCount: 0,
    processorAutonCount: 0,
    processorAutonMissCount: 0,
    netAutonCount: 0,
    netAutonMissCount: 0,
}))
export const useTeleopStore = create((set) => ({
    set,
    reefTeleopL1Count: 0,
    reefTeleopL2Count: 0,
    reefTeleopL3Count: 0,
    reefTeleopL4Count: 0,
    reefTeleopL1MissCount: 0,
    reefTeleopL2MissCount: 0,
    reefTeleopL3MissCount: 0,
    reefTeleopL4MissCount: 0,
    processorTeleopCount: 0,
    processorTeleopMissCount: 0,
    netTeleopCount: 0,
    netTeleopMissCount: 0,
}))

export const useSettingsStore = create((set) => ({
    allianceColor: "red",
    allianceStation: 1,
    rotateField: false,
    matchData: {},
    set
}))
export const useHomeStore = create((set) => ({
    set,
    preload: false,
    noShow: false,
    startPosition: "a",
    scoutName: "",
    matchNumber: "",
    teamNumber: "",
}))
export const useFinalStore = create((set) => ({
    climbTime: "d",
    climbPosition: 'a',
    isTipped: false,
    isBroken: false,
    isDisabled: false,
    redCard: false,
    yellowCard: false,
    comments: "",
    set

}))
export const useEndgameStore = create((set) => ({
    climbAttempt: false,
    set
}))
