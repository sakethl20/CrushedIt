// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <TaskCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import TaskCard from './TaskCard'

export const generated = () => {
  return (
    <TaskCard
      taskCard={{
        title: 'Task Title',
        body: 'Write a truncate function, this function is able to shorten the body of text to fit within the card and end with an ellipsis.',
        dueDate: '2023-02-26',
        urgency: 'A',
        status: 'Not Started',
        createdAt: '2023-02-26T05:24:01.921Z', // ISO standard
      }}
    />
  )
}

export default {
  title: 'Components/TaskCard',
  component: TaskCard,
}
