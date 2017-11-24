import React from 'react'
import { Marker } from 'react-map-gl'

export default props => {
  const { VehicleNo, Longitude, Latitude } = props.bus
  return (
    <Marker 
      key={VehicleNo}
      longitude={Longitude}
      latitude={Latitude} >
        <span>•</span>
    </Marker>
  );
}