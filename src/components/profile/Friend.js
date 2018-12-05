import React from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

const Friend = ({ friend, own }) => {
  const { pp_username, email, pp_avatar } = friend
  const noMargin = { margin: 0 }
  const button = (own) ? (
    <div className="col s12 m3 l3">
      <button className="btn-flat waves-effect waves-orange">
        remove
      </button>
    </div>
  ) : null
  return (
    <div className="card-panel" style={{ padding: 8 }}>
      <div className="row valign-wrapper" style={ noMargin }>
        <div className="col s4 m3 l3 valign-wrapper" style={{ padding: 0 }}>
          <img src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }
            style={{ height: 140, objectFit: 'cover' }}
            alt="player_game_profile" className="responsive-img"/>
        </div>
        <div className="col s8 m9 l9">
          <div className="row" style={ noMargin }>
            <div className="col s12 m9 l9" style={{ lineHeight: 1.2 }}>
                <span style={{ fontSize: 18 }}>{ pp_username }</span><br />
                <span className="trucante grey-text">{ email }</span><br />
            </div>
            { button }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friend
