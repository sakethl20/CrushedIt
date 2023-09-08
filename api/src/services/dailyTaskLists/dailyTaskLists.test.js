import {
  dailyTaskLists,
  dailyTaskList,
  createDailyTaskList,
  updateDailyTaskList,
  deleteDailyTaskList,
} from './dailyTaskLists'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dailyTaskLists', () => {
  scenario('returns all dailyTaskLists', async (scenario) => {
    const result = await dailyTaskLists()

    expect(result.length).toEqual(Object.keys(scenario.dailyTaskList).length)
  })

  scenario('returns a single dailyTaskList', async (scenario) => {
    const result = await dailyTaskList({ id: scenario.dailyTaskList.one.id })

    expect(result).toEqual(scenario.dailyTaskList.one)
  })

  scenario('creates a dailyTaskList', async (scenario) => {
    const result = await createDailyTaskList({
      input: {
        userId: scenario.dailyTaskList.two.userId,
        listDate: '2023-04-16T20:24:18.971Z',
        taskList: 'String',
      },
    })

    expect(result.userId).toEqual(scenario.dailyTaskList.two.userId)
    expect(result.listDate).toEqual(new Date('2023-04-16T20:24:18.971Z'))
    expect(result.taskList).toEqual('String')
  })

  scenario('updates a dailyTaskList', async (scenario) => {
    const original = await dailyTaskList({
      id: scenario.dailyTaskList.one.id,
    })
    const result = await updateDailyTaskList({
      id: original.id,
      input: { listDate: '2023-04-17T20:24:18.971Z' },
    })

    expect(result.listDate).toEqual(new Date('2023-04-17T20:24:18.971Z'))
  })

  scenario('deletes a dailyTaskList', async (scenario) => {
    const original = await deleteDailyTaskList({
      id: scenario.dailyTaskList.one.id,
    })
    const result = await dailyTaskList({ id: original.id })

    expect(result).toEqual(null)
  })
})
