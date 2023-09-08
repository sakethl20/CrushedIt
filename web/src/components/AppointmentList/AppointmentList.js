import React from 'react'
import { useContext } from 'react'

import { Box } from '@chakra-ui/react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { DateContext } from 'src/hooks/selectedDateContext'
const localizer = momentLocalizer(moment)
const AppointmentList = () => {
  const pickedDate = useContext(DateContext)
  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 2, 21, 10, 0),
      end: new Date(2023, 2, 21, 11, 0),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 2, 22, 12, 0),
      end: new Date(2023, 2, 22, 13, 0),
    },
    {
      id: 3,
      title: 'Event 3',
      start: new Date(2023, 2, 21, 14, 0),
      end: new Date(2023, 2, 21, 15, 0),
    },
  ]

  const today = new Date()
  const minTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    6,
    0,
    0
  )
  const maxTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    21,
    0,
    0
  )

  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="day"
        views={['day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        step={15} // set step to 30 minutes
        min={minTime} // set minimum time to 6am
        max={maxTime} // set maximum time to 8pm
        nowIndicator={true}
        date={pickedDate}
        toolbar={false} //false to hide navigation
        //else, it would be shown and duplicated (the arrows/buttons)
      />
    </Box>
  )
}

export default AppointmentList
