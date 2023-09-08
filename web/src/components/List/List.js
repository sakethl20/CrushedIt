import React, { useState } from 'react'

import { Button } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { TaskListContext } from '../../hooks/taskListContext'
import TaskCard from '../TaskCard/TaskCard'
import TaskForm from '../TaskForm/TaskForm'

const arrayOfItems = [
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
    status: 'Not Started',
    createdAt: '',
  },
  {
    id: 2,
    title: 'Neha Shirwalker',
    body: '',
    dueDate: '',
    urgency: 'A',
    status: 'Not Started',
    createdAt: '',
  },
  {
    id: 3,
    title: 'Rayaan Azmi',
    body: '',
    dueDate: '',
    urgency: 'A',
    status: 'Not Started',
    createdAt: '',
  },
  {
    id: 4,
    title: 'Ritika Suresh',
    body: '',
    dueDate: '',
    urgency: 'A',
    status: 'Not Started',
    createdAt: '',
  },
]

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const List = () => {
  const [task, setTask] = useState(arrayOfItems)
  const onDragEnd = (result) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return
    const tasks = reorder(task, result.source.index, result.destination.index)
    setTask(tasks)
  }

  // const [disable, setDisable] = React.useState(false)

  const addTask = (newTask) => {
    setTask([...task, newTask])
  }

  return (
    <>
      <TaskListContext.Provider value={task}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {task.map((item, index) => (
                <Draggable
                  draggableId={item.id.toString()}
                  key={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        margin: '0 0 10px 0',
                        backgroundColor: snapshot.isDragging
                          ? 'yellow'
                          : 'white',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {/* {item.title} */}
                      <TaskCard
                        taskCard={{
                          title: item.title,
                          body: 'Write a truncate function, this function is able to shorten the body of text to fit within the card and end with an ellipsis.',
                          dueDate: new Date().toDateString(),
                          urgency: item.urgency,
                          status: item.status,
                          createdAt: new Date().toISOString(),
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </TaskListContext.Provider>
      <TaskForm addTask={addTask} />
    </>
  )
}

export default List
