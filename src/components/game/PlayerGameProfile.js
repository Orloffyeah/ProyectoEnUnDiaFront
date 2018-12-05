import React, { Component } from 'react'

// Assets
import { POST_AUTH, DEL_AUTH } from '../../js/requests'

class PlayerGameProfile extends Component{
  constructor(props){
    super(props)
    this.CREATE = 0
    this.SHOW_EDIT = 1
    this.state = {
      view: (this.props.pgp)? this.SHOW_EDIT : this.CREATE,
      disabled: true,
      create: false,
      pgp: this.props.pgp
    }
  }

  componentDidMount(){
    this.initInputs()
  }

  componentDidUpdate(){
    this.initInputs()
  }

  initInputs(){
    const $ = window.$
    const Materialize = window.Materialize
    $(document).ready(function() {
      Materialize.updateTextFields()
    })
  }

  createPgp(event){
    event.preventDefault()
    this.setState({
      create: true
    })
  }

  editPgp(event){
    event.preventDefault()
    this.setState({
      disabled: false
    })
  }

  savePgp(event){
    event.preventDefault()
    this.setState({
      disabled: true
    })
  }

  deletePgp(event){
    event.preventDefault()

    const url = `/player_game_profiles/${this.state.pgp.id}`

    DEL_AUTH(url).then(
      (res) => {
        console.log(res.data)
        this.setState({
          view: this.CREATE,
          disabled: true,
          create: false,
          pgp: null
        })
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  handleSubmit(event){
    event.preventDefault()

    const { gameId } = this.props
    const url = `/player_profiles/${sessionStorage.getItem('userId')}/player_game_profiles`

    const player_game_profile = {
      pgp_nickname: document.getElementById('nickname').value,
      pgp_reputation: 3.0,
      game_id: gameId
    }

    POST_AUTH(url, { player_game_profile }).then(
      (res) => {
        console.log(res.data);
        this.props.create(res.data)
        this.setState({
          view: this.SHOW_EDIT,
          pgp: res.data
        })
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  render(){
    const { view, disabled, pgp, create } = this.state
    var button

    switch (view) {
      case this.CREATE:
        if(create){
          return (
            <div className="row">
              <h3>Create game profile</h3>
              <div className="input-field col s12">
                <input id="nickname" type="text" />
                <label htmlFor="nickname">Nickname</label>
              </div>
              <button className="waves-effect waves-orange btn primary-color" onClick={ (e) => this.handleSubmit(e) }>
                Create
              </button>
            </div>
          )
        }else{
          return (
            <div className="row">
              <h3>You dont have a game profile</h3>
              <button className="waves-effect waves-orange btn primary-color" onClick={ (e) => this.createPgp(e) }>
                Create
              </button>
            </div>
          )
        }
      case this.SHOW_EDIT:

        if(disabled){
          button = (
            <button className="waves-effect waves-orange btn primary-color" onClick={ (e) => this.editPgp(e) }>
              Edit
            </button>
          )
        }else{
          button = (
            <button className="waves-effect waves-orange btn primary-color" onClick={ (e) => this.savePgp(e) }>
              Save
            </button>
          )
        }

        return (
          <div className="row">
            <h3>{ pgp.game.gam_name } profile</h3>
            <div className="input-field col s12">
              <input id="nickname" type="text" defaultValue={pgp.pgp_nickname} disabled={ disabled }/>
              <label htmlFor="nickname">Nickname</label>
            </div>
            { button }
            <button className="waves-effect waves-orange btn primary-color" onClick={ (e) => this.deletePgp(e) }>
              Delete
            </button>
          </div>
        )
      default:
        return(<p>An error has occurred</p>)
    }
  }
}

export default PlayerGameProfile
