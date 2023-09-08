import { Box } from '@chakra-ui/react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const MonthlyCalendar = () => {
  //stole prop events from AppointmentList.js; this will eventually be changed
  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 3, 21, 10, 0),
      end: new Date(2023, 3, 21, 11, 0),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 3, 22, 12, 0),
      end: new Date(2023, 3, 22, 13, 0),
    },
    {
      id: 3,
      title: 'Event 3',
      start: new Date(2023, 3, 21, 14, 0),
      end: new Date(2023, 3, 21, 15, 0),
    },
  ]
  return (
    <Box m={50}>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh' }}
          views={['month']}
        />
      </div>
    </Box>
  )
}

export default MonthlyCalendar
