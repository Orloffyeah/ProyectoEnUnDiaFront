import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Settings from './Settings'
import Loading from '../helpers/Loading'
import PlayerProfile from './PlayerProfile'
import ErrorManager from '../helpers/ErrorManager'

class Profile extends Component {

  constructor(props) {
    super(props)
    this.PROFILE = 0
    this.SETTINGS = 1
    this.pLoaded = false
    this.rLoaded = false
    this.relationsLists = null
    this.locked = false
    this.curProfile = null
    this.state = {
      view: this.setView(),
      profile: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){
    this.requests()
    if (this.setView() === this.PROFILE) {
      const { match: { params: { param } } } = this.props
      this.curProfile = param
    }
  }

  componentDidUpdate(){
    if (this.setView() === this.PROFILE) {
      const { match: { params: { param } } } = this.props
      if (this.curProfile !== param){
        this.curProfile = param
        this.requests()
      }
    }
  }

  checkLocks(){
    const { match: { params: { param } } } = this.props
    const userId = (param === 'settings') ? null : param
    const ownId = sessionStorage.getItem('userId')
    if(this.rLoaded){
      const { current: { c_locks }, player: { p_locks } } = this.relationsLists
      return p_locks.includes(parseInt(ownId,10)) || c_locks.includes(parseInt(userId,10))
    }
    return false
  }

  setView(){
    const { match: { params: { param } } } = this.props
    if (param === 'settings') {
      return this.SETTINGS
    } else {
      var numbers = '0123456789'
      for (let i = 0; i < param.length; i++) {
        if (!numbers.includes(param[i])){
          return null
        }
      }
      return this.PROFILE
    }
  }

  requests(){
    const { match: { params: { param } } } = this.props
    const settings = param === 'settings'
    const userId = (settings) ? sessionStorage.getItem('userId') : param
    const own = settings || sessionStorage.getItem('userId') === param
    this.pLoaded = false
    this.rLoaded = false
    this.relationsLists = null

    GET_AUTH(`/player_profiles/${userId}`).then(
      res => {
        this.pLoaded = true
        this.setState({
          profile: res.data,
          isLoaded: (own) ? this.pLoaded : this.pLoaded && this.rLoaded
        })
      }
    ).catch(
      error => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )

    if(!own){
      GET_AUTH(`/relation_status/${userId}`).then(
        (res) => {
          this.rLoaded = true
          this.relationsLists = res.data
          this.locked = this.checkLocks()
          this.setState({
            isLoaded: this.pLoaded && this.rLoaded
          })
        }
      ).catch(
        error => {
          this.setState({
            isLoaded: false,
            status: (error.response) ? error.response.status : 0
          })
        }
      )
    }
  }

  changeView = (event) => {
    event.preventDefault()
    this.setState({ view: this.SETTINGS })
  }

  get_data = (data) => {
    this.rLoaded = true
    this.relationsLists = data
    const cl = this.checkLocks()
    this.setState({ locked: cl })
  }

  render(){
    const { isLoaded, profile } = this.state
    if(isLoaded){
      const { match: { params: { param } } } = this.props

      if(param !== 'settings' && param !== this.curProfile){
        return (
          <main style={{ height: 'calc(100% - 110px)' }}>
            <Loading />
          </main>
        )
      }

      const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
      const own = (param === 'settings') ? false : sessionStorage.getItem('userId') === param
      var content = null
      const view = this.setView()

      if(view === this.SETTINGS) {

        content = (<Settings profile={ profile } />)

      } else if (view === this.PROFILE) {
        content = (<PlayerProfile key={ profile.id} profile={ profile } own={ own }
          relationsLists={ this.relationsLists } get_data={ this.get_data } />)

      } else {
        return (<ErrorManager status={ 404 } />)
      }

      return (
        <main style={ fixHeight }>
          { content }
        </main>
      )

    }else if(isLoaded == null){
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <Loading />
        </main>
      )
    }else{
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <ErrorManager status={ this.state.status } />
        </main>
      )
    }
  }
}

export default Profile
