import React, { Component } from 'react'

// Assets
import { GET } from '../../js/requests'
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

// Components
import Loading from '../helpers/Loading'
import LeaderboardItem from './LeaderboardItem'
import ErrorManager from '../helpers/ErrorManager'

class Leaderboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      players: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount() {
    const route = `/player_profiles`
    GET(route).then(
      (res) => {
        this.setState({
          players: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
    const $ = window.$
    document.title = "SPairing"
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  addData(array, player){
    if(player.pp_avatar.url){
      array.push({user: player.pp_username,
                  elo: player.pp_spairing_elo,
                  avatar: BASE_URL + player.pp_username})
    }
    else{
      array.push({user: player.pp_username,
                  elo: player.pp_spairing_elo,
                  avatar: defaultAvatar})
    }

    return array
  }

  getLeaderData(){
    var top3 = []
    var players = []

    for(var i = 0; i < 10; i++){
      const player = this.state.players[i]

      if(i<=2){
        this.addData(top3, player)
      }
      else{
        this.addData(players, player)
      }
    }

    return [top3, players]
  }

  render() {
    const { isLoaded } = this.state

    if (isLoaded) {
      const leaderboard = this.getLeaderData()

      var list
      list = leaderboard[1].map((player, i) => (<li key={i}><LeaderboardItem player={ player } index={ i+4 }/></li>))

      return (
        <div>
          <div className="row center-align">
            <h1>Leaderboard</h1>
          </div>
          <div className="row vertical-center">
            <div className="col s4 center-align vertical-center">
              <img className="circle responsive-img" alt="" src={leaderboard[0][1].avatar}height="160" width="160"/>
              <h4 className="leftText">{leaderboard[0][1].user}</h4>
              <h4 className="leftText">Score: {leaderboard[0][1].elo}</h4>
            </div>
            <div className="col s4 center-align">
              <img className="circle responsive-img" alt="" src={leaderboard[0][0].avatar}height="240" width="240"/>
              <h4 className="leftText">{leaderboard[0][0].user}</h4>
              <h4 className="leftText">Score: {leaderboard[0][0].elo}</h4>
            </div>
            <div className="col s4 center-align vertical-center">
              <img className="circle responsive-img" alt="" src={leaderboard[0][2].avatar}height="160" width="160"/>
              <h4 className="leftText">{leaderboard[0][2].user}</h4>
              <h4 className="leftText">Score: {leaderboard[0][2].elo}</h4>
            </div>
          </div>
          <div className="row">
            <div>
              <ul>{ list }</ul>
            </div>
          </div>
        </div>
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Leaderboard
