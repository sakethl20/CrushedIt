import { APIGatewayEvent } from 'aws-lambda'

import { db } from 'src/lib/db'
// import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export const handler = async (event: APIGatewayEvent) => {
  console.log('Received event:', JSON.stringify(event))

  // Get the verification token from the query string parameters
  const token =
    event.queryStringParameters && event.queryStringParameters.verify
  console.log('Verification token:', token)

  // Check if the token is valid
  if (!token) {
    console.error('Invalid verification token')
    return {
      statusCode: 400,
      body: 'Invalid verification token',
    }
  }

  // Look up the user in the database using the verification token
  let user
  try {
    user = await db.user.findUnique({
      where: { verificationToken: token },
    })
  } catch (error) {
    console.error('Database error:', error)
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }

  if (!user) {
    // If the user is not found, redirect to the sign-in page with an error message
    console.log('User not found for verification token:', token)
    return {
      statusCode: 302,
      headers: {
        Location: `${process.env.CLIENT_ADDRESS}` + '/verification-sign-up',
      },
      body: 'Account is already verified, go ahead and sign in',
    }
  } else {
    // If the user is found, update the database to mark the account as verified
    try {
      await db.user.update({
        where: { id: user.id },
        data: { verificationToken: null, verified: true },
      })
    } catch (error) {
      console.error('Database error:', error)
      return {
        statusCode: 500,
        body: 'Internal Server Error',
      }
    }

    console.log('User verified:', user.id)

    // Redirect to the sign-in page with a success message
    return {
      statusCode: 302,
      headers: {
        Location: `${process.env.CLIENT_ADDRESS}` + '/verification-sign-up',
      },
      body: 'Verification was successful, go ahead and sign in',
    }
  }
}
