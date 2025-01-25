import { create } from 'zustand'
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

export const useStateStore = create((set) => ({
    allianceColor: "red",
    allianceStation: 1,
    scoutName: "",
    matchNumber: "",
    teamNumber: "",
    preload: false,
    noShow: false,
    startPosition: "a",
    rotateField: false,
    matchData: {},
    set
}))
export const useFinalStore = create((set) => ({
    climbTime: "d",
    climbPosition: 'a',
    isTipped: false,
    isBroken: false,
    isDisabled: false,
    redCard: false,
    yellowCard: false,
    set

}))
export const useEndgameStore = create((set) => ({
    climbAttempt: false,
    set
}))
