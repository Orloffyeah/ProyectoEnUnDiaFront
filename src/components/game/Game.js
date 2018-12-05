import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import GameGallery from './GameGallery'
import Loading from '../helpers/Loading'
import ForumTab from '../forum/ForumTab'
import GameDescription from './GameDescription'
import Leaderboard from './Leaderboard'
import ErrorManager from '../helpers/ErrorManager'
import PlayerGameProfile from './PlayerGameProfile'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      game: {},
      pgp: null,
      isLoaded: null,
      status: null
    }
  }

  componentDidUpdate() {
    this.initComp()
  }

  initComp(){
    const $ = window.$
    $(document).ready(function(){
      $('.parallax').parallax()
      $('ul.tabs').tabs();
    })
  }

  getPgp(game){
    const url = `/player_games?pid=${sessionStorage.getItem('userId')}&gid=${game.id}`
    GET_AUTH(url).then(
      (res) => {
        this.setState({
          game: game,
          isLoaded: true,
          pgp: res.data
        })
      }
    ).catch(
      (error) => {
        console.log(error)
        this.setState({
          game: game,
          isLoaded: true,
          pgp: null
        })
      }
    )
  }

  createPgp = (pgp) => {
    this.setState({ pgp })
  }

  componentDidMount() {
    const { match: { params: { gameId } } } = this.props
    document.title = "SPairing"
    this.initComp()
    GET_AUTH(`/games/${ gameId }`).then(
      (res) => {
        this.getPgp(res.data)
      }
    ).catch(
      (error) => {
        console.log(error)
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  render() {
    const { game, isLoaded, pgp } = this.state
    const noPadding = { padding: 0 }, noMargin = { margin: 0 }
    const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
    if (isLoaded) {
      const { gam_name, screenshots } = game
      const screenshot = screenshots[Math.floor(Math.random() * screenshots.length)].scr_url
      return (
        <main style={ fixHeight }>
          <div className="parallax-container">
            <h2 className="white-text container">
              { game.gam_name }
            </h2>
            <div className="parallax">
              <img src={ screenshot } alt={ gam_name }/>
            </div>
          </div>
          <div className="section" style={ noPadding }>
            <div className="row" style={ noMargin }>
              <div className="col s12" style={ noPadding }>
                <ul className="tabs">
                  <li className="tab col s3"><a className="primary-color-dark" href="#about">About</a></li>
                  <li className="tab col s3"><a className="primary-color-dark" href="#forum">Forum</a></li>
                  <li className="tab col s3"><a className="primary-color-dark" href="#gameProfile">Game Profile</a></li>
                  <li className="tab col s3"><a className="primary-color-dark" href="#statistics">Statistics</a></li>
                </ul>
              </div>
              <div className="container">
                <div id="about" className="col s12">
                  <GameDescription game={ game } pgp={ pgp }/>
                  <GameGallery screenshots={ screenshots } />
                </div>
                <div id="forum" className="col s12">
                  <ForumTab gameId={ game.id } />
                </div>
                <div id="gameProfile" className="col s12">
                  <PlayerGameProfile gameId={ game.id } pgp={ pgp } create={ this.createPgp }/>
                </div>
                <div id="statistics" className="col s12">
                  <Leaderboard game={ game }/>
                </div>
              </div>
            </div>
          </div>
        </main>
      )
    } else if(isLoaded == null) {
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <Loading />
        </main>
      )
    } else {
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <ErrorManager status={ this.state.status } />
        </main>
      )
    }
  }
}

export default Game
