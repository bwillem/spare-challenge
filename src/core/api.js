import request from 'superagent';
import {
  TL_API_KEY,
  CORS_URL,
  TRANSLINK_ENDPOINT,
} from './constants';

export const fetchBuses = () => {
  return request
    .get(CORS_URL + TRANSLINK_ENDPOINT + TL_API_KEY + '&routeNo=099')
    .set({ accept: 'application/json' })
}