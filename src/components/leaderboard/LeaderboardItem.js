import React from 'react'

const LeaderboardItem = ({ player, index }) => {

  return (
    <div>
      <div className="row">
        <div className="vertical-center center-align col s1">
          <h4>{index}</h4>
        </div>
        <div className="col s2">
          <img className="circle responsive-img" alt="" src={player.avatar}height="120" width="120"/>
        </div>
        <div className="col s3">
          <h4 className="leftText">{player.user}</h4>
          <h4 className="leftText">Score: {player.elo}</h4>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardItem
