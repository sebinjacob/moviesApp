import React from 'react';
import './header.scss';
export default (props) => {
    const {title,onSearchTitle,onSearchYear,year,handleLogOut} = props
    return (
        <div className='dash-header'>
            <div className='search-wrapper'>

                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        placeholder='Title' 
                        value={title}
                        onChange={(e)=>onSearchTitle(e.target.value)}/>
                </div>
                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        placeholder='Year' 
                        value={year}
                        onChange={(e)=>onSearchYear(e.target.value)}/>
                </div>

            </div>
            <div className='logout-wrapper' onClick={handleLogOut}>
                <div className='logout-btn'>
                    Log Out
                </div>
            </div>
        </div>
    )
}