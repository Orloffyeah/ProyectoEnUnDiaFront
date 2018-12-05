import React from 'react'

const AdItem = ({ item, sponsor_id }) => {

  function importAll(r) {
    let images = {}
    r.keys().forEach( item => { images[item.replace('./', '')] = r(item) })
    return images
  }

  const images = importAll(require.context('../../assets/default_sponsors', false, /\.(png|jpe?g|svg)$/))
  const defaultImg = String(sponsor_id).concat('.png')

  var image = null
  if(item.ad_image.url === null){
    image = images[defaultImg]
  }else{
    image = item.ad_image.url
  }

  console.log(images[defaultImg])

  return (
    <div>
        <div className="card horizontal">
          <div className="card-image">
            <img src={image} alt='' height="100" width="100"/>
          </div>
          <div className="card-stacked">
            <div className="card-content paddedAd">
              <p>{item.ad_description}</p>
            </div>
            <div className="card-action">
              <a href={item.ad_link}>More info</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdItem
