import React, { Component } from 'react'

// Assests
import store from '../../js/store'
import { POST } from '../../js/requests'
import { login } from '../../js/actions'
import register_img from '../../assets/register_img.jpg'

// Components
import Loading from '../helpers/Loading'

class SignUp extends Component{

  constructor(props){
    super(props)
    this.state = {
      eqPass: null,
      status: null,
      logginIn: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  initSelect(){
    const $ = window.$
    $(document).ready(function() {
      $('select').material_select()
    })
  }

  componentDidMount(){
    document.title = 'Sign up'
    this.initSelect()
    this.setState({ isLoaded: true })
  }

  handleSubmit( event ){
    event.preventDefault()
    this.setState({ logginIn: true })
    const profile = {
      "player_profile": {
        "pp_username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "password_confirmation": document.getElementById("cpass").value,
        "email": document.getElementById("email").value
      }
    }

    POST('/player_profiles', profile).then(
      res => {
        const crendentials = {
          auth: {
            email: profile.player_profile.email,
            password: profile.player_profile.password
          }
        }
        POST('/player_profile_token', crendentials).then(
          res => {
            localStorage.setItem('spToken', res.data.jwt)
            sessionStorage.setItem('userId', res.data.user_id)
            store.dispatch(login())
          }
        ).catch(
          error => {
            this.setState({ logginIn: false})
          }
        )
      }
    ).catch(
      error => {
        this.setState({ logginIn: false})
      }
    )
  }

  handleChange(event){
    const password = document.getElementById("password").value
    const cpass = event.target.value
    var eqPass = cpass === password
    this.setState({ eqPass })
  }

  render(){

    const { eqPass, logginIn } = this.state

    if(logginIn){
      return (<main style={{ height: 'calc(100% - 110px)'}}><Loading /></main>)
    }

    var equalPass = null
    if(eqPass != null && !eqPass){
      equalPass = (
        <div className="input-field" style={{'marginBottom': 16, 'marginTop': 0}}>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Passwords mismatch
          </p>
        </div>
      )
    }
    const fixHeight = { height: 'calc(100% - 110px)', minHeight: '560px' }
    return (
      <main style={ fixHeight }>
        <figure className="back_image">
          <img src={ register_img } alt="una imagen mas"/>
          <figcaption>
            <div className="card-panel white center-align form-panel">
              <h5>Create your personal account.</h5>
              <form onSubmit={ this.handleSubmit }>
                <div className="input-field">
                  <input id="username" type="text" pattern="([a-zA-Z]+)([\w\.\-]*)"
                    title="Must begin with a letter" required/>
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                  <input id="email" type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    title="Must contain the symbol '@' followed of a domain" required/>
                  <label htmlFor="email">email</label>
                </div>
                <div className="input-field">
                  <input id="password" type="password"
                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                    title="Must contain at least one number, one letter and at least
                    8 or more characters"/>
                  <label  htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input id="cpass" type="password" onChange={ this.handleChange }
                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}" required/>
                  <label htmlFor="cpass">Confirm Password</label>
                </div>
                { equalPass }
                <button className="btn waves-effect waves-orange primary-color"
                type="submit">Sign Up</button>
              </form>
             </div>
          </figcaption>
        </figure>
      </main>
    )
  }
}

export default SignUp
