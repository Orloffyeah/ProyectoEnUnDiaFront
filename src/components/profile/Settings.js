import React, { Component } from 'react'

// Components
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
import BlockedProfilesList from './BlockedProfilesList'

class Settings extends Component {

  constructor(props){
    super(props)
    this.PROFILE = 0
    this.PASSWORD = 1
    this.BLOCKED = 2
    this.state = {
      view: this.PROFILE,
    }
  }

  handleClick(event, view){
    event.preventDefault()
    this.setState({ view })
  }

  render(){

    const { view } = this.state
    const { profile } = this.props

    var content = null
    switch(view){

      case this.PROFILE:
        content = (<UpdateProfile username={ profile.pp_username }
          avatarL={ profile.pp_avatar.url } location={ profile.location }
          email={ profile.email }/>)
        break

      case this.PASSWORD:
        content = (<UpdatePassword />)
        break

      case this.BLOCKED:
        content = (<BlockedProfilesList blocked={ profile.blocked_players } />)
        break

      default:
        content = (<div>Error</div>)
        break
    }
    return (
      <div className="container">
        <div className="row" style={{ marginTop: 32 }}>
          <div className="col s12 m3 l3">
            <div className="collection">
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.PROFILE) }>Profile</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.PASSWORD) }>Password</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.BLOCKED) }>Blocked Players</a>
            </div>
          </div>
          <div className="col s12 m9 l9">
            { content }
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
