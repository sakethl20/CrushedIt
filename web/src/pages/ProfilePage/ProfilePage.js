import { useEffect, useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UserCell from 'src/components/UserCell'

const ProfilePage = () => {
  const { getCurrentUser } = useAuth()
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    getCurrentUser().then((e) => setUserID(e.id))
    getCurrentUser().then((e) => console.log(e.id))
    console.log(userID)
  }, [])

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <div
        className="rw-segment"
        style={{
          margin: '0 auto',
          width: '39.3%',
          fontSize: '20px',
          backgroundColor: '#e2e8f0',
        }}
      >
        <br />
        <h1>
          <b>Profile</b>
        </h1>
        <br />
      </div>
      <br></br>
      {userID !== null && <UserCell id={userID} />}
    </>
  )
}

export default ProfilePage
