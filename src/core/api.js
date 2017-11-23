import request from 'superagent';
import {
  TL_API_KEY,
  CORS_URL,
  TRANSLINK_ENDPOINT,
  MAP_ACCESS_TOKEN,
} from './constants';

export const fetchBuses = () => {
  return request
    .get(CORS_URL + TRANSLINK_ENDPOINT + TL_API_KEY)
    .set({ accept: 'application/json' })
}