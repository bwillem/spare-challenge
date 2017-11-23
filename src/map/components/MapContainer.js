import { connect } from 'react-redux'
import { onChangeViewport } from 'redux-map-gl'
import { requestBuses } from '../state/mapActionCreators'
import Map from './Map';

const mapStateToProps = (state) => {
  const mapState = state.map.viewport.toJS();
  return {
    mapState,
  };
} 

export default connect(mapStateToProps, {
  requestBuses,
  onChangeViewport,
})(Map);