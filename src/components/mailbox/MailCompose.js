import React, { Component } from 'react'

// Assests
import { GET_AUTH, POST_AUTH } from '../../js/requests'

class MailCompose extends Component {

  constructor(props){
    super(props)
    this.player_profiles = {}
  }

  componentDidMount(){
    const $ = window.$
    $('.chips-autocomplete').material_chip({
      placeholder: 'To:'
    })

    $('.chips').on('chip.delete', (e, chip) => {
      delete this.player_profiles[chip.tag]
    })

    const chip_input = $('#recipients input')
    chip_input.attr('id', 'autocomplete-input')
    chip_input.attr('type', 'text')
    chip_input.attr('autocomplete', 'off')
    chip_input.addClass('autocomplete')
    chip_input.css({
      'margin-bottom': 0,
      'border-bottom': 0
    })
    chip_input.on('input', (e) => { this.handleChange(e, chip_input.val()) })
  }

  handleChange(e, val){
    GET_AUTH('/usernameslike?username='+ val + '&page=1').then(
      (res) => {
        this.uploadAutocomplete(res.data)
      }
    ).catch(
      (error) => {
        this.uploadAutocomplete(null)
        console.log(error)
      }
    )
  }

  uploadAutocomplete(data){
    const $ = window.$
    var aux = {}, with_ids = {}, aux2 = this.player_profiles
    if(data){
      data.forEach(
        (user) => {
          aux[user.pp_username] = null
          with_ids[user.pp_username] = user.id
        }
      )
    }
    $('#recipients input.autocomplete').autocomplete({
      data: aux,
      limit: 5,
      onAutocomplete: function(val) {
        aux2[val] = with_ids[val]
      },
      minLength: 1,
    })
    this.player_profiles = aux2
  }

  handleSubmit(event){
    event.preventDefault()

    const mail = {
      mail_subject: document.getElementById('subject').value,
      mail_message: document.getElementById('body').value,
      recipient_ids: Object.values(this.player_profiles)
    }

    POST_AUTH('/mailboxes', { mailbox: mail }).then(
      (res) => {
        this.props.onClick()
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  render(){
    const noMargin = { margin: 0 }
    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="row">
          <div className="input-field col s12">
            <div id="recipients" className="chips chips-autocomplete" ></div>
          </div>
          <div className="input-field col s12">
            <input id="subject" type="text" placeholder="Subject:" style={ noMargin } />
            <textarea id="body" className="materialize-textarea" placeholder="Compose email"/>
          </div>
          <div className="input-field col s12 left-align">
            <button id="submitCompose" className="waves-effect waves-orange btn secondary-color">Send</button>
          </div>
        </div>
      </form>
    )
  }
}

export default MailCompose
