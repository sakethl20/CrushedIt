import { render } from '@redwoodjs/testing/web'

import DateNavigation from './DateNavigation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DateNavigation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateNavigation />)
    }).not.toThrow()
  })
})
