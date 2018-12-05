import React from 'react'

// Assets
import { dateTime } from '../../js/helpers'

const Thread = ({ item, onClick }) => {
  const { thr_name, created_at, thr_comments, thr_views } = item
  const noMargin = { margin: 0 }

  return (
    <div className="row valign-wrapper" style={ noMargin }>
      <div className="col s7">
        <p>
          <b><a href="#!" className="no-hover" onClick={ () => onClick() }>
            { thr_name }
          </a></b>
        </p>
      </div>
      <div className="col s2 center-align">
        <p>
          Views: { thr_views }<br/>
          Comments: { thr_comments }
        </p>
      </div>
      <div className="col s3 center-align">
        <p>{ dateTime(created_at) }</p>
      </div>
    </div>
  )
}

export default Thread
