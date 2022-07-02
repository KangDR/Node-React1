import {Login_User,Register_User,Auth_User} from '../_actions/types'

export default function (state={},action){
    switch(action.type){
        case Login_User:
            return { ...state, loginSuccess:action.payload}
            break;
        case Register_User:
            return {
                ...state,register:action.payload
            }
        case Auth_User:
            return {
                ...state,userData:action.payload
            }
        default:
            return state;
    }
}