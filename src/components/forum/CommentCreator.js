import React, { Component } from 'react'

// Assets
import { POST_AUTH } from '../../js/requests'

class CommentCreator extends Component {
  handleSubmit(event){
    event.preventDefault()
    const { url, threadId } = this.props
    const comment = {
      com_comment: document.getElementById('comment').value,
      thread_forum_id: threadId,
      player_profile_id: sessionStorage.getItem('userId')
    }
    POST_AUTH(url, { comment }).then(
      (res) => {
        this.props.updateCreated(res.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  render(){
    const noMargin = { margin: 0 }
    return (
      <form className="row" style={ noMargin } onSubmit={ (e) => this.handleSubmit(e) }>
        <div className="input-field col s10">
          <input id="comment" type="text" placeholder="Write a comment"/>
        </div>
        <div className="input-field col s2">
          <button className="btn waves-effect waves-orange primary-color">comment</button>
        </div>
      </form>
    )
  }
}

export default CommentCreator
