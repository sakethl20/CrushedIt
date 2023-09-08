import { logger } from 'src/lib/logger'

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
export const handler = async (event) => {
  logger.info('Invoked migrateToNewDay function')
  // sets the default response
  let statusCode = 200
  let message = ''
  let priorDayClosed = []
  let newDayTasks = []

  try {
    // get the list of the tasks from a prior day from the event query string
    const { priorDayTasks } = event.queryStringParameters

    // make sure the values to divide are provided
    if (priorDayTasks === undefined) {
      statusCode = 400
      message = `Prior day tasks missing.`
      throw Error(message)
    }

    // iterate over the priorDayTasks
    priorDayTasks.forEach((task) => {
      if (task.status === 'Not Started') {
        // Any task that has a status of "Not Started" do
        priorDayClosed.push({ ...task, status: 'Pushed' })
        newDayTasks.push({ ...task, status: 'Not Started' })
      } else if (task.status === 'Started') {
        // Any task that has a status of "Started" do
        priorDayClosed.push({ ...task, status: 'Started' })
        newDayTasks.push({ ...task, status: 'Not Started' })
      } else if (task.status === 'Pushed') {
        // Any task that has a status of "Pushed" do
        priorDayClosed.push({ ...task, status: 'Pushed' })
        newDayTasks.push({ ...task, status: 'Not Started' })
      } else if (task.status === 'Finished') {
        // Any task that has a status of "Finished" do
        priorDayClosed.push({ ...task, status: 'Finished' })
      } else if (task.status === 'Cancelled') {
        // Any task that has a status of "Cancelled" do
        priorDayClosed.push({ ...task, status: 'Cancelled' })
      }
    })

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: 'migrateToNewDay function',
        priorDayClosed,
        newDayTasks,
      }),
    }
  } catch (error) {
    return {
      statusCode,
      body: {
        message: error.message,
      },
    }
  }
}
