import { render } from '@redwoodjs/testing/web'

import VerificationSignUpPage from './VerificationSignUpPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VerificationSignUpPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VerificationSignUpPage />)
    }).not.toThrow()
  })
})
