import React from 'react'
import { Marker } from 'react-map-gl'

export default props => {
  const { VehicleNo, Longitude, Latitude } = props.bus
  return (
    <Marker 
      key={VehicleNo}
      longitude={Longitude}
      offsetLeft={-2}
      offsetTop={-10}
      latitude={Latitude} >
        <span style={{fontSize: 10}}>•</span>
    </Marker>
  );
}