import React from 'react'

// Assets
import store from '../../js/store'
import { logout } from '../../js/actions'

// Components
import NotFound from '../helpers/NotFound'

const ErrorManager = ({ status }) => {
  const setTimeOut = window.setTimeOut
  switch(status){

    case 0:
      return (<h2 className="center-align">No server connection</h2>)

    case 404:
      return(<NotFound />)

    case 401:
      setTimeOut(() => {
        localStorage.removeItem('spToken')
        store.dispatch(logout())
      }, 3000)
      return (<h2 className="center-align">Not logged in</h2>)

    case 500:
      return (<h2 className="center-align">Server Error</h2>)

    default:
      return (<h2>New error: { status }</h2>)
  }
}

export default ErrorManager
