/* eslint-disable no-unused-vars */
import { Heading } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Banner from 'src/components/Banner/Banner'

const VerificationSignUpPage = () => {
  return (
    <>
      <Banner />
      <MetaTags
        title="VerificationSignUp"
        description="VerificationSignUp page"
      />
      <Center>
        <Heading as="h2" size="xl">
          {' '}
          Your account is verified please go ahead and Log In
        </Heading>
      </Center>
      <div className="rw-login-link">
        <span>Already Verified</span>{' '}
        <Link to={routes.login()} className="rw-link">
          Log In!
        </Link>
      </div>
    </>
  )
}

export default VerificationSignUpPage
