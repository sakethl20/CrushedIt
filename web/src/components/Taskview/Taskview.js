import React, { useState, useEffect, useContext } from 'react'

import { Box, Button, Flex, Text } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker.css'

import { DateContext, validateDate } from '../../hooks/selectedDateContext'
import AppointmentList from '../AppointmentList/AppointmentList'
import List from '../List/List'

function PreviousDate(date) {
  const yesterday = new Date(date - 24 * 60 * 60 * 1000)
  return yesterday
}

function NextDate(date) {
  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  return tomorrow
}

const Taskview = () => {
  let today = new Date()

  const [pickedDate, setPickedDate] = useState(today)

  const contextDate = useContext(DateContext)

  useEffect(() => {
    if (!contextDate) {
      setPickedDate(new Date())
    } else {
      setPickedDate(new Date(contextDate))
    }
  }, [contextDate])

  const handlePreviousClick = () => {
    setPickedDate((prevDate) => PreviousDate(new Date(prevDate)))
  }
  const handleNextClick = () => {
    setPickedDate((nextDate) => NextDate(new Date(nextDate)))
  }
  const handleTodayClick = () => {
    setPickedDate(today)
  }
  const validatedDate = validateDate(pickedDate)
  return (
    <DateContext.Provider value={validatedDate}>
      <Box>
        <Flex>
          <Button id="today_date" onClick={handleTodayClick}>
            Today
          </Button>
          &nbsp;
          <Button id="previous" onClick={handlePreviousClick}>
            &lt;
          </Button>
          &nbsp;
          <Button id="next" onClick={handleNextClick}>
            &gt;
          </Button>
          &nbsp;
          <Button>
            <DatePicker
              selected={pickedDate}
              onChange={(date) => setPickedDate(date)}
            />
          </Button>
        </Flex>
        <Flex justify="center" align="center" p={4} mr={1}>
          <Flex justify="center">
            <Box w="500px" p={4} mr={1} bg="gray.100">
              <Text fontSize="4xl" mt={4}>
                Tasks
              </Text>
              <List date={pickedDate}></List>
            </Box>
            <Box w="800px" p={4} mr={4} bg="gray.100">
              <Text fontSize="4xl" mt={4}>
                Appointments
              </Text>

              <AppointmentList></AppointmentList>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </DateContext.Provider>
  )
}

export default Taskview
