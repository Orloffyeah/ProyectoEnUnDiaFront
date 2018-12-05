import React from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

const LockedProfile = ({ profile, unblock }) => {
  const { pp_avatar, pp_username, id } = profile
  const noMargin = { margin: 0 }
  return (
    <div className="card-panel" style={{ padding: 8 }}>
      <div className="row valign-wrapper" style={ noMargin }>
        <div className="col s4 m2 l2 valign-wrapper">
          <img src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }
            alt="Blocked player" className="responsive-img"/>
        </div>
        <div className="col s8 m10 l10">
          <div className="row" style={ noMargin }>
            <div className="col s12 m8 l8 valign-wrapper" style={{ height: 36 }}>
              <span style={{ fontSize: 18 }} className="truncate">{ pp_username }</span>
            </div>
            <div className="col s12 m4 l4">
              <button className="btn-flat waves-effect waves-orange"
                onClick={ (e) => unblock(e, id) }>
                  unblock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockedProfile
