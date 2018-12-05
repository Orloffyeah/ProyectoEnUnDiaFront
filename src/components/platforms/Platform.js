import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import PlatformItem from './PlatformItem'
import ErrorManager from '../helpers/ErrorManager'

class Platform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  initCollapsible(){
    const $ = window.$
    $(document).ready(function() {
      $('.collapsible').collapsible()
    })
  }

  componentDidMount() {
    document.title = 'Platforms'
    GET_AUTH('/platforms').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
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
    this.initCollapsible()
  }

  componentDidUpdate() {
    this.initCollapsible()
  }

  render() {
    const { items, isLoaded } = this.state
    var list
    if (isLoaded) {
      list = items.map((item) => (<li key={ item.id }><PlatformItem item={ item }/></li>))
      return (<ul className="collapsible">{ list }</ul>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Platform
