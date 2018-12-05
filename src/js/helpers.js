const dateTime = (ISOString) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const auxDate = new Date(ISOString), nowDate = new Date()
  const isInTheWeek =(nowDate.getTime() - auxDate.getTime()) <= 604800000
  var date = (isInTheWeek) ?
  `${days[auxDate.getDay()]}, ${auxDate.toLocaleTimeString()}` :
   auxDate.toDateString()

  return date
}

export { dateTime }
