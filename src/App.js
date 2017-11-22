import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mapReducer from './map/state/mapReducer';
import MapContainer from './map/components/MapContainer';

const API_KEY = '0YBx84IIICWAHXxT4TkQ';

const store = createStore(mapReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>  
        <MapContainer />
      </Provider>
    );
  }
}

export default App;
