import { Center, Text } from '@chakra-ui/react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
} from '@chakra-ui/react'

// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import MonthlyCalendar from 'src/components/MonthlyCalendar/MonthlyCalendar'
import Taskview from 'src/components/Taskview/Taskview'

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />
      <Flex>
        <Text fontSize="2xl" mr={25}>
          Planner
        </Text>
        {/* Creates enclosed tabs */}
        <Tabs variant="enclosed" w={'100%'}>
          <TabList>
            <Tab _focus={{ boxShadow: 'none' }}>Tasks</Tab>
            <Tab _focus={{ boxShadow: 'none' }}>Appointments</Tab>
          </TabList>
          <TabPanels>
            {/* Task View Panel */}
            <TabPanel>
              {/* Scaffold for the Task view */}
              <Center>
                <Flex justify="center" align="center">
                  {/* <Box w="300px" p={4} mr={4} bg="gray">
                    <Text mt={4}>Tasks</Text>
                    {/* <Image
                      src="https://via.placeholder.com/400x400.png?text=Image+1"
                      alt="Image 1"
                      borderRadius="md"
                    />
                    <Taskview />
                  </Box>
                  <Box w="300px" p={4} ml={4} bg="gray">
                    <Text mt={4}>Appointments</Text>
                    <Image
                      src="https://via.placeholder.com/400x400.png?text=Image+2"
                      alt="Image 2"
                      borderRadius="md"
                    />
                  </Box> */}
                  <Taskview />
                </Flex>
              </Center>
            </TabPanel>
            {/* Calendar View Panel */}
            <TabPanel>
              <Center>
                <Box w={'100%'} h={'100%'}>
                  <MonthlyCalendar borderRadius="md" />
                </Box>
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  )
}

export default LandingPage
