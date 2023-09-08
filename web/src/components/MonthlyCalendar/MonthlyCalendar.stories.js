// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <MonthlyCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import MonthlyCalendar from './MonthlyCalendar'

export const generated = () => {
  return <MonthlyCalendar />
}

export default {
  title: 'Components/MonthlyCalendar',
  component: MonthlyCalendar,
}
