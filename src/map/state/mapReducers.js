import * as actionTypes from './constants.js';

const initialState = {
  buses: [],
}

const updateBuses = (state, buses) => {
  debugger;
  return {
    ...state,
    buses,
  }
}

export default (state, action) => {
  switch (action.type) {
    case actionTypes.BUS_LOCATIONS_SUCCESS:
      return updateBuses(state, action.payload.body) 
    case actionTypes.BUS_LOCATIONS_ERROR:
      return action.error
    default:
      return state
  }
}