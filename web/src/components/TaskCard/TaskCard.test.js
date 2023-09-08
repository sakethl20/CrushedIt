import { render, screen, within } from '@redwoodjs/testing/web'

import TaskCard from './TaskCard'
import { Tooltip } from '@chakra-ui/react'

import { userEvent, fireEvent } from "@testing-library/react";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const taskCard = {
  title: 'Task Title',
  body: 'Write a truncate function, this function is able to shorten the body of text to fit within the card and end with an ellipsis.',
  dueDate: '2023-02-26',
  urgency: 'A',
  status: 'Not Started',
  createdAt: '2023-02-26T05:24:01.921Z', // ISO standard
}

describe('TaskCard', () => {
  it('renders successfully', () => {
    render(<TaskCard taskCard={taskCard} />)

    expect(screen.getByText(taskCard.title)).toBeInTheDocument()
  })

  test('status tooltip renders successfully', async () => {
    const cardRender = render(<TaskCard taskCard={taskCard} />);

    fireEvent.mouseOver(cardRender.getByTestId("status-icon"));

    expect(await cardRender.findByText(taskCard.status)).toBeInTheDocument();
  });

})
