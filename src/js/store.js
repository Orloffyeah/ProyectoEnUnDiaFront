import { createStore } from 'redux'

const initialState = {
  session: false
}

const reducer = (state, action) => {
  switch(action.type){

    case 'LOG_IN':
      return {
        ...state,
        session: true
      }

    case 'LOG_OUT':
      return {
        ...state,
        session: false
      }

    default:
      return state
  }
}

export default createStore(reducer, initialState)
