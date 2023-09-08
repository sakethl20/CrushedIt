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

export default function UserCellForm(fetchedData) {
  const [userData, setUserData] = useState(null)
  const [currpass, setCurrPass] = useState('') // ? not sure what this is
  const [password, setPassword] = useState('')
  const [confpassword, setConf] = useState('')

  // const prisma = new PrismaClient()

  const [enabled, setEnabled] = useState(true)

  const [create] = useMutation(UPDATE_USER)

  useEffect(() => {
    setUserData(fetchedData.fetchedData)
  }, [fetchedData])

  const onSubmit = async (data) => {
    //console.log({ fetchedData })
    create({
      variables: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        themeLight: userData['themeLight'] == 'true' ? true : false,
      },
    })
    toast.success('Changes submitted!')
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
              <Form onSubmit={onSubmit} style={{ margin: '4%' }}>
                <Box p={4}>
                  <div display="inline">
                    <label htmlFor="firstname" className="rw-label">
                      First Name
                    </label>
                    <Spacer width="12px" />
                    <TextField
                      className="rw-input"
                      name="firstname"
                      onChange={(e) => {
                        setUserData({ ...userData, firstName: e.target.value })
                      }}
                      value={userData['firstName'] ?? ''}
                    />
                  </div>
                  <label htmlFor="lastname" className="rw-label">
                    Last Name
                  </label>
                  <Spacer width="12px" />
                  <TextField
                    className="rw-input"
                    name="lastname"
                    onChange={(e) => {
                      setUserData({ ...userData, lastName: e.target.value })
                    }}
                    value={userData['lastName'] ?? ''}
                  />
                </Box>

                <Spacer />

                <label
                  htmlFor="message"
                  className="rw-label"
                  style={{ marginLeft: '3%' }}
                >
                  Theme{' '}
                </label>
                <SelectField
                  style={{ marginLeft: '3%' }}
                  name="theme"
                  placeholder="Choose a theme:"
                  className="rw-button-group"
                  value={userData['themeLight']}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      themeLight: e.target.value,
                    })
                  }}
                >
                  <option value={true}>Light</option>
                  <option value={false}>Dark</option>
                </SelectField>
                <div className="rw-button-group">
                  <Submit className="rw-button rw-button-blue">Submit</Submit>
                </div>
              </Form>
            </div>
          </div>
        </main>
      </>
    )
  )
}
