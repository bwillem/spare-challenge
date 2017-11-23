import React from 'react'
import { Marker } from 'react-map-gl'

export default props => {
  return (
    <Marker 
      key={props.bus.VehicleNo}
      longitude={props.bus.Longitude}
      latitude={props.bus.Latitude} >
      <span>.</span>
    </Marker>
  );
}