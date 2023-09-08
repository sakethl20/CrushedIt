import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './migrateToNewDay'

describe('migrateToNewDay function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        priorDayTasks: [
          {
            id: 0,
            title: 'Casey Regetz',
            body: '',
            dueDate: '',
            urgency: 'A',
            status: 'Not Started',
            createdAt: '',
          },
          {
            id: 1,
            title: 'Manal Desai',
            body: '',
            dueDate: '',
            urgency: 'A',
            status: 'Started',
            createdAt: '',
          },
          {
            id: 2,
            title: 'Neha Shirwalker',
            body: '',
            dueDate: '',
            urgency: 'A',
            status: 'Pushed',
            createdAt: '',
          },
          {
            id: 3,
            title: 'Rayaan Azmi',
            body: '',
            dueDate: '',
            urgency: 'A',
            status: 'Finished',
            createdAt: '',
          },
          {
            id: 4,
            title: 'Ritika Suresh',
            body: '',
            dueDate: '',
            urgency: 'A',
            status: 'Cancelled',
            createdAt: '',
          },
        ],
      },
    })

    const response = await handler(httpEvent)
    const { priorDayClosed, newDayTasks } = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(priorDayClosed.length).toBe(5)
    expect(newDayTasks.length).toBe(3)
    expect(priorDayClosed[0].status).toBe('Pushed')
    expect(priorDayClosed[1].status).toBe('Started')
    expect(priorDayClosed[2].status).toBe('Pushed')
    expect(priorDayClosed[3].status).toBe('Finished')
    expect(priorDayClosed[4].status).toBe('Cancelled')
    expect(newDayTasks[0].status).toBe('Not Started')
    expect(newDayTasks[1].status).toBe('Not Started')
    expect(newDayTasks[2].status).toBe('Not Started')
  })

  it('Should respond with 400 when priorDayTasks is undefined', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        priorDayTasks: undefined, // Set priorDayTasks to undefined to get error status code
      },
    })
  
    const response = await handler(httpEvent, null)
    expect(response.statusCode).toBe(400)
  })
  

  // You can also use scenarios to test your api functions
  // See guide here: https://redwoodjs.com/docs/testing#scenarios
  //
  // scenario('Scenario test', async () => {
  //
  // })
})
