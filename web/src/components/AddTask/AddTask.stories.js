// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AddTask {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AddTask from './AddTask'

export const generated = () => {
  return <AddTask />
}

export default {
  title: 'Components/AddTask',
  component: AddTask,
}
