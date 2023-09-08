import UserCellChangePass from './UserCellChangePass'
import UserCellForm from './UserCellForm'

export const QUERY = gql`
  query FindUserQuery($id: Int!) {
    user: user(id: $id) {
      id
      email
      themeLight
      firstName
      lastName
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  return (
    <>
      <UserCellForm fetchedData={user} />
      <UserCellChangePass fetchedData={user} />
    </>
  )
}
