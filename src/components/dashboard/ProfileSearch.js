import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import ProfileItem from './ProfileItem'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class ProfileSearch extends Component{

  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoaded: true,
      status: null,
      timeout: null
    }
    this.profiles = {}
  }

  handleChange(event){
    this.setState({
      isLoaded: null,
      items: []
    })
    const username = event.target.value
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: setTimeout(function () {
        GET_AUTH(`/usernames_like?username=${ username }&page=1`).then(
          (res) => {
            this.setState({
              isLoaded: true,
              items: res.data
            })
          }
        ).catch(
          (error) => {
            console.log(error)
            this.setState({
              isLoaded: false,
              status: (error.response) ? error.response.status : 0
            })
          }
        )
      }.bind(this), 1000)
    })
  }

  render(){
    const { items, isLoaded } = this.state
    const form = (
      <div className="row">
        <div className="input-field col s12 m8 offset-m2">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text"   placeholder="Search a player"
                 onChange={ (e) => this.handleChange(e) }/>
        </div>
      </div>
    )
    if(isLoaded){
      var profiles = items.map(
        (profile) => (<ProfileItem key={ profile.id } profile={ profile } />)
      )

      return(
        <div>
          { form }
          <div className="row">
            { profiles }
          </div>
        </div>
      )
    }else if(isLoaded == null){
      const $ = window.$
      return(
        <div>
          { form }
          <Loading h={ $(window).height()/2 } />
        </div>
      )
    }else{
      return(<ErrorManager status={ this.state.status } />)
    }
  }
}

export default ProfileSearch
