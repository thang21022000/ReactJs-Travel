import React, {useState, useEffect} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Slider from './Slider'

import './MapBox.css';

function MapBox({address, width, height}) {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 10.771168777212013,
    longitude: 106.70756438448637,
    width: "100vw",
    height: "100vh",
    zoom: 11.5
  });
  const [position, setPosition] = useState([]);
  useEffect(() => {
    let newPos = [];
      // const fetchAllItem =  () =>{
      // address.map(async (addr) => {
        
      //   const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addr.address}.json?&access_token=pk.eyJ1IjoidGhhbmcyNTI1IiwiYSI6ImNrdmcyZ2xlajR3c3YybnExOHlnd3JremoifQ.p9lMGaMU05ZXKzXw9DxeIA`);
      //   const data = await res.json();
      //   setPosition(prev => [...prev,{
      //           ...addr,
      //           longitude: data.features[0].center[0], 
      //           latitude: data.features[0].center[1]
      //         }]);
      //       }
      //       )}; 
          address.map((addr) => (
              fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr.address}.json?&access_token=pk.eyJ1IjoidGhhbmcyNTI1IiwiYSI6ImNrdmcyZ2xlajR3c3YybnExOHlnd3JremoifQ.p9lMGaMU05ZXKzXw9DxeIA`
      )
      .then(res => 
          res.json()
      )
      .then(data => {
          newPos.push({
          ...addr,
          longitude: data.features[0].center[0], 
          latitude: data.features[0].center[1]
        })
        console.log('in loop',newPos)
      })
    )); 
    setPosition(newPos);
    // fetchAllItem();
    
  },[address])
  console.log({address})
  console.log({position})

      return (
    <ReactMapGL
      {...viewport}
      width={width}
      height={height}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="pk.eyJ1IjoidGhhbmcyNTI1IiwiYSI6ImNrdmcyZ2xlajR3c3YybnExOHlnd3JremoifQ.p9lMGaMU05ZXKzXw9DxeIA"
      onClick={() => setSelectedHotel(null)}

    >
      {position.length > 0 && position.map((pos) => (       
        <Marker
        key={pos.id}
        latitude={pos.latitude}
        longitude={pos.longitude}
        offsetLeft={-20}
        offsetTop={-30}
        >
          <button onClick={() => setSelectedHotel(pos)} className="button__on__map">
              ${pos.price}
          </button>
        </Marker>
      ))}     
      {selectedHotel &&  
        <Popup
          latitude={selectedHotel.latitude}
          longitude={selectedHotel.longitude}
          closeButton={false}
          anchor="top-right"
        >
            <div className="map__popup__item">
              <Slider image={selectedHotel.image}
                  id={selectedHotel.id}/>
              <div className="map__popup--info">
                <p className="map__popup--name">{selectedHotel.hotel}</p>
                <p className="map__popup--price">
                  <span className="number">${selectedHotel.price}</span>
                  / night</p>
              </div>           
            </div>
        </Popup> 
      }
    </ReactMapGL>
  )
}

export default MapBox
