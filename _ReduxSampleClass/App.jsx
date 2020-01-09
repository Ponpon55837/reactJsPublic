import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import MapState from './MapState.jsx'

ReactDOM.render(
  <Provider store={store}>
    <MapState />
  </Provider>,
  document.getElementById('root')
)
