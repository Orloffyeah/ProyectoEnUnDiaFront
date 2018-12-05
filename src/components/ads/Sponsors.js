import React, { Component } from 'react'

class Sponsors  extends Component {

  render() {
    return (
      <div className="sponsorList">
        <div className="row center-align">
          {/* Fila vacia */}
        </div>
        <div className="row center-align">
          <h4>Proudly Sponsored By</h4>
        </div>
        <div className="row center-align">
          <a href='https://www.riotgames.com/en'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/riot-games-logo-black-and-white.png'} height="160" width="160"/></a>
          <a href='https://www.epicgames.com/site/en-US/home'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/epic-games-2-logo-png-transparent.png'} height="120" width="120"/></a>
          <a href='https://reactjs.org/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/react-logo-png-transparent.png'} height="120" width="120"/></a>
          <a href='https://www.xbox.com'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/xbox-2-logo-png-transparent.png'} height="240" width="240"/></a>
          <a href='https://slack.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-png-transparent.png'} height="180" width="180"/></a>
        </div>
        <div className="row center-align">
          <a href='https://www.rockstargames.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/rockstar-games-logo-png-transparent.png'} height="120" width="120"/></a>
          <a href='https://www.nintendo.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/nintendo-2-logo-png-transparent.png'} height="150" width="150"/></a>
          <a href='https://www.atari.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/atari-games-703-logo-png-transparent.png'} height="160" width="160"/></a>
          <a href='https://www.ubisoft.com/'><img className="responsive-img sponsor-img" alt="" src={'https://vignette.wikia.nocookie.net/logopedia/images/a/a0/Ubisoft_2017.svg/revision/latest?cb=20170622035823'} height="160" width="160"/></a>
        </div>
        <div className="center-align secondary-color-light-text">
          <h5>Want to become a sponsor? Contact Us Here</h5>
        </div>
      </div>
    )
  }
}

export default Sponsors