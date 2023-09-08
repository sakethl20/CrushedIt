import { db } from 'src/lib/db'

export const dailyTaskLists = () => {
  return db.dailyTaskList.findMany()
}

export const dailyTaskList = ({ id }) => {
  return db.dailyTaskList.findUnique({
    where: { id },
  })
}

export const createDailyTaskList = ({ input }) => {
  return db.dailyTaskList.create({
    data: input,
  })
}

export const updateDailyTaskList = ({ id, input }) => {
  return db.dailyTaskList.update({
    data: input,
    where: { id },
  })
}

export const deleteDailyTaskList = ({ id }) => {
  return db.dailyTaskList.delete({
    where: { id },
  })
}

export const DailyTaskList = {
  User: (_obj, { root }) => {
    return db.dailyTaskList.findUnique({ where: { id: root?.id } }).User()
  },
}
