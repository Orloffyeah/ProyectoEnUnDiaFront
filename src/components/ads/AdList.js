import React, { Component } from 'react'

// Components
import Loading from '../helpers/Loading'
import AdItem from './AdItem'
import ErrorManager from '../helpers/ErrorManager'
import { GET_AUTH } from '../../js/requests'

class AdList extends Component {

  constructor(props) {
    super(props)
    this.random = 0
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  componentDidMount() {
    GET_AUTH('/sponsors').then(
      (res) => {
        this.random = Math.floor((Math.random() * 10) + 1) - 1 //Escoger un sponsor aleatoriamente para mostrar
        console.log(res.data[this.random].ads)
        this.setState({
          items: res.data[this.random].ads,
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
  }

  render() {
    const { items, isLoaded } = this.state
    // Placeholder Ads
    /*const items = [{id: '1', desc: 'This is an Ad from Xbox', link: 'https://www.xbox.com',img: 'http://www.cheatsheet.com/wp-content/uploads/2013/05/xbox-one-microsoft.jpg'},
                   {id: '2', desc: 'This is an Ad from Fortnite', link: 'https://www.epicgames.com/site/en-US/home', img: 'https://thumbs.videogamer.com/fH09jQHW_zyR01c_a8kJizWlnno=/700x393/smart/https://s.videogamer.com/meta/b6ed/bbed5eb5-1f83-489c-9dea-473821aef72d_e91b7a57-5df4-4f41-ad58-1cd9f3631871_unnamed.jpg'},
                   {id: '3', desc: 'This is an Ad from Nintendo', link: 'https://www.nintendo.com/', img: 'https://media.nintendo.com/nintendo/bin/ycRDJrY9OQ-fk2OnJlUtcV4GMvWdP46p/29GPN-DAj4sxjSWgMtCEuqrYV9ZPu9Md.jpg'}]*/
    var list
    if (isLoaded) {
      list = items.map((item) => (<li className="row" key={ item.id }><AdItem item={ item } sponsor_id={ this.random }/></li>))
      return (<ul>{ list }</ul>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default AdList
