import { format, isToday, isTomorrow, parseISO, toDate } from 'date-fns'

const formatTime = (val) => {
  if (!val) {
    return
  }
  let formattedDate = format(toDate(parseISO(val)), 'HH:mm')
  return formattedDate
}
export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const getFormattedSchedule = (items) => {
  return items.reduce((acc, item) => {

    const progDate = new Date(item.start)
    progDate.setHours(0, 0, 0, 0);
    const progDateISO = progDate.toISOString();

    const calendarDay = acc.find(sched => {
      return sched.date === progDateISO
    });

    let label;
    if (isToday(progDate)) {
      label = 'Today'
    } else if (isTomorrow(progDate)) {
      label = 'Tomorrow'
    } else {
      label = format(progDate, 'EEEE')
    };

    const programme = {
      onAir: false,
      time: {
        from: formatTime(item.start, 'HH:mm'),
        to: formatTime(item.end, 'HH:mm'),
      },
      name: item.title,
      _id: getRandomInt(34623, 346346),
      img: false
    }

    if (!calendarDay) acc.push({ date: progDateISO, label, _id: getRandomInt(54123, 98465), schedule: [programme] })
    else calendarDay.schedule.push(programme)
    return acc

  }, [])
}
