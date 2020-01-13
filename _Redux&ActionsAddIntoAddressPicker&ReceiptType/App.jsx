import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './main.jsx'
import store from './redux/store.jsx'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
