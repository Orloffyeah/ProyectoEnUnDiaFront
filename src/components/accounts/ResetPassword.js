import React, { Component } from 'react'

// Assets
import login_img from '../../assets/login_image.jpg'

class ResetPassword extends Component {

  componentDidMount(){
    document.title = 'Reset Password'
  }

  handleSubmit(event){
    event.preventDefault()
    const email = document.getElementById('email').value
    console.log('email: ', email)
  }

  render(){
    return (
      <figure className="back_image">
        <img src={ login_img } alt="login image"/>
        <figcaption>
          <div className="center-align form-panel">
            <div className="card-panel white">
              <form onSubmit={ (e) => this.handleSubmit(e)}>
              <h5>Recover your password</h5>
                <div>
                   <h6 className="left-align">Please remind us your email in order to send you a recovery email, if an account associated to it exists</h6>
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" pattern="(([a-zA-Z]+)([\w\.\-]*)\@([\w\.\-]*)\.([\w\.\-]*))" required/>
                </div>
                <button className="waves-effect waves-orange btn primary-color">Recover password</button>
              </form>
            </div>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default ResetPassword
