const getCurrentTime = () => {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${addZeroToLeft(hour)}:${addZeroToLeft(minute)}:${addZeroToLeft(second)}`
}


const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()
  console.log(addZeroToLeft(month), 'addZeroToLeft(month)')
  return `${year}-${addZeroToLeft(month)}-${addZeroToLeft(day)}`
}

const getCurrentTimeAndDate = () => {
  const date = getCurrentDate()
  const time = getCurrentTime()
  return `${date} ${time}`
}

const addZeroToLeft = (data: string | number) => {
  if (data.toString().length === 1) {
    return '0' + data
  }
  return data
}

export {
  getCurrentDate,
  getCurrentTime,
  getCurrentTimeAndDate
}
