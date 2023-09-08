import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { useAuth } from 'web/src/auth.js'

import { Link } from '@redwoodjs/router'

// import { Router, Route, Set } from '@redwoodjs/router'

const Banner = ({ currentLocation }) => {
  const currentRoute = dictonary.find((route) => route.path === currentLocation) //this line of code find a route from the dictonary array that has path property that matches the current route
  const links = currentRoute ? currentRoute.links : [] //this line check if a matching route is found, if so assign the link, if not just assing empty values.
  const { isAuthenticated, logOut } = useAuth()
  return (
    <Flex
      minWidth={'max-content'}
      alignItems="center"
      gap="2"
      bg="black"
      height="40px"
    >
      <Box p={2}>
        <Heading color="white" fontSize="2xl" fontWeight={'semibold'}>
          Crushed It
        </Heading>
      </Box>
      <Spacer />
      {links.map(
        (
          link // in here helps to re-use the code that we were repeating before
        ) => (
          <Box key={link.href}>
            <Link to={link.href}>
              <Text color="white" fontWeight={'light'} fontSize={'sm'} mr={4}>
                {link.text}
              </Text>
            </Link>
          </Box>
        )
      )}
      {isAuthenticated ? (
        <Link to="" onClick={logOut}>
          <Text
            color="white"
            fontWeight={'light'}
            fontSize={'sm'}
            marginRight={4}
          >
            Sign out
          </Text>
        </Link>
      ) : (
        <></>
      )}
    </Flex>
  )
}

const dictonary = [
  //defines an array named dictionary for different links
  {
    path: '/',
    links: [{ text: 'Sign up', href: '/signup' }],
  },
  {
    path: '/login',
    links: [{ text: 'Sign up', href: '/signup' }],
  },
  {
    path: '/signup',
    links: [{ text: 'Sign in', href: '/login' }],
  },
  {
    path: '/landing', //planner page planner=landing
    links: [{ text: 'Profile', href: '/profile' }],
  },
  {
    path: '/profile',
    links: [{ text: 'Planner', href: '/landing' }],
  },
]

export default Banner
