import { 
  BUS_LOCATIONS_GET,
  BUS_LOCATIONS_SUCCESS,
  BUS_LOCATIONS_ERROR,
} from './constants.js';

const initialState = {
  buses: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BUS_LOCATIONS_SUCCESS:
      return action.payload
    case BUS_LOCATIONS_ERROR:
      return action.error
    default:
      return state
  }
}