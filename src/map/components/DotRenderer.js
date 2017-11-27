import React from 'react'
import PropTypes from 'prop-types'
import { FETCH_INTERVAL } from '../../core/constants'
import Dot from './Dot'

export default class DotDrawer extends React.Component {
  static PropTypes = {
    requestBuses: PropTypes.func,
    pauseRerender: PropTypes.bool,
  }

  shouldComponentUpdate(nextProp) {
    return !nextProp.pauseRerender
  }

  render() {
    setTimeout(() => this.props.requestBuses(), FETCH_INTERVAL)
    return this.props.buses.map((bus) => <Dot
      key={bus.VehicleNo}  
      bus={bus} />)
  }
}