import React,{useReducer,useEffect} from 'react';
import './login.sass'
import Control from '../../components/formControls'
import {useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default() => {

    let token = useSelector(({login:{token}})=>token);
    const dispatchRedux =useDispatch();

    
    useEffect(()=>{
        if(token){
            histroy.push('/home');
        }
    },[token])
    
    const histroy = useHistory()

    const reducer = (state,action) => {
        switch(action.type){
            case 'UPDATE_USER_NAME': return {...state,name:action.data};
            case 'UPDATE_USER_PASS': return {...state,pass:action.data};
            default: return;
        }
    }

    const [userData, dispatch] = useReducer(reducer,{name:'',pass:''}) 

    const signIn = () => {
        if(userData.name.toLowerCase()==='admin' && userData.pass.toLowerCase()==='admin'){
            dispatchRedux({
                type:'SET_TOKEN',
                data:'4b9ed7c3'
            })
        }
    }
    return(
        <div className='login-wrapper'>
            <div className='login-control-wrapper'>
                <div className='login-heading'>User Sign up</div>

                <Control 
                    type={'password'} 
                    label={'User Name'} 
                    placeholderText={'Enter your username'} 
                    value={userData.name} 
                    handleChange={(e)=>dispatch({type:'UPDATE_USER_NAME',data:e.target.value})}/>
               
                <Control 
                    type={'password'} 
                    label={'User Password'} 
                    placeholderText={'Enter your password'} 
                    value={userData.pass} 
                    handleChange={(e)=>dispatch({type:'UPDATE_USER_PASS',data:e.target.value})}/>

                <Control type={'button'} label={'sign up'} onClick={signIn}/>
            </div>
        </div>
    )
}