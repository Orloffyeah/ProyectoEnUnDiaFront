import React from 'react'

const MailItem = ({ username, subject }) => {
  const noMargin = { margin: 0 }
  var mail_subject = (subject) ? subject : '(no subject)'
  return (
    <div className="row clickable" style={ noMargin }>
      <div className="col s12 m3 l2">
        <p className="trucate" style={ noMargin }>
          { username }
        </p>
      </div>
      <div className="col s12 m9 l10">
        <p className="trucate" style={ noMargin }>
          { mail_subject }
        </p>
      </div>
    </div>
  )
}

export default MailItem
