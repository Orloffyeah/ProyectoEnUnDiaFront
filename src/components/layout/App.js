import React, { Component } from 'react'

// Assets
import store from '../../js/store'
import { GET_AUTH } from '../../js/requests'
import { login, logout } from '../../js/actions'

// Components
import Header from './Header'
import Footer from './Footer'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoaded: null
    }
  }

  componentDidMount(){
    if (!!localStorage.getItem('spToken')) {
      GET_AUTH('/validate_session').then(
        res => {
          sessionStorage.setItem('userId', res.data.user_id)
          store.dispatch(login())
          this.setState({ isLoaded: true })
        }
      ).catch(
        error => {
          if (error.response) {
            store.dispatch(logout())
            localStorage.removeItem('spToken')
            this.setState({ isLoaded: true })
          } else {
            this.setState({ isLoaded: false })
          }
        }
      )
    } else {
      if (!!sessionStorage.getItem('userId')){
        sessionStorage.removeItem('userId')
      }
      this.setState({ isLoaded: true })
    }
  }

  render() {
    const { isLoaded } = this.state
    if (isLoaded) {
      const { children } = this.props
      return (
        <div>
          <header>
            <Header/>
          </header>
          { children }
          <footer className="page-footer primary-color" style={{ padding: 0 }}>
            <Footer/>
          </footer>
        </div>
      )
    }else if (isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ 0 } />)
    }
  }
}

export default App
