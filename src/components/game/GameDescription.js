import React, { Component } from 'react'
import Rating from 'react-rating'

// Assets
import { noImage } from '../../js/assets'
import starEmpty from '../../assets/star-empty.png'
import starFull from '../../assets/star-full.png'
import { PATCH } from '../../js/requests'

class GameDescription extends Component {

  constructor(props){
    super(props)
    this.game = this.props.game
    this.pgp = this.props.pgp
  }

  handleChange(rate){
    const player_game_profile = { pgp_rate: rate*20 }
    console.log(player_game_profile);
    PATCH(`/player_game_profiles/${this.pgp.id}`, { player_game_profile }).then(
      (res) => {
        this.pgp = res.data
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  render(){
    const { genres, platforms, gam_description, gam_image, gam_name, spairing_rate } = this.game
    const gam_img = (gam_image) ? gam_image : noImage
    const rate = Number(Math.round(spairing_rate+'e1')+'e-1')
    const genresList = genres.map(g => g.gen_name).join(', ')
    const platformsList = platforms.map(p => p.plat_name).join(', ')
    var rating
    if(this.pgp){
      rating = (
        <Rating
          emptySymbol={ <img src={ starEmpty } className="icon" alt="star empty" /> }
          fullSymbol={ <img src={ starFull } className="icon" alt="star full" /> }
          onChange={(rate) => this.handleChange(rate)}
          initialRating={ this.pgp.pgp_rate/20 }
          fractions={ 2 }
        />
      )
    }else{
      rating = (<p>You need a game profile to rate this game</p>)
    }

    return (
      <div className="row">
        <div className="col s12 m3 l3">
          <img src={ gam_img } alt={ gam_name } style={{ width: '100%', marginTop: 32}} />
          <div align="center" className="col s12 valign-wrapper center-align">
            <img src={ starFull } height="35" alt="start full" />
            <h4>{rate}</h4>
          </div>
          <hr/>
          <div className="col s12 center-align">
            <b>How would you rate this game?</b>
          </div>
          <div className="col s12 center-align">
            {rating}
          </div>
        </div>
        <div className="col s12 m9 l9">
          <p className="flow-text">
            <b>Genre: </b>
            { genresList }
          </p>
          <p className="flow-text">
            <b>Platforms: </b>
            { platformsList }
          </p>
          <p className="flow-text">
            <br/>
            <b>Description: </b>
            { gam_description }
          </p>
        </div>
      </div>
    )
  }
}

export default GameDescription
