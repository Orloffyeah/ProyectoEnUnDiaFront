import React from 'react'

// Assets
import { dateTime } from '../../js/helpers'

const Forum = ({ item, onClick }) => {
  const { sf_name, sf_description, created_at } = item
  const noMargin = { margin: 0 }
  return (
    <div className="row" style={ noMargin }>
      <div className="col s12 m7 l7">
        <p>
          <b><a href="#!" className="no-hover" onClick={ () => onClick() }>
            { sf_name }
          </a></b><br/>
          { sf_description }
        </p>
      </div>
      <div className="col s12 m2 l2 center-align">
        {/* <p>Hay daticos</p> */}
      </div>
      <div className="col s12 m3 l3 center-align">
        <p>{ dateTime(created_at) }</p>
      </div>
    </div>
  )
}

export default Forum
