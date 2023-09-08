import { render } from '@redwoodjs/testing/web'

import AddTask from './AddTask'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddTask', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTask />)
    }).not.toThrow()
  })
})
