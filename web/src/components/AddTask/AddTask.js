import { useState } from 'react'

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'

import TaskCard from '../TaskCard/TaskCard'

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
]

const AddTask = () => {
  const [task, setTask] = useState(arrayOfItems)
  function createCard() {
    setTask([
      ...task,
      {
        id: arrayOfItems[arrayOfItems.length - 1].id++,
        title: document.getElementById('text'),
        body: '',
        status: 'Not Started',
        urgency: 'C',
      },
    ])
  }

  return (
    <Box maxW="250px">
      <FormControl isRequired mb="10px">
        <FormLabel>Task</FormLabel>
        <Input id="text" type="text" name="title" />
        <Button
          variant="solid"
          isLoding="props.isSubmiting"
          type="submit"
          onClick={createCard}
        >
          Add
        </Button>
      </FormControl>
    </Box>
  )
}

export default AddTask
