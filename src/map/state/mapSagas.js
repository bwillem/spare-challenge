import { call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../core/api';
import * as actionTypes from './constants';

function* fetchBuses(action) {
  try {
    const res = yield call(Api.fetchBuses) 
    yield put({type: actionTypes.BUS_LOCATIONS_SUCCESS, payload: res})
  } catch (e) {
    yield put({type: actionTypes.BUS_LOCATIONS_ERROR, error: e.message})
  }
}

export default function* mapSagasListener() {
  yield takeLatest(actionTypes.BUS_LOCATIONS_REQUEST, fetchBuses)
}