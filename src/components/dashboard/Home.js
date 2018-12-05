import React, { Component } from 'react'

// Assets
import { GET_AUTH, GET } from '../../js/requests'

// Components
import ProfileItem from './ProfileItem'
import GameItem from './GameItem'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      pgps: [],
      mostPlayed: [],
      players: [],
      isLoaded: null,
      status: null
    }
  }

  getMyGames(){
    GET_AUTH(`/player_profiles/${sessionStorage.getItem('userId')}/player_game_profiles`).then(
      res => {
        this.setState({
          pgps: res.data,
          isLoaded: true
        })
      }
    ).catch(
      error => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  getGamesMostPlayed(){
    GET('/statistics/gam_most_played').then(
      (res) => {
        this.setState({
          // loading: false,
          mostPlayed: res.data
        })
      }
    )
  }

  getSuggestedProfiles(){
    GET_AUTH('suggested_profiles').then(
      (res) => {
        this.setState({
          // loading: false,
          players: res.data
        })
      }
    )
  }

  componentDidMount(){
    this.getMyGames()
    this.getGamesMostPlayed()
    this.getSuggestedProfiles()
  }

  render(){
    const { pgps, mostPlayed, players, isLoaded } = this.state
    var my_games, g_most_played, suggested_profiles
    if (isLoaded) {
      if (pgps.length === 0) {
        my_games = (
          <div>
            <h4 className="center-align">
              My games
            </h4>
            <h5 className="center-align">
              You don't have games added
            </h5>
          </div>
        )
      }else{
        var games = pgps.map(
          (pgp) => (<GameItem key={ pgp.game.id } game={ pgp.game } />)
        )
        my_games = (
          <div>
            <h4 className="center-align">
              My games
            </h4>
            { games }
          </div>
        )
      }

      if (mostPlayed.length > 0) {
        var popular_games = mostPlayed.map(
          (game) => (<GameItem key={ game.id } game={ game } />)
        )
        g_most_played = (
          <div>
            <h4 className="center-align">
              Games most played
            </h4>
            { popular_games }
          </div>
        )
      }

      if (players.length > 0) {
        var profiles = players.map(
          (profile) => (<ProfileItem key={ profile.id } profile={ profile } />)
        )
        suggested_profiles = (
          <div>
            <h4 className="center-align">
              Suggested players
            </h4>
            { profiles }
          </div>
        )
      }
      return (
        <div>
          <div className="row">
            { my_games }
          </div>
          <div className="row">
            { g_most_played }
          </div>
          <div className="row">
            { suggested_profiles }
          </div>
        </div>
      )
    } else if (isLoaded == null) {
      const $ = window.$
      return (<Loading h={ $(window).height()/2 }/>)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Home
