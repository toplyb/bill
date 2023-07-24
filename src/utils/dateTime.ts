// 获取当前时间
const getCurrentTime = () => {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${addZeroToLeft(hour)}:${addZeroToLeft(minute)}`
}

// 获取当前日期
const getCurrentDate = (isHaveDay = true) => {
  const date = new Date()
  return getDate(date, isHaveDay)
}

// 获取当前日期（可以返回 2023-08 或者 2023-08-01 两种格式）
const getDate = (date: Date, isHaveDay = true) => {
  const year = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()
  if (!isHaveDay) {
    return `${year}-${addZeroToLeft(month)}`
  }
  return `${year}-${addZeroToLeft(month)}-${addZeroToLeft(day)}`
}

// 获取当前日期时间
const getCurrentTimeAndDate = () => {
  const date = getCurrentDate()
  const time = getCurrentTime()
  return `${date} ${time}`
}

// 获取当前星期几
const getDay = () => {
  const date = new Date()
  const day = date.getDay()
  return day === 0 ? 7 : day
}

// 获取距离当前日期指定多少天的提起
const gleYourDate = (t: number, type: 'before' | 'after') => {
  const oneDayOfMS = 24 * 60 * 60 * 1000
  const current = getTimestamp()
  let result;
  if (type === 'before') {
    result = current - oneDayOfMS * t
  } else {
    result = current + oneDayOfMS * t
  }
  return getDate(new Date(result))
}

// 获取时间戳
const getTimestamp = (t?: string): number => {
  let date = new Date()
  if (t) {
    date = new Date(t)
  }
  return date.getTime()
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
  getCurrentTimeAndDate,
  addZeroToLeft,
  getDay,
  gleYourDate,
  getTimestamp
}
