import React from 'react'
import './Feature.css'

function Feature(props) {
    return (
        <div className="colum-tiennghi">
                <div className="part1-tiennghi">
                    <div className="img-container">
                        <img className="tiennghi-img" src={props.image} alt={props.type} />
                    </div>
                    <p className="tiennghi-text">{props.type}</p>
                </div> 
        </div>
    )
}

export default Feature
