import React from 'react'
import './Button.css'

function Button({content, size}) {
    return (
        <div className="container-btn">
            {size 
            ? <button className={`price-button ${size}`}>{content}</button>
            : <button className="price-button">{content}</button> }
            
        </div>     
    )
}

export default Button
