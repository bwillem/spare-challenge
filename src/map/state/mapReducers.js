import * as actionTypes from './constants.js';

const initialState = {
  buses: [],
}

const updateBuses = (state, buses) => ({
  ...state,
  buses,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUS_LOCATIONS_SUCCESS:
      return updateBuses(state, action.payload.body) 
    case actionTypes.BUS_LOCATIONS_ERROR:
      return { ...state, error: action.error}
    default:
      return state
  }
}