import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import styled from 'styled-components';
import { MAP_ACCESS_TOKEN } from '../../core/constants';
import Dot from './Dot';

const NavControlStyled = styled(NavigationControl)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
`;

const LegendStyled = styled.div `
  display:none;
  @media screen and (min-width: 40em) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0px 16px;
    margin: 16px;
    background-color: rgba(255,255,255,0.8); 
    border-radius: 4px;
    max-width: 10em;
  }
`
const RefreshBtnStyled = styled.button`
  border-radius: 32px;
  border: 1px solid black;
  box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.10);
  padding: 8px 16px;
  margin-bottom: 16px;
`;

export default class Map extends Component {

  componentDidMount() {
    this.props.requestBuses();
    window.addEventListener('resize', this.fitMapToViewport.bind(this));
    this.fitMapToViewport();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitMapToViewport);
  }

  fitMapToViewport() {
    const { mapState, onChangeViewport } = this.props

    onChangeViewport({
      ...mapState,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  renderMarkers() {
    return this.props.buses.map((bus) => <Dot 
      key={bus.VehicleNo}  
      bus={bus} />)
  }

  render() {
    const { 
      mapState, 
      onChangeViewport, 
      requestBuses, 
      fetching,
      buses,
    } = this.props;

    return (  
      <ReactMapGL
        { ...mapState }
        mapStyle='mapbox://styles/mapbox/streets-v10'
        mapboxApiAccessToken={MAP_ACCESS_TOKEN}
        onViewportChange={onChangeViewport} >

        <NavControlStyled>
          <NavigationControl onViewportChange={onChangeViewport} />
        </NavControlStyled>
        { 
          buses ?
          this.renderMarkers() :
          null 
        }

        <LegendStyled>
          <p>Active buses: 
            { 
              buses ?
              ' ' + buses.length :
              ' ...'
            }
          </p>
          <RefreshBtnStyled 
            onClick={requestBuses} >
             { fetching ?
                `working...` :
                `refrefasdsh` 
              }
          </RefreshBtnStyled>
         </LegendStyled>
      </ReactMapGL>
    )
  }
}