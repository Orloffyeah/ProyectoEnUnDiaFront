import React from 'react'

const GameGallery = ({ screenshots }) => {

  const $ = window.$
  $(document).ready(function(){
    $('.carousel').carousel({ indicators: true})
    $('.materialboxed').materialbox()
  })

  var images = screenshots.map(
    (image) => (
      <a key={ image.id } className="carousel-item">
        <img src={ image.scr_url } alt="Screenshot"/>
      </a>
    )
  )

  return(
    <div className="carousel carousel-slider" style={{ marginBottom: 16 }}>
      { images }
    </div>
  )
}

export default GameGallery
