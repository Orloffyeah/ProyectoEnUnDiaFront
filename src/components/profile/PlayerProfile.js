import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

// Components
import PGPList from './PGPList'
import { Link } from 'react-router-dom'
import FriendsList from './FriendsList'
import PlayerAction from './PlayerAction'


class PlayerProfile extends Component {

  componentDidMount() {
    this.initTabs()
  }

  componentDidUpdate(){
    this.initTabs()
  }

  initTabs(){
    const $ = window.$
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  render() {
    const { profile, own, relationsLists, locked, get_data } = this.props
    const {
      email,
      games,
      friends,
      pp_avatar,
      pp_username,
      player_game_profiles
    } = profile
    var profileButton = null
    if(own){
      profileButton = (
        <Link to= "/profile/settings" className="waves-effect waves-orange btn primary-color"
          style={{ width: '100%', marginBottom: 8 }} >
            Edit profile
        </Link>
      )
    }else{
      const { current: { c_friends }, player: { p_friends } } = relationsLists
      profileButton = (
        <PlayerAction player_id={ profile.id } return_data={ get_data }
          lists={{ current_friends: c_friends, player_friends: p_friends }} />
      )
    }
    return (locked) ?
      (<h4 className="center-align">This content isn't available by locks</h4>) :
      (<div className="container">
        <div className="row" style={{ marginTop: 32}}>
          <div className="col s12 m3 l3">
            <img src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }
              alt="Profile img" className="responsive-img"/>
            <p className="truncate" style={{ fontSize: 24, lineHeight: 1 }}>
              { pp_username }<br />
              <small className="grey-text trucate">{ email }</small>
            </p>
            { profileButton }
            {/* <div style={{ height: 200 }} className="teal">Espacio para mapa</div> */}
          </div>
          <div className="col s12 m9 l9">
            <ul className="tabs" style={{ margin: 0 }}>
              <li className="tab"><a className="primary-color" href="#pgp">Games</a></li>
              <li className="tab"><a className="primary-color" href="#friends">Friends</a></li>
            </ul>
            <div id="pgp">
              <PGPList games={ games } pgps={ player_game_profiles } own={ own }/>
            </div>
            <div id="friends">
              <FriendsList friends={ friends } own={ own }/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PlayerProfile
