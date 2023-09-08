import { useEffect, useState } from 'react'

import { Box, Flex, Heading, Spacer, Text, Center } from '@chakra-ui/react'
import { PrismaClient, Prisma } from '@prisma/client'

import { Form, TextField, Submit, SelectField } from '@redwoodjs/forms'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const UPDATE_USER = gql`
  mutation UpdateUserMutation(
    $id: Int!
    $firstName: String
    $lastName: String
    $themeLight: Boolean
  ) {
    updateUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        themeLight: $themeLight
      }
      id: $id
    ) {
      lastName
      firstName
      themeLight
    }
  }
`

export default function UserCellChangePass(fetchedData) {
  const [userData, setUserData] = useState(null)
  const [currpass, setCurrPass] = useState('') // ? not sure what this is
  const [password, setPassword] = useState('')
  const [confpassword, setConf] = useState('')

  // const prisma = new PrismaClient()

  const {
    isAuthenticated,
    logIn,
    validateResetToken,
    getToken,
    resetPassword,
    reauthenticate,
    forgotPassword,
    logOut,
  } = useAuth()

  const [enabled, setEnabled] = useState(true)

  const [create] = useMutation(UPDATE_USER)

  useEffect(() => {
    setUserData(fetchedData.fetchedData)
  }, [fetchedData])

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfChange = (event) => {
    setConf(event.target.value)
  }

  const handleCurrChange = (event) => {
    setCurrPass(event.target.value)
  }

  const checkPassword = async () => {
    if (!currpass || currpass.length < 8 || /\s/.test(currpass)) {
      toast.error('Please enter your correct current password', {
        classes: 'rw-toast-error',
      })
      return false
    }

    //checking that currpass is correct

    const response = await logIn({
      username: userData['email'],
      password: currpass,
    })

    if (response.message) {
      toast.error('Please enter your correct current password', {
        classes: 'rw-toast-error',
      })
      return false
    } else if (response.error) {
      toast.error('Please enter your correct current password', {
        classes: 'rw-toast-error',
      })
      return false
    }

    //checking that new password fits the guidelines
    if (!password) {
      toast.error('Please enter a new password', { classes: 'rw-toast-error' })
      return false
    } else if (password.length < 8) {
      toast.error('Your new password must be at least eight characters long', {
        classes: 'rw-toast-error',
      })
      return false
    } else if (/\s/.test(password)) {
      toast.error('Your new password must not contain spaces', {
        classes: 'rw-toast-error',
      })
      return false
    } else if (currpass == password) {
      toast.error('Please Enter a Different Password', {
        classes: 'rw-toast-error',
      })
      return false
    } else if (!confpassword) {
      toast.error('Please confirm your new password', {
        classes: 'rw-toast-error',
      })
      return false
    } else if (password != confpassword) {
      toast.error('New Passwords do not Match!', { classes: 'rw-toast-error' })
      return false
    }
    return true
  }

  const generateResetToken = async () => {
    const response = await forgotPassword(userData['email'])
    if (response.error) {
      toast.error(response.error)
    }
  }

  const validateToken = async (resetToken) => {
    const response = await validateResetToken(resetToken)
    if (response.error) {
      setEnabled(false)
      toast.error(response.error)
    } else {
      setEnabled(true)
    }
  }

  const handleChange = async () => {
    try {
      if (checkPassword()) {
        await generateResetToken()
        const resetToken = getToken()
        await validateToken(resetToken)
        const response = await resetPassword({
          resetToken,
          password: password,
        })

        if (response.error) {
          toast.error(response.error)
        } else {
          toast.success('Password changed!')
          logOut({ username: userData['email'] })
          navigate(routes.login())
        }
      } else {
        return
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    userData != null && (
      <>
        <Toaster />
        <main className="rw-main">
          <div className="rw-scaffold rw-login-containerlogin">
            <div
              className="rw-segment"
              style={{
                width: '40%',
                margin: '0 auto',
                backgroundColor: '#f8fafc',
              }}
            >
              <Form style={{ margin: '5.5%' }}>
                <label className="rw-label" htmlFor="currpass">
                  Current Password
                </label>
                <TextField
                  className="rw-input"
                  name="currpass"
                  onChange={handleCurrChange}
                />
                <Spacer />

                <label className="rw-label" htmlFor="newpass">
                  New Password
                </label>
                <TextField
                  className="rw-input"
                  name="newpass"
                  onChange={handlePasswordChange}
                />
                <Spacer />

                <label className="rw-label" htmlFor="newpassconf">
                  Confirm New Password
                </label>
                <TextField
                  className="rw-input"
                  name="newpassconf"
                  onChange={handleConfChange}
                />
                <div className="rw-button-group">
                  <button
                    className="rw-button rw-button-blue"
                    onClick={handleChange}
                  >
                    Change Passwords!
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </main>
      </>
    )
  )
}
