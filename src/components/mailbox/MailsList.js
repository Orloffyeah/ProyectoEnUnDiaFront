import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

//Components
import MailItem from './MailItem'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class MailsList extends Component {
  constructor(props){
    super(props)
    this.mail_id = 0
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){
    const { section } = this.props
    document.title = 'SPairing - ' + section
    this.requestMails(this.props.section)
  }

  requestMails(section){
    GET_AUTH('/mailboxes?section=' + section + '&page=1').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: false,
          status: (error.response != null) ? error.response.status : 0
        })
      }
    )
  }

  render(){
    const { items, isLoaded } = this.state
    const { section } = this.props
    var list = null
    if(isLoaded){

      if(items.length === 0){
        return (<h4 className="center-align">You don't have mails on { section }</h4>)
      }

      if(section === 'Sent'){
        list = items.map(
          (mail) => (
            <li key={ mail.id } className="clickable collection-item"
              onClick={ () => this.props.onClick(mail.id) }>
              <MailItem username={ mail.receiver.pp_username } subject={ mail.mail_subject }/>
            </li>
          )
        )
      }else{
        list = items.map(
          (mail) => (
            <li key={ mail.id } className="clickable collection-item"
              onClick={ () => this.props.onClick(mail.id) }>
              <MailItem username={ mail.sender.pp_username } subject={ mail.mail_subject }/>
            </li>
          )
        )
      }

      return (
        <div>
          <h4>{ section }</h4>
          <ul className="collection">
            { list }
          </ul>
        </div>
      )

    }else if(isLoaded == null){
      const $ = window.$
      return (<Loading h={$(document).height() - 110}/>)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default MailsList
