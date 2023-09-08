import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    // client side validation
    let errorFlag = 0
    console.log(data)
    if (data.email.length == 0) {
      errorFlag = 1
      toast.error('Please enter an email address')
    }
    if (
      data.email.length > 0 &&
      !/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}/g.test(data.email)
    ) {
      errorFlag = 1
      toast.error('Please enter a valid email address')
    }
    if (data.password.length == 0) {
      errorFlag = 1
      toast.error('Please enter a password')
    }
    if (data.password.length >= 8 && data.confirmpassword.length == 0) {
      errorFlag = 1
      toast.error('Please confirm your password')
    }
    if (
      data.password.length > 0 &&
      data.confirmpassword.length > 0 &&
      data.password != data.confirmpassword
    ) {
      errorFlag = 1
      toast.error('Passwords do not match')
    }
    if (data.password.length > 0 && data.password.length < 8) {
      errorFlag = 1
      toast.error('Your password must be at least eight characters long')
    }
    if (data.password.length > 64) {
      errorFlag = 1
      toast.error('Your password must be at most sixty-four characters long')
    }
    if (/\s/g.test(data.password)) {
      errorFlag = 1
      toast.error('Your password must not contain spaces')
    }
    // if (/\s/g.test(data.email)) {
    //   errorFlag = 1
    //   toast.error('Your username must not contain spaces')
    // }

    if (errorFlag == 0) {
      const response = await signUp({
        username: data.email,
        password: data.password,
      })

      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      }
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={emailRef}
                  />

                  <FieldError name="email" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                  />

                  <FieldError name="password" className="rw-field-error" />

                  <Label
                    name="confirmpassword"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Confirm Password
                  </Label>
                  <PasswordField
                    name="confirmpassword"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                  />

                  <FieldError
                    name="confirmpassword"
                    className="rw-field-error"
                  />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
