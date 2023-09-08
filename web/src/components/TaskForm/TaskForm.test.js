import { render } from '@redwoodjs/testing/web'

import TaskForm from './TaskForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskForm />)
    }).not.toThrow()
  })
})
