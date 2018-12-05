import React from 'react'

// Assets
import { noImage } from '../../js/assets'

// Components
import { Link } from 'react-router-dom'

const GameItem = ({ game }) => {
  const { id, gam_name, gam_image } = game
  const gam_img = (gam_image) ? gam_image : noImage

  return (
    <div className="col s12 m4 l3">
      <Link to={`/game/${id}`} className="no-hover">
        <div className="card hoverable" style={{ maxWidth: 250 }}>
          <div className="card-image">
            <img src={ gam_img } style={{ height: 350 }} alt={ gam_name }/>
            <span className="truncate activator card-title">{ gam_name }</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GameItem
