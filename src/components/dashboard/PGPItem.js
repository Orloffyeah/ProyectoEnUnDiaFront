import React from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

// Components
import { Link } from 'react-router-dom'

const PGPItem = ({ pgp }) => {
  const { player_profile : { id, pp_avatar }, pgp_nickname } = pgp
  return (
    <div className="col s12 m3 l3">
      <Link to={ `/profile/${id}` }>
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" alt={ pgp_nickname }
              src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar } />
            <span className="card-title truncate">{ pgp_nickname }</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PGPItem
