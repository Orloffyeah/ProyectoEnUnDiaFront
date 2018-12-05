import React, { Component } from 'react'

//Assets
import store from '../../js/store'
import { logout } from '../../js/actions'
import logo from '../../assets/Icon_SPairing.svg'

// Components
import { Link } from 'react-router-dom'

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authed: store.getState().session
    }
    this.player_profiles = {}
  }

  initNav(){
    const $ = window.$
    $( document ).ready(function(){
      $(".button-collapse").sideNav({
        menuWidth: 200,
        closeOnClick: true
      })
    })
  }

  componentWillMount(){
    this.initNav()
    store.subscribe(
      () => {
        this.setState({
          authed: store.getState().session
        })
      }
    )
  }

  log_out(event){
    event.preventDefault()
    localStorage.removeItem('spToken')
    localStorage.removeItem('userId')
    store.dispatch(logout())
  }

  render() {
    const adjPadding = {
      'paddingLeft': '16px',
      'paddingRight': '16px'
    }
    const authed = this.state.authed
    if(authed){
      return (
        <nav>
          <div className="nav-wrapper primary-color">
            <Link to="/dashboard/news" className="brand-logo" style={ adjPadding }>
              <img src={ logo } alt="SPairing Logo"
                className="hide-on-small-only resposive-img center-align"/>
              SPairing
            </Link>
            <a href="#!" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons black-text">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/dashboard/news">Dashboard</Link></li>
              <li><Link to={ "/profile/" +  sessionStorage.getItem('userId') }>Profile</Link></li>
              <li><Link to="/mailbox">Mail</Link></li>
              <li><Link to="/" onClick={ (e) => this.log_out(e) }>Log out</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/dashboard/news">Dashboard</Link></li>
              <li><Link to={ "/profile/" +  sessionStorage.getItem('userId') }>Profile</Link></li>
              <li><Link to="/mailbox">Mail</Link></li>
              <li><Link to="/" onClick={ (e) => this.log_out(e) }>Log out</Link></li>
            </ul>
          </div>
        </nav>
      )
    }else{
      return (
        <nav>
          <div className="nav-wrapper primary-color">
            <Link to="/" className="brand-logo" style={ adjPadding }>
              <img src={ logo } alt="SPairing Logo"
                className="hide-on-small-only resposive-img center-align"/>
              SPairing
            </Link>
            <a href="#!" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons black-text">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      )
    }
  }
}

export default Header
