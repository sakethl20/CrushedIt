import { render } from '@redwoodjs/testing/web'

import MonthlyCalendar from './MonthlyCalendar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MonthlyCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonthlyCalendar />)
    }).not.toThrow()
  })
})
