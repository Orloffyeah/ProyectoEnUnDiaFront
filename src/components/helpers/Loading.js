import React from 'react'

const Loading = (props) => {
  const fixHeight = { height: (props.h) ? props.h : '100%' }
  return (
    <div className="loading-space" style={ fixHeight }>
      <div className="center-loading">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
