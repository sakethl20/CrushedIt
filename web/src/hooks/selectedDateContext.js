// Use this file to supply a context hook that stores the global date variable

import { createContext } from 'react'

import moment from 'moment'

const DateContext = createContext()

const validateDate = (date) => {
  let finalDate
  if (date && moment(date, 'YYYY-MM-DD', true).isValid()) {
    finalDate = moment(date).format('YYYY-MM-DD')
  } else {
    finalDate = moment().format()
  }
  return finalDate
}

export { DateContext, validateDate }
