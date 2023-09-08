// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <List {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import List from './List'

export const generated = () => {
  return <List />
}

export default {
  title: 'Components/List',
  component: List,
}
