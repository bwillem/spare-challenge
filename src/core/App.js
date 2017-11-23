import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './configureStore'
import rootReducer from './rootReducer'
import MapContainer from '../map/components/MapContainer'

class App extends Component {
  render() {
    return (
      <Provider store={store}>  
        <MapContainer />
      </Provider>
    );
  }
}

export default App
