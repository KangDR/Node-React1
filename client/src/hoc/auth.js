import React, { useEffect, useInsertionEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {Auth} from '../_actions/user_action'
export default function (SpecificComponent,option,adminRoute=null){
    //null 누구나 출입가능
    //true 로그인 유저만 출입가능
    //false 로그인한 유저는 출입불가
    function AuthenticationCheck(props){
        const dispatch=useDispatch();
         

        useEffect(()=>{
            dispatch(Auth()).then(response=>{
                console.log(response)
                if(!response.payliad.isAuth){
                    if(option){
                        
                    }
                } else{
                     //로그인 한 상태 
                     if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        })
    }
    
    return AuthenticationCheck
}