import { create } from 'zustand'

const useStateStore = create((set) => ({
    allianceColor: "red",
    allianceStation: 1,
    scoutName: "",
    matchNumber: "",
    teamNumber: "",
    preload: false,
    noShow: false,
    startPosition: "a",
    rotateField: false,
    reefAutonL1Count: 0,
    set
}))
export default useStateStore;