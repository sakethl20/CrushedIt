import { Box } from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/dist/toast'

import Banner from 'src/components/Banner/Banner'

const MainLayout = ({ children }) => {
  const currentLocation = window.location.pathname
  return (
    <>
      <Banner currentLocation={currentLocation} />
      <Toaster />
      <Box m={25}>
        <main className="max-w-4xl mx-auto p-12 bg-white shadow rounded-b">
          {children}
        </main>
      </Box>
    </>
  )
}

export default MainLayout
