import axios from 'axios';
import {Login_User,Auth_User} from './types';
import {Register_User} from './types';
export function loginUser(dataTosubmit){
    const request=axios.post('/api/user/login',dataTosubmit)
    .then(response=>response.data)
    return{
        type:Login_User,
        payload:request
    }
}
export function registerUser(dataTosubmit){
    const request=axios.post('/api/user/register',dataTosubmit)
    .then(response=>response.data)
    return{
        type:Register_User,
        payload:request
    }
}
export function Auth(){
    const request=axios.get('/api/user/auth')
    .then(response=>response.data)
    return{
        type:Auth_User,
        payload:request
    }
}