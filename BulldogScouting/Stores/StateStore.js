import { create } from 'zustand'

const useStateStore = create((set) => ({
    scoutName: "",
    matchNumber:"",
    teamNumber: "",
    preload: false,
    noShow: false,
    startPosition: 0,
    set
}))
export default useStateStore;