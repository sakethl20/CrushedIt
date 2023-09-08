import { render } from '@redwoodjs/testing/web'

import Taskview from './Taskview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Taskview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Taskview />)
    }).not.toThrow()
  })
})
