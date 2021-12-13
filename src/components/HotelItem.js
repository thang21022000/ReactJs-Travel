import React from 'react'
import {Link} from "react-router-dom"

import Button from './Button'
import Slider from './Slider'
import './HotelItem.css'

function HotelItem(props) { 
    return (
        <div className="hotel-item">
                <div className="hotel-item-left">
                    {props.image.length > 1
                    ? (
                        <Slider image={props.image} 
                        id={props.id}/>
                    ) 
                    : 
                     ( <div className="hotel-container-img">
                            <Link to={`/hotels/${props.id}`}>
                                <img src={props.image[0]} className="hotel-img" alt={props.hotel} />
                            </Link>
                        </div>)
                    }           
                </div>
                <Link to={`/hotels/${props.id}`}>
                    <div className="hotel-item-right">
                        <div className="superhot">
                            <h5>{props.popularity}</h5>
                            <div className="tooltip-container">
                                <div className="tooltip-desc">{props.summary}
                                    <div className="tooltip-text">{props.summary}</div>
                                </div>                  
                            </div>
                        </div>
                        <div className="hotel-name">
                            <p className="p-hotel-name">{props.hotel}</p>
                            <p className="p-hotel-name2">{props.desc}</p>
                        </div>                       
                        <Button content = {props.price + "$/đêm"}/>
                    </div>
                </Link>
           
        </div>     
    )
}

export default HotelItem
