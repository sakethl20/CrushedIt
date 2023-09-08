import { useState } from 'react'

import {
  //Card,
  //CardBody,
  IconButton,
  Button,
  Text,
  Heading,
  Box,
  Stack,
  StackDivider,
  Icon,
  Tooltip,
} from '@chakra-ui/react'
import { BiFoodTag } from 'react-icons/bi'
import {
  BsArrowRightSquare,
  BsCheckSquare,
  BsXSquare,
  BsSquare,
} from 'react-icons/bs'

const TaskCard = ({ taskCard }) => {
  const truncate = (artText, length) => {
    if (artText.length < length) {
      return artText
    }
    return artText.substring(0, length) + '...'
  }
  const [urgency, setUrgency] = useState(taskCard.urgency || 'C')
  const [status, setStatus] = useState(taskCard.status|| 'Not Started')

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Not Started':
        return <Icon as={BsSquare} boxSize="20px" mr="2" />
      case 'Started':
        return <Icon as={BiFoodTag} boxSize="27px" mr="2" />
      case 'Pushed':
        return <Icon as={BsArrowRightSquare} boxSize="20px" mr="2" />
      case 'Finished':
        return <Icon as={BsCheckSquare} boxSize="20px" mr="2" />
      case 'Cancelled':
        return <Icon as={BsXSquare} boxSize="20px" mr="2" />
      default:
        return <Icon as={BsSquare} boxSize="20px" mr="2" />
    }
  }

  const [icon, setIcon] = useState(getStatusIcon(status))

  const handleUrgencyClick = () => {
    if (urgency === 'A') {
      setUrgency('B')
    } else if (urgency === 'B') {
      setUrgency('C')
    } else {
      setUrgency('A')
    }
  }

  const handleStatusClick = () => {
    let newStatus
    if (status === 'Not Started') {
      newStatus = 'Started'
    } else if (status === 'Started') {
      newStatus = 'Pushed'
    } else if (status === 'Pushed') {
      newStatus = 'Finished'
    } else if (status === 'Finished') {
      newStatus = 'Cancelled'
    } else {
      newStatus = 'Not Started'
    }
    setStatus(newStatus)
    setIcon(getStatusIcon(newStatus))
  }

  return (
    <Box p="1.5" ml="2" rounded="xl" boxShadow="md" maxW="md">
      <Box display="flex" m="1">
        <Tooltip
          hasArrow
          label={
            urgency === 'A' ? 'Urgent' : urgency === 'B' ? 'Important' : 'Other'
          }
        >
          <Button p="1" mr="3" width="30px" onClick={handleUrgencyClick}>
            {urgency === 'A' ? '(A)' : urgency === 'B' ? '(B)' : '(C)'}
          </Button>
        </Tooltip>
        <Tooltip hasArrow label={status}>
          <IconButton pl="2" mr="6" width="30px" onClick={handleStatusClick} data-testid="status-icon">
            {icon}
          </IconButton>
        </Tooltip>
        <Text fontSize="lg" mt="2">
          {taskCard.title} <br></br>
        </Text>
      </Box>
    </Box>
  )
}

export default TaskCard
