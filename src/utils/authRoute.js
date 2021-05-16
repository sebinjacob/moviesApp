import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

export default props => {

    const {component:Component,path,...restProps} = props;
    const hasToken = useSelector(({login:{token}})=>token)
    const history = useHistory();

    if(hasToken){
        return <Component {...restProps} />
    }else{
        
        if(window.location.pathname === '/') {
            return <Component {...restProps} />
        }else{
            history.push('/')
        }
    }

}