import React, { Component } from 'react'

// Assets
import { POST_AUTH } from '../../js/requests'

class ThreadCreator extends Component {

  componentDidMount(){
    const $ = window.$
    $(document).ready(function(){
      $('.modal').modal()
    })
  }

  commentRequest(url, threadId){
    const comment = {
      com_comment: document.getElementById('body').value,
      thread_forum_id: threadId,
      player_profile_id: sessionStorage.getItem('userId')
    }
    POST_AUTH(url + `/${threadId}/comments`, { comment }).then(
      (res) => {
        console.log(res.data);
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  handleSubmit(event){
    event.preventDefault()
    const { url, subForumId } = this.props
    const thread_forum = {
      thr_name: document.getElementById('title').value,
      sub_forum_id: subForumId,
      thr_comments: 0,
      thr_views: 0
    }

    POST_AUTH(url, { thread_forum }).then(
      (res) => {
        this.props.updateCreated(res.data)
        this.commentRequest(url, res.data.id)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  render(){
    return (
      <div>
        <a className="waves-effect waves-orange btn modal-trigger primary-color" href="#modal1">
          Create a Thread
        </a>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Create a Thread</h4>
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="Title" id="title" type="text" />
              </div>
              <div className="input-field col s12">
                <textarea id="body" className="materialize-textarea"
                  placeholder="Enter the content of your thread"/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-orange
               btn-flat" onClick={ (e) => this.handleSubmit(e) }>
              POST
            </a>
            <a className="modal-action modal-close waves-effect waves-orange
               btn-flat">
              CANCEL
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ThreadCreator
