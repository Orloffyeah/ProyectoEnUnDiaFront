import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

class PlayerAction extends Component {

  constructor(props){
    super(props)
    this.senderId = sessionStorage.getItem('userId')
    this.currentFriends = props.lists.current_friends
    this.playerFriends = props.lists.player_friends
    this.areFriends = 0
    this.requestSent = 1
    this.notFriends = 2
    this.requestReceived = 3
    this.state = {
      friendStatus: null
    }
  }

  componentWillMount(){
    this.friendStatusCalc()
  }

  addFriend(event){
    event.preventDefault()
    const { player_id } = this.props
    GET_AUTH(`/friend_request/${player_id}`).then(
      res => {
        this.updateLists(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  removeFriend(event){
    event.preventDefault()
    const { player_id } = this.props
    GET_AUTH(`/remove_friend/${player_id}`).then(
      res => {
        this.updateLists(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  blockPlayer(event){
    event.preventDefault()
    const { player_id, return_data } = this.props
    GET_AUTH(`/block_player/${player_id}`).then(
      res => {
        return_data(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  updateLists(data){
    const { current_friends, player_friends } = data
    this.currentFriends = current_friends
    this.playerFriends = player_friends
    this.friendStatusCalc()
  }

  friendStatusCalc(){
    const { player_id } = this.props
    if(this.currentFriends.includes(parseInt(player_id, 10))){
      if(this.playerFriends.includes(parseInt(this.senderId, 10))) {
        this.setState({ friendStatus: this.areFriends })
      }else{
        this.setState({ friendStatus: this.requestSent })
      }
    }else if(this.playerFriends.includes(parseInt(this.senderId, 10))){
      this.setState({ friendStatus: this.requestReceived })
    }else{
      this.setState({ friendStatus: this.notFriends })
    }
  }

  render(){
    const { friendStatus } = this.state
    const buttonStyle = { width: '100%', marginBottom: 8 }
    const lockButton = (
      <button className="btn waves-effect waves-orange primary-color"
        style={ buttonStyle }
        onClick={ (e) => this.blockPlayer(e) } >
        Block Player
      </button>
    )
    switch (friendStatus) {

      case this.areFriends:
        return (
          <div>
            <button className="waves-effect waves-orange btn primary-color-light"
              onClick={ (e) => this.removeFriend(e) } style={ buttonStyle }>
              Remove Friend
            </button>
            { lockButton }
          </div>
        )

      case this.requestSent:
        return (
          <div>
            <button className="waves-effect waves-orange btn primary-color-light"
              onClick={ (e) => this.removeFriend(e) } style={ buttonStyle }>
              Cancel request
            </button>
            { lockButton }
          </div>
        )

      case this.notFriends:
        return (
          <div>
            <button className="waves-effect waves-orange btn secondary-color"
              onClick={ (e) => this.addFriend(e) } style={ buttonStyle } >
              Add Friend
            </button>
            { lockButton }
          </div>
        )

      case this.requestReceived:
        return (
          <div>
            <button className="waves-effect waves-orange btn secondary-color"
              style={ buttonStyle }
              onClick={ (e) => this.addFriend(e) } >
              Accept request
            </button>
            <button className="waves-effect waves-orange btn secondary-color"
              style={ buttonStyle }
              onClick={ (e) => this.removeFriend(e) } >
              Decline request
            </button>
            { lockButton }
          </div>
        )

      default:
        return (
          <p>Error con este boton :(</p>
        )
    }
  }
}

export default PlayerAction
