import React from 'react';

export default (props) => {
    const {
        label,
        placeholderText='',
        value='',
        handleChange,
        type
    } = props
    return (
        <>
            {label &&
            <div className='control-label'>
                {label}
            </div>
            }
            <input type={type} placeholder={placeholderText} spellcheck="false" value={value} onChange={handleChange}/>
        </>
    )
}