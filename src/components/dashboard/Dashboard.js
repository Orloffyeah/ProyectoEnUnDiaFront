import React, { Component } from 'react'

// Components
import Home from './Home'
import Pairing from './Pairing'
import AdList from '../ads/AdList'
import GameSearch from './GameSearch'
import { Link } from 'react-router-dom'
import ProfileSearch from './ProfileSearch'
import ErrorManager from '../helpers/ErrorManager'

class Dashboard extends Component {

  constructor(props){
    super(props)
    this.HOME = 'news'
    this.PAIRING = 'pairing'
    this.GAMES = 'game_search'
    this.PROFILES = 'player_search'
  }

  componentDidMount(){
    document.title = 'SPairing'
  }

  render(){
    const { match: { params: { view }} } = this.props
    var content = null
    const noMargin = { margin: 0 }
    switch(view){
      case this.HOME:
        content = (<Home />)
        break

      case this.PAIRING:
        content = (<Pairing />)
        break

      case this.GAMES:
        content = (<GameSearch />)
        break

      case this.PROFILES:
        content = (<ProfileSearch />)
        break

      default:
        content = (<ErrorManager status={ 404 } />)
        break
    }
    return (
      <main style={{ height: 'auto' }}>
        <div className="row" style={ noMargin }>
          <div className="col s12 m3 l2">
            <div className="collection">
              <Link to="/dashboard/news" className="collection-item">
                Home
              </Link>
              <Link to="/dashboard/pairing" className="collection-item">
                Pairing
              </Link>
              <Link to="/dashboard/game_search" className="collection-item">
                Game
              </Link>
              <Link to="/dashboard/player_search" className="collection-item">
                Players
              </Link>
            </div>
            <div className="center-align">
              <h5>Sponsored Content</h5>
            </div>
            <AdList/>
          </div>
          <div className="col s12 m9 l10">
            { content }
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
