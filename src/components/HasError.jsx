import '../styles/HasError.css'
import React from 'react'

const HasError = () => {


    return (
        <div className='card__error'>
            <div className='box__error' id="error">
                <div id="box"></div>
                <h3>✖ ERROR</h3>
                <p>Hey! you must provide an location from <span> 1 to 126 </span> here</p>
            </div>

        </div>
    )
}

export default HasError



