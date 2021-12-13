import React from 'react'
import './TypeHotel.css'
function TypeHotel(props) {
    return (
        <div className="nghiduong" >
            <div className="nghiduong wide">
                <h1>{props.title}</h1>
                <span className="explanation">{props.subTitle}</span>
                <div className={"nghi-duong-group " + props.class}>
                    {props.children}
                </div>           
            </div>
        </div>
    )
}

export default TypeHotel
