import { render } from '@redwoodjs/testing/web'

import AppointmentList from './AppointmentList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppointmentList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppointmentList />)
    }).not.toThrow()
  })
})
