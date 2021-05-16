import React from 'react';

export default (props) => {
    const {label='Click',onClick} = props
    return (
       <div className='control-button' onClick={onClick}> 
            {label}
       </div>
    )
}