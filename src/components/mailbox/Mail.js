import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class Mail extends Component {

  constructor(props){
    super(props)
    this.state = {
      mail: null,
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){
    document.title = 'Mailbox'
    GET_AUTH(`/mailboxes/${this.props.id}`).then(
      (res) => {
        console.log(res.data);
        this.setState({
          mail: res.data,
          isLoaded: true
        })
        const { mail } = this.state
        document.title = (mail.mail_subject) ? mail.mail_subject : 'SPairing'
      }
    ).catch(
      (error) => {
        this.setState({
          status: (error.response) ? error.response.status : 0,
          isLoaded: false
        })
      }
    )
  }

  render(){
    const { mail, isLoaded } = this.state
    if(isLoaded){
      var mail_subject = (mail.mail_subject) ? mail.mail_subject : '(no subject)'
      return (
        <div>
          <div className="section">
            <h5>{ mail_subject }</h5>
          </div>
          <div className="divider" />
          <div className="section">
            <h6><b>{ mail.sender.pp_username }</b></h6>
            <p>{ mail.mail_message }</p>
          </div>
        </div>
      )
    }else if(isLoaded == null) {
      return (<Loading />)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Mail
