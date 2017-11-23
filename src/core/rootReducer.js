import { combineReducers } from 'redux';
import enhanceMapReducer from 'redux-map-gl';
import translinkReducer from '../map/state/mapReducers';

export default combineReducers({
  map: enhanceMapReducer(translinkReducer, {
    // map defaults
    latitude: 49.25,
    longitude: -123.1,
    zoom: 10.333,
    bearing: 0,
    pitch: 0,
    width: 500,
    height: 500,
  }),
})