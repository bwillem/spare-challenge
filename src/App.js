import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import request from 'superagent';
import mapReducer from './map/state/mapReducer';
import MapContainer from './map/components/MapContainer';

const API_KEY = '0YBx84IIICWAHXxT4TkQ';
const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const TRANSLINK_ENDPOINT = 'http://api.translink.ca/rttiapi/v1/buses?apikey=';
const store = createStore(mapReducer);

class App extends Component {
  componentDidMount () {
    request
      .get(CORS_URL + TRANSLINK_ENDPOINT + API_KEY)
      .set({ accept: 'application/json' })
      .end(function(err, res){
        console.log(err, res);
    });
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
