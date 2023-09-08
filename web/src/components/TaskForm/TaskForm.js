// TaskForm.js
import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Select, useDisclosure } from '@chakra-ui/react'

const TaskForm = ({ addTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [urgency, setUrgency] = useState('A')
  const [status, setStatus] = useState('Not Started')

  const handleSubmit = (e) => {
    e.preventDefault()

    addTask({
      id: Date.now(),
      title,
      body,
      dueDate,
      urgency,
      status,
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setBody('')
    setDueDate('')
    setUrgency('A')
    setStatus('')
    onClose()
  }

  return (
    <>
      <Button colorScheme="gray" mr={3} onClick={onOpen} isDisabled={false}>
        + Add task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl mt={4} id="body">
                <FormLabel>Body</FormLabel>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
              </FormControl>
              <FormControl mt={4} id="dueDate">
                <FormLabel>Due Date</FormLabel>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </FormControl>
              <FormControl mt={4} id="urgency">
              <FormLabel>Urgency</FormLabel>
                <Select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                  <option value="A">(A) - Urgent</option>
                  <option value="B">(B) - Import</option>
                  <option value="C">(C) - Other</option>
                </Select>
              </FormControl>
              <FormControl mt={4} id="status">
                <FormLabel>Status</FormLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Not Started">Not Started</option>
                  <option value="Started">Started</option>
                  <option value="Pushed">Pushed</option>
                  <option value="Finished">Finished</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TaskForm
