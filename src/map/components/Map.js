import React, { Component } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '../../core/constants'
import DotRenderer from './DotRenderer'

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

  static PropTypes = {
    buses: PropTypes.array.isRequired,
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
        onMouseDown={() => { this.setState(state => ({isUserDragging: true})) }}
        onMouseUp={() => { this.setState(state => ({isUserDragging: false})) }}
        onTouchStart={() => { this.setState(state => ({isUserDragging: true})) }}
        onTouchEnd={() => { this.setState(state => ({isUserDragging: false})) }}>

        <ReactMapGL
          { ...mapState }
          mapStyle={MAP_STYLE}
          mapboxApiAccessToken={MAP_ACCESS_TOKEN}
          onViewportChange={onChangeViewport} >

          <NavControlStyled onViewportChange={onChangeViewport} />
          
          { 
            buses ?
            <DotRenderer 
              buses={buses}
              requestBuses={requestBuses}
              pauseRerender={this.state.isUserDragging} /> :
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
