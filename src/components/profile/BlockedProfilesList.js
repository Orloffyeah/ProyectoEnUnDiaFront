import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import BlockedProfile from './BlockedProfile'

class BlockedProfilesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: props.blocked
    }
  }

  handleClick = (event, id) => {
    GET_AUTH(`/unblock_player/${id}`).then(
      res => {
        this.updateList(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  updateList(data){
    const { items } = this.state
    const updated = items.filter( blocked => blocked.id !== data.id )
    this.setState({ items: updated })
  }

  render(){
    const { items } = this.state

    if(items.length === 0){
      return (<h4 className="center-align">You don't have blocked players</h4>)
    }
    const blocked = items.map(
      profile => (<BlockedProfile key={ profile.id } profile={ profile }
        unblock={ this.handleClick }/>)
    )
    return (
      <div className="row">
        <div className="col s12">
          { blocked }
        </div>
      </div>
    )
  }
}

export default BlockedProfilesList
