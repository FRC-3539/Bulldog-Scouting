import { create } from 'zustand'

const useStateStore = create((set) => ({
    allianceColor: "red",
    allianceStation: 1,
    scoutName: "",
    matchNumber:"",
    teamNumber: "",
    preload: false,
    noShow: false,
    startPosition: 0,
    set
}))
export default useStateStore;