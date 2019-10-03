const dayjs = require('dayjs')

const scheduleHour = '08'
const scheduleMinute = '00'

const scheduleEndHour = '16'
const scheduleEndMinute = '00'

const estimatedTime = [35, 140, 33, 35, 140, 33, 35, 2140, 33]

let day = dayjs().day()
let firstIteration = true
const start = dayjs()
  .day(day)
  .hour(Number(scheduleHour))
  .minute(Number(scheduleMinute))
  .second(0)
  .millisecond(0)

const finish = dayjs()
  .day(day)
  .hour(Number(scheduleEndHour))
  .minute(Number(scheduleEndMinute))
  .second(0)
  .millisecond(0)

const diffSchedule = finish.diff(start, 'minute')
const estimated = estimatedTime.reduce((acc, current) => {
  const scheduleStart = firstIteration
    ? dayjs()
        .day(day)
        .hour(Number(scheduleHour))
        .minute(Number(scheduleMinute))
        .second(0)
        .millisecond(0)
    : acc[acc.length - 1].estimatedEnd

  const scheduleEnd = dayjs()
    .day(day)
    .hour(Number(scheduleEndHour))
    .minute(Number(scheduleEndMinute))
    .second(0)
    .millisecond(0)

  firstIteration = false

  const estimatedEnd = scheduleStart.add(current, 'minute')

  if (estimatedEnd >= scheduleEnd) {
    const estimated = {
      estimatedStart: scheduleStart,
      estimatedEnd: scheduleEnd
    }
    acc.push(estimated)
    day++

    let diff = estimatedEnd.diff(scheduleEnd, 'minutes')
    while (diff > diffSchedule) {
      const scheduleStart = dayjs()
        .day(day)
        .hour(Number(scheduleHour))
        .minute(Number(scheduleMinute))
        .second(0)
        .millisecond(0)

      const t = scheduleStart.add(diff, 'minute')
      const scheduleEnd = dayjs()
        .day(day)
        .hour(Number(scheduleEndHour))
        .minute(Number(scheduleEndMinute))
        .second(0)
        .millisecond(0)

      if (t >= scheduleEnd) {
        const estimatedWhile = {
          estimatedStart: scheduleStart,
          estimatedEnd: scheduleEnd
        }
        diff = t.diff(scheduleEnd, 'minute')
        acc.push(estimatedWhile)
      }
      day++
    }

    const scheduleStartC = dayjs()
      .day(day)
      .hour(Number(scheduleHour))
      .minute(Number(scheduleMinute))
      .second(0)
      .millisecond(0)
    const estimatedEndC = scheduleStartC.add(diff, 'minute')

    const estimatedEndCheck = {
      estimatedStart: scheduleStartC,
      estimatedEnd: estimatedEndC
    }
    acc.push(estimatedEndCheck)
    return acc
  }

  const estimated = {
    estimatedStart: scheduleStart,
    estimatedEnd
  }
  acc.push(estimated)
  return acc
}, [])

estimated.map(e => {
  console.log(e.estimatedStart.$d)
  console.log(e.estimatedEnd.$d)
  console.log('---------------')
})
