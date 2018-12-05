import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/css/App.css'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import RoutesList from './components/RoutesList'
import registerServiceWorker from './js/registerServiceWorker'


ReactDOM.render(
  <Router>
    <RoutesList/>
  </Router>,
  document.getElementById('root'))
registerServiceWorker()
