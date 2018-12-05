import React from 'react'

// Assets
import Sponsors from '../ads/Sponsors'
import collabimg from '../../assets/collaboration.jpg'
import angryimg from '../../assets/angry2.jpg'
import platimg from '../../assets/plataforms.jpeg'
import forumimg from '../../assets/forums.jpg'
import lolimg from '../../assets/lol.jpeg'
import fortimg from '../../assets/fortnite.jpeg'
import mineimg from '../../assets/minecraft.jpg'

const Home = (props) => {

  return (
    <main style={{ height: 'auto', zIndex: -1 }}>
      <div className="row">
        <div className="col s12 m6 l6 white l-panel flow-text">
          <h3>Smart Pairing</h3>
          <p className="flow-text" >Losing because of your teammates is a thing of the past.
            Match your playstyles, meet people with similar preferences and
            expand your group.
          </p>
        </div>
        <div className="col s12 m6 l6 white l-img valign-wrapper">
          <img className="responsive-img" src={ collabimg } alt=""/>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l6 l-img valign-wrapper" >
          <img className="responsive-img" src={ angryimg } alt="" style={{'paddingLeft':150}}/>
        </div>
        <div className="col s12 m6 l6 l-panel" >
          <h4>Pairing</h4>
          <p className="flow-text" >With advanced algorithms, finding optimal companions allows you to
            enhance your gaming sessions. Long gone is the hastle of communicating
            with annoying players from around the world. Skip past the trouble and
            jump straight into action.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l6 white l-panel" >
          <h4>A world of games</h4>
          <p className="flow-text">Choose a genre, pick a franchise, whatever you like: finding the game
            you want to play is that simple. Our broad range of supported games
            give you the option to find teammates wherever you want.
          </p>
        </div>
        <div className="col s12 m6 l6 white l-img valign-wrapper" >
          <img width="30%" src={ lolimg } alt="" style={{'paddingLeft':60}}/>
          <img width="30%" src={ fortimg } alt="" style={{'paddingLeft':10}}/>
          <img width="30%" src={ mineimg } alt="" style={{'paddingLeft':10}}/>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l6 l-img valign-wrapper" >
          <img className="responsive-img" src={ platimg } alt="" style={{'paddingLeft':40}}/>
        </div>
        <div className="col s12 m6 l6 l-panel" >
          <h4>Gather your friends</h4>
          <p className="flow-text">Tired of managing friends in different platforms?
            SPairing functions as a hub connecting you with everyone you meet.
            Regardless of game or platform, contact your teammates to start a
            new adventure.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6 l6 white l-panel" >
          <h4>Never alone</h4>
          <p className="flow-text">Find all the information you need in forums
            for every game. Ask whatever comes to mind and get the help from players
            from all around the world.
          </p>
        </div>
        <div className="col s12 m6 l6 white l-img valign-wrapper" >
          <img className="responsive-img" src={ forumimg } alt=""/>
        </div>
      </div>
      <Sponsors/>
    </main>
  )
}

export default Home
