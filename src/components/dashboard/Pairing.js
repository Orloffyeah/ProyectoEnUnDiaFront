import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import PGPItem from './PGPItem'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class Pairing extends Component {
  constructor(props){
    super(props)
    this.tags = true
    this.location = true
    this.state = {
      items: [],
      pgp_pairing: [],
      isLoaded: null,
      status: null,
      gameSelected: null
    }
  }

  componentDidMount(){
    this.initCarousel()
    GET_AUTH(`/player_profiles/${sessionStorage.getItem('userId')}/player_game_profiles`).then(
      res => {
        this.setState({
          items: res.data,
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

  componentDidUpdate(){
    this.initCarousel()
  }

  initCarousel(){
    const $ = window.$
    $(document).ready(function(){
      $('.carousel').carousel()
    })
  }

  handleClick(event, gameId){
    event.preventDefault()
    this.setState({ gameSelected: gameId })
  }

  pairing(event){
    event.preventDefault()
    const { gameSelected } = this.state
    const location = document.getElementById('location').checked
    const tags = document.getElementById('tags').checked
    GET_AUTH(`/pairing/${gameSelected}?location=${location}&&tags=${tags}`).then(
      res => {
        this.setState({
          pgp_pairing: res.data
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

  render(){
    const { items, isLoaded, gameSelected, pgp_pairing } = this.state
    if (isLoaded) {
      if (items.length === 0) {
        return (
          <div>
            <h4 className="center-align">
              You don't have games added
            </h4>
            <h5 className="center-align">
              Go to a game page and create your game profile for pairing
            </h5>
          </div>
        )
      }

      const games = items.map(
        pgp => (
          <a key={ pgp.id } className="carousel-item" href="#!"
              onClick={ (e) => this.handleClick(e, pgp.game.id)}>
            <div className="card hoverable">
              <div className="card-image">
                <img src={ pgp.game.gam_image } style={{ height: 350 }} alt={ pgp.game.gam_name }/>
              </div>
            </div>
          </a>
        )
      )

      const form = (
        <form onSubmit={ (e) => this.pairing(e) }>
          <p>
            <input type="checkbox" id="tags" defaultChecked={ this.tags }/>
            <label htmlFor="tags">By tags</label>
          </p>
          <p>
            <input type="checkbox" id="location" defaultChecked={ this.location }/>
            <label htmlFor="location">By location</label>
          </p>
          <button className="center-align btn waves-effect waves-orange primary-color"
            style={{ marginTop: 16 }}>
            Pairing
          </button>
        </form>
      )
      const players = pgp_pairing.map( (player, i) => <PGPItem key={ i } pgp={ player } /> )
      return (
        <div className="center-align">
          <h4 className="center-align">What do you want to play?</h4>
          <div className="carousel">
            { games }
          </div>
          { (gameSelected) ? form : null }
          <div className="row">
            { (pgp_pairing.length > 0) ? players : null }
          </div>
        </div>
      )
    } else if (isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Pairing
