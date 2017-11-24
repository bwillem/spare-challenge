import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import styled from 'styled-components';
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '../../core/constants';
import Dot from './Dot';

const FETCH_INTERVAL = 600

const NavControlStyled = styled(NavigationControl)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
`

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

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUserDragging: false,
    }
  }

  componentDidMount() {
    this.fitMapToViewport();
    this.props.requestBuses();
    window.addEventListener('resize', this.fitMapToViewport.bind(this));
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

  render() {
    const { 
      mapState, 
      onChangeViewport, 
      requestBuses, 
      buses,
    } = this.props;

    return (  
      <div 
        onMouseDownCapture={() => { this.setState(state => ({isUserDragging: true})) }}
        onMouseUpCapture={() => { this.setState(state => ({isUserDragging: false})) }}>

        <ReactMapGL
          { ...mapState }
          mapStyle={MAP_STYLE}
          mapboxApiAccessToken={MAP_ACCESS_TOKEN}
          onViewportChange={onChangeViewport} >

          <NavControlStyled onViewportChange={onChangeViewport} />
          
          { 
            buses ?
            <DotDrawer 
              buses={buses}
              requestBuses={requestBuses}
              pauseRerender={this.state.isUserDragging}/> :
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
          </LegendStyled>
        </ReactMapGL>
      </div>
    )
  }
}

class DotDrawer extends Component {
  shouldComponentUpdate(nextProp, nextState) {
    return !nextProp.pauseRerender;
  }
  render() {
    setTimeout(() => this.props.requestBuses(), FETCH_INTERVAL)
    return this.props.buses.map((bus) => <Dot
      isVisible={!this.props.pauseRerender}
      key={bus.VehicleNo}  
      bus={bus} />)
  }
}