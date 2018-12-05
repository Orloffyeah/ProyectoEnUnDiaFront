import React from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

// Components
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile }) => {

  const { id, pp_username, pp_avatar } = profile

  return (
    <div className="col s12 m3 l3">
      <Link to={ `/profile/${id}` }>
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" alt={ pp_username }
              src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }/>
            <span className="card-title truncate">{ pp_username }</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProfileItem
