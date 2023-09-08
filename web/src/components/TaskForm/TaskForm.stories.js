// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <TaskForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import TaskForm from './TaskForm'

export const generated = () => {
  return <TaskForm />
}

export default {
  title: 'Components/TaskForm',
  component: TaskForm,
}
