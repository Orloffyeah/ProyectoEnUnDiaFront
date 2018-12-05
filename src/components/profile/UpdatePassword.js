import React, { Component } from 'react'

class UpdatePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eqPass: null
    }
  }

  handleChange(event){
    const password = document.getElementById("newPassword1").value
    const cpass = event.target.value
    var eqPass = cpass === password
    this.setState({ eqPass })
  }

  render(){
    const { eqPass } = this.state
    const adjMargin = {
      marginLeft: 0,
      marginRight: 0
    }
    var equalPass = null
    if(eqPass != null && !eqPass){
      equalPass = (
        <div className="input-field col s12 m9 l9" style={{'marginBottom': 16, 'marginTop': 0}}>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Passwords mismatch
          </p>
        </div>
      )
    }

    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="row" style={ adjMargin }>
          <h6><b>Change password</b></h6>
          <div className="input-field col s12 m9 l9">
            <input id="oldPassword" type="password"/>
            <label htmlFor="oldPassword">Old password</label>
          </div>
          <div className="input-field col s12 m9 l9">
            <input id="newPassword1" type="password"/>
            <label htmlFor="newPassword1">New password</label>
          </div>
          <div className="input-field col s12 m9 l9">
            <input id="newPassword2" type="password" onChange={ (e) => this.handleChange(e) }/>
            <label htmlFor="newPassword2">Confirm new password</label>
          </div>
        </div>
        <div className="row" style={ adjMargin }>
          { equalPass }
          <div className="input-field col s12 m9 l9 center-align">
            <button type="submit" className="btn waves-effect waves-orange secondary-color">
              Update Password
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default UpdatePassword
