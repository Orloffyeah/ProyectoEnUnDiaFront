import React, { Component } from 'react'

// Assets
import { GET } from '../../js/requests'
import Loading from '../helpers/Loading'
import defaultAvatar from '../../assets/user.svg'

//Components
import { AreaChart, Area, PieChart, Pie, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      startDate: '20180101',
      endDate: '20180201',
      perDay: '1',
      currentDPicker: 'initDate',
      mostCommented: [],
      mostPlayed: [],
      userRegister: [],
      mails: [],
      genre: [],
      players: [],
      loading: true
    }
    this.changeDates = this.changeDates.bind(this)
    this.getMCommented = this.getMCommented.bind(this)
    this.getMPlayed = this.getMPlayed.bind(this)
    this.getUserRegister = this.getUserRegister.bind(this)
    this.getMails = this.getMails.bind(this)
    this.getGenre = this.getGenre.bind(this)
    this.getPlayers = this.getPlayers.bind(this)
  }

  componentDidMount(){
    this.getMCommented()
    this.getMPlayed()
    this.getUserRegister()
    this.getMails()
    this.getGenre()
    this.getPlayers()
    const $ = window.$
    document.title = 'Statistics'
    $(document).ready(function() {
        $('.datepicker').pickadate({
          selectMonths: true,
          selectYears: true
        })
    })
  }

  componentDidUpdate(){
    const $ = window.$
    $(document).ready(() => {
      const state = this
      $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: true,
        onOpen: function() {
          state.setState({currentDPicker: this.get('id')}) // Determinar cual DatePicker esta abierto
        },
        onSet: (context) => {
          this.changeDates(context)
        }
      })
    })
   }

  changeDates(context){
    const date = new Date(context.select)

    var month = date.getUTCMonth() + 1
    var day = date.getUTCDate()
    var year = date.getUTCFullYear()

    year = String(year)
    month = String(month)

    if(month < 10){
      month = '0'.concat(month)
    }else{
      month = String(month)
    }

    if(day < 10){
      day = '0'.concat(day)
    }else{
      day = String(day)
    }

    const stringDate = year + month + day

    if(this.state.currentDPicker === 'initDate'){
      this.setState({startDate: stringDate})
    }else{
      this.setState({endDate: stringDate})
    }

    this.getMails()
    this.getUserRegister()
  }

  getMCommented(){
    const routeCommented = '/statistics/thr_most_commented'
    GET(routeCommented).then(
      (res) => {
        this.setState({
          loading: false,
          mostCommented: res.data.slice(0, 11)
        })
      }
    )
  }

  getMPlayed(){
    const routeMails = '/statistics/gam_most_played'
    GET(routeMails).then(
      (res) => {
        this.setState({
          loading: false,
          mostPlayed: res.data
        })
      }
    )
  }

  getUserRegister(){
    const routeURegister = '/statistics/users_register_record?'.concat('start_date=' + this.state.startDate +
                                                          '&end_date=' + this.state.endDate +
                                                          '&per_day=' + this.state.perDay)
    GET(routeURegister).then(
      (res) => {
        this.setState({
          loading: false,
          userRegister: res.data
        })
      }
    )
  }

  getMails(){
    const routeMails = '/statistics/mails_sent_record?'.concat('start_date=' + this.state.startDate +
                                                          '&end_date=' + this.state.endDate +
                                                          '&per_day=' + this.state.perDay)
    GET(routeMails).then(
      (res) => {
        this.setState({
          loading: false,
          mails: res.data
        })
      }
    )
  }

  getGenre(){
    const routeGenre = '/statistics/genre_most_wanted'

    GET(routeGenre).then(
      (res) => {
        this.setState({
          loading: false,
          genre: res.data
        })
      }
    )
  }

  getPlayers(){
    const routePlayer = '/statistics/best_players'

    GET(routePlayer).then(
      (res) => {
        this.setState({
          loading: false,
          players: res.data
        })
      }
    )
  }

  render(){
    if(this.state.loading === false){
      const {mostCommented, mostPlayed, mails, genre, userRegister, players} = this.state
      var mostPlayedGames = mostPlayed.map(
        (game) => (
          <li key={ game.id } className="collection-item avatar valign-wrapper">
            <img src={ game.gam_image } alt={ game.gam_name } className="circle"/>
            <span className="title">{ game.gam_name }</span>
          </li>
        )
      )

      var bestPlayers = players.map(
        (player) => (
            <li key={ player.id } className="collection-item avatar valign-wrapper">
              <img src={ (player.pp_avatar.url) ? player.pp_avatar.url : defaultAvatar }
                   alt={ player.pp_username } className="circle"/>
              <span className="title">{ player.pp_username }</span>
            </li>
        )
      )

      return (
        <div className = "container" > <h3>Admin Stats</h3>
          <div className="section">
            <h5>Mails Sent</h5>
          </div>
          <div className="divider"></div>
          <form>
            <h6>Initial Date</h6>
            <input id="initDate" type="date" className="datepicker"/>
            <h6>Final Date</h6>
            <input id="lastDate" type="date" className="datepicker"/>
          </form>
          <AreaChart width={500} height={300} data={mails} margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5
            }}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Area type="monotone" dataKey="count" stroke="#8884D8" fill="#C1D5DA"/>
          </AreaChart>
          <div className="section">
            <h5>Most Commented Threads</h5>
          </div>
          <div className="divider"></div>
          <PieChart width={800} height={400}>
            <Pie isAnimationActive={false} data={mostCommented} nameKey="thr_name" dataKey="thr_comments" cx={350} cy={200} outerRadius={120} fill="#FF7043" label="label"/>
            <Tooltip/>
          </PieChart>
            <div className="section">
              <h5>Users Registered</h5>
            </div>
            <div className="divider"></div>
          <form>
            <h6>Initial Date</h6>
            <input id="initDate" type="date" className="datepicker"/>
            <h6>Final Date</h6>
            <input id="lastDate" type="date" className="datepicker"/>
          </form>
          <LineChart width={500} height={300} data={userRegister} margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5
            }}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="count" stroke="#8884D8" dot={false}/>
          </LineChart>
          <div className="section">
            <h5>Most Played Games</h5>
          </div>
          <div className="divider"></div>
          <ul className="collection">{mostPlayedGames}</ul>
          <div className="section">
            <h5>Most Wanted Genres</h5>
          </div>
          <div className="divider"></div>
          <BarChart width={500} height={250} data={genre}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="gen_name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="id" fill="#8884d8"/>
          </BarChart>
          <div className="section">
            <h5>Best Players</h5>
          </div>
          <div className="divider"></div>
          <ul className="collection">{bestPlayers}</ul>
        </div>
      )
    }
    else{
      return(<Loading />)
    }
  }
}

export default Stats
