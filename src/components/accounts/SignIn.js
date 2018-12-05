import React, { Component } from 'react'

// Assets
import store from '../../js/store'
import { login } from '../../js/actions'
import { POST } from '../../js/requests'
import login_img from '../../assets/login_img.jpg'

// Components
import Loading from '../helpers/Loading'
import { GoogleLogin } from 'react-google-login'

class SignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      error: false,
      logginIn: false
    }
  }

  componentDidMount() {
    document.title = 'Sign in'
  }

  handleSubmit(event) {

    event.preventDefault()
    this.setState({ logginIn: true })
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const credentials = {
      "auth": {
        "email": email,
        "password": password
      }
    }

    POST('/player_profile_token', credentials).then(
      res => {
          localStorage.setItem('spToken', res.data.jwt)
          sessionStorage.setItem('userId', res.data.user_id)
          store.dispatch(login())
      }
    ).catch(
      error => {
        this.setState({
          error: true,
          logginIn: false
        })
      }
    )
  }

  responseGoogle = (response) => {
    this.setState({ logginIn: true })
    const data = {id_token: response.Zi.id_token }

    POST('/google_authentication', data).then(
      res => {
          localStorage.setItem('spToken', res.data.jwt)
          localStorage.setItem('userId', res.data.user_id)
          store.dispatch(login())
      }
    ).catch(
      error => {
        this.setState({
          error: true,
          logginIn: false
        })
      }
    )
  }

  render() {
    const { error, logginIn } = this.state
    const adjMargin = {
      'marginBottom': 16,
      'marginTop': 0
    }
    const fixHeight = { height: 'calc(100% - 110px)', minHeight: '560px' }
    if(logginIn){
      return (<main style={{ height: 'calc(100% - 110px)'}}><Loading /></main>)
    }
    var errorMessage = null
    if(error){
      errorMessage = (
        <div className="input-field" style={ adjMargin }>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Email or password are incorrect
          </p>
        </div>
        )
    }
    return (
      <main style={ fixHeight }>
        <figure className="back_image">
          <img src={ login_img } alt="The Pulpit Rock"/>
          <figcaption>
            <div className="center-align form-panel">
              <div className="card-panel white">
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                  <h5>Sign in to Spairing</h5>
                  <div className="input-field">
                    <input type="email" id="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                      title="Must contain the symbol '@' followed of a domain"/>
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input type="password" id="password"
                      pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                      title="Must contain at least one number, one letter and at
                      least 8 or more characters"/>
                    <label htmlFor="password">Password</label>
                  </div>
                  { errorMessage }
                  <button className="waves-effect waves-orange btn primary-color" style={{"marginBottom": "20px"}}>Sign In</button>
                  <GoogleLogin
                      clientId="544479097367-vsgksn1j0h4p6kv9glqhq6h6pffbs5l4.apps.googleusercontent.com"
                      buttonText="Sign in with Google"
                      onSuccess={ this.responseGoogle }
                  />
                  <h6><br/>
                    <a href="/resetpassword">Forgot your password?</a>
                  </h6>
                </form>
              </div>
              <div className="card-panel blue lighten-5">
                <span>Are you new on Spairing?
                  <br/>
                  <a href="/register">Create an account</a>
                </span>
              </div>
            </div>
          </figcaption>
        </figure>
      </main>
    )
  }
}

export default SignIn
