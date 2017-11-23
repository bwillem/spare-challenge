import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { onChangeViewport } from 'redux-map-gl';
import { MAP_ACCESS_TOKEN } from '../../core/constants';

export default class Map extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.fitMapToViewport.bind(this));
    this.fitMapToViewport();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitMapToViewport);
  }

  fitMapToViewport() {
    const { mapState, onChangeViewport } = this.props

    const newMapState = {
      ...mapState,
      width: window.innerWidth,
      height: window.innerHeight,
    }
    onChangeViewport(newMapState)
  }

  render() {
    const { mapState, onChangeViewport } = this.props;

    return (  
      <ReactMapGL
        { ...mapState }
        mapStyle='mapbox://styles/mapbox/streets-v10'
        mapboxApiAccessToken={ MAP_ACCESS_TOKEN }
        onViewportChange={onChangeViewport}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 16,
        }}>
          <NavigationControl onViewportChange={onChangeViewport} />
        </div>
      </ReactMapGL>
    )
  }
}