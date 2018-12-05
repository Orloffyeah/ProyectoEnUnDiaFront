import React from 'react'

const PlayerGameProfile = ({ game, pgp, own }) => {

  const { gam_name, gam_image } = game
  const { pgp_nickname, pgp_reputation } = pgp
  const noMargin = { margin: 0 }
  const button = (own) ? (
    <div className="col s12 m3 l3">
      <button className="btn-flat waves-effect waves-orange">
        edit
      </button>
    </div>
  ) : null
  return (
    <div className="card-panel" style={{ padding: 8 }}>
      <div className="row valign-wrapper" style={ noMargin }>
        <div className="col s4 m2 l2 valign-wrapper" style={{ padding: 0 }}>
          <img src={ gam_image } style={{ height: 140, objectFit: 'cover' }}
            alt="player_game_profile" className="responsive-img"/>
        </div>
        <div className="col s8 m10 l10">
          <div className="row" style={ noMargin }>
            <div className="col s12 m9 l9" style={{ lineHeight: 1.2 }}>
              <span style={{ fontSize: 18 }}>{ pgp_nickname }</span><br />
              <span>#tag1, #tag2, #tag3</span><br />
              <span className="grey-text">{ gam_name }</span><br />
              <span className="grey-text">{ pgp_reputation }</span>
            </div>
            { button }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerGameProfile
