import React, { Component } from 'react'

// Components
import Mail from './Mail'
import MailsList from './MailsList'
import MailCompose from './MailCompose'
import AdList from '../ads/AdList'

class Mailbox extends Component {

  constructor(props){
    super(props)
    this.INBOX = 0
    this.SENT = 1
    this.COMPOSE = 2
    this.MAIL = 3
    this.mail_id = 0
    this.state = {
      view: this.INBOX,
      id: 0
    }
  }

  handleClick(i){
    this.setState({ view: i })
  }

  renderMail = (mail_id) => {
    this.mail_id = mail_id
    this.handleClick(this.MAIL)
  }

  render(){
    const { view } = this.state
    var aux = null
    switch(view){
      case this.INBOX:
        aux = (<MailsList key={1} section="Inbox" onClick={ this.renderMail }/>)
        break

      case this.SENT:
        aux = (<MailsList key={2} section="Sent" onClick={ this.renderMail }/>)
        break

      case this.COMPOSE:
        aux = (<MailCompose onClick={ () => this.handleClick(this.INBOX) }/>)
        break

      case this.MAIL:
        aux = (<Mail id={this.mail_id}/>)
        break

      default:
        aux = (<div>Un error</div>)
        break
    }
    const content = aux
    const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
    return (
      <main style={ fixHeight }>
        <div className="row" style={{ margin: 0 }}>
          <div className="col s12 m3 l2 center-align">
            <br />
            <button className="waves-orange btn primary-color"
              onClick={ () => this.handleClick(this.COMPOSE) }>Compose</button>
            <div className="collection">
              <a href="#!" className="primary-color-text collection-item"
                onClick={ () => this.handleClick(this.INBOX) }>Inbox</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ () => this.handleClick(this.SENT) }>Sent</a>
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

export default Mailbox
