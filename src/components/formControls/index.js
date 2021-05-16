import React from 'react'
import './form-control.scss'
import Button from './button'
import Text from './textInput'
export default (props) => {
    const {type} = props
    const chooseControl = () => {
        switch(type){
            case 'text':
            case 'password':
                return <Text {...props}/>
            case 'button' :
                return <Button {...props}/>
            default: return;
        }
    }
    return (
        <div className='control-wrapper'>
            {chooseControl()}
        </div>
    )
}