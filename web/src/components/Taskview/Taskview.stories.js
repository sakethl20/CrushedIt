// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Taskview {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Taskview from './Taskview'

export const generated = () => {
  return <Taskview />
}

export default {
  title: 'Components/Taskview',
  component: Taskview,
}
