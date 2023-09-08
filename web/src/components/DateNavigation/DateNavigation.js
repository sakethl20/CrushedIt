import React, { useState } from 'react'

import { ChevronLeftIcon } from '@chakra-ui/icons'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton, Button, Box } from '@chakra-ui/react'
// import 'react-modern-calendar-datepicker/lib/Datepicker.css'
import DatePicker from 'react-datepicker'

function PreviousDate(date) {
  const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  return yesterday
}

function NextDate(date) {
  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  return tomorrow
}

const DateNavigation = () => {
  const [pickedDate, setPickedDate] = useState(new Date())
  //instantiates pickedDate and setPickedDate so that It starts at today and can be updated

  const handlePreviousClick = () => {
    setPickedDate((prevDate) => PreviousDate(new Date(prevDate)))
  }

  const handleTodayClick = () => {
    setPickedDate(new Date())
  }
  const handleNextClick = () => {
    setPickedDate((nextDate) => NextDate(new Date(nextDate)))
  }

  return (
    <Box>
      <Button variant="link" onClick={handleTodayClick}>
        Today
      </Button>
      &nbsp;
      <IconButton
        variant="link"
        colorScheme="teal"
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        onClick={handlePreviousClick}
      ></IconButton>
      &nbsp;
      <IconButton
        variant="link"
        colorScheme="teal"
        aria-label="Next"
        icon={<ChevronRightIcon />}
        onClick={handleNextClick}
      ></IconButton>
      &nbsp;
      <DatePicker
        selected={pickedDate}
        onChange={(date) => setPickedDate(date)}
      />
    </Box>
  )
}

export default DateNavigation
