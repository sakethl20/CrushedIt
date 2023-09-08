// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AppointmentList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AppointmentList from './AppointmentList'

export const generated = () => {
  return <AppointmentList />
}

export default {
  title: 'Components/AppointmentList',
  component: AppointmentList,
}
