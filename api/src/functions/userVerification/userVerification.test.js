// import { db } from 'src/lib/db'

import { handler } from './userVerification'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

/*describe('userVerification function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        id: '42', // Add parameters here
      },
    })

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toBe('userVerification function')
  })

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})
*/

describe('verification function', () => {
  const db = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns 400 when no verification token is provided', async () => {
    const event = {
      queryStringParameters: {},
    }
    const result = await handler(event, null, { db })

    expect(result).toEqual({
      statusCode: 400,
      body: 'Invalid verification token',
    })
    expect(db.user.findUnique).not.toHaveBeenCalled()
    expect(db.user.update).not.toHaveBeenCalled()
  })

  it('returns 302 when user is already verified', async () => {
    const token = 'some_token'
    const event = {
      queryStringParameters: { verify: token },
    }
    const user = { id: 1 }
    db.user.findUnique.mockResolvedValue(user)

    const result = await handler(event, null, { db })

    expect(result).toEqual({
      statusCode: 302,
      headers: {
        Location: `${process.env.CLIENT_ADDRESS}` + '/verification-sign-up',
      },
      body: 'Account is already verified, go ahead and sign in',
    })
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { verificationToken: token },
    })
    expect(db.user.update).not.toHaveBeenCalled()
  })

  it('returns 302 and updates user when verification is successful', async () => {
    const token = 'some_token'
    const event = {
      queryStringParameters: { verify: token },
    }
    const user = { id: 1, verificationToken: token }
    db.user.findUnique.mockResolvedValue(user)

    const result = await handler(event, null, { db })

    expect(result).toEqual({
      statusCode: 302,
      headers: {
        Location: `${process.env.CLIENT_ADDRESS}` + '/verification-sign-up',
      },
      body: 'Verification was successful, go ahead and sign in',
    })
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { verificationToken: token },
    })
    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: user.id },
      data: { verificationToken: null },
    })
  })

  it('returns 500 when there is a database error', async () => {
    const token = 'some_token'
    const event = {
      queryStringParameters: { verify: token },
    }
    db.user.findUnique.mockRejectedValue(new Error('database error'))

    const result = await handler(event, null, { db })

    expect(result).toEqual({
      statusCode: 500,
      body: 'Internal Server Error',
    })
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { verificationToken: token },
    })
    expect(db.user.update).not.toHaveBeenCalled()
  })
})
