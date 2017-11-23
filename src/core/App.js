import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import request from 'superagent';

import rootReducer from './rootReducer';
import MapContainer from '../map/components/MapContainer';
import {
  TL_API_KEY,
  CORS_URL,
  TRANSLINK_ENDPOINT,
  MAP_ACCESS_TOKEN,
} from './constants';

const store = createStore(rootReducer);

class App extends Component {
  componentDidMount () {
    // request
    //   .get(CORS_URL + TRANSLINK_ENDPOINT + TL_API_KEY)
    //   .set({ accept: 'application/json' })
    //   .end(function(err, res){
    //     console.log(err, res);
    // });
  }

  render() {
    return (
      <Provider store={store}>  
        <MapContainer />
      </Provider>
    );
  }
}

export default App;
