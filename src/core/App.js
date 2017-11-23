import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import request from 'superagent';
import rootReducer from './rootReducer';
import MapContainer from '../map/components/MapContainer';

const TL_API_KEY = '0YBx84IIICWAHXxT4TkQ';
const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
const TRANSLINK_ENDPOINT = 'http://api.translink.ca/rttiapi/v1/buses?apikey=';
const MAP_BOX_TOKEN = 'pk.eyJ1IjoiYndpbGxlbSIsImEiOiJjamFicHl3ZXAwMmh2MndsZGQwaHNpbTByIn0.hX-QcmRvsLJb3dqTqu0nQw';

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
