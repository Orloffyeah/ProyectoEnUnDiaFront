import React, { Component } from 'react'

class NotFound extends Component {

  componentDidMount(){
    document.title = 'Page not found'
  }

  render(){
    return (
      <div className="center-align" style={{ height: '100%' }}>
        <h1 className="big-title">404</h1>
        <h2>Not Found</h2>
      </div>
    )
  }
}

export default NotFound
