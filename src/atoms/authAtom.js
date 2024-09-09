import { atom } from "recoil";

const authScreenAtom = atom({
    key: "authScreenAuth",
    default: 'login',
})

export default authScreenAtom;