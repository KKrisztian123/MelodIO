import type { StoryFn, Meta } from "@storybook/react";
import Switch from "../switch/Switch";

export default {
  title: "UI Components/Inputs/Switch",
  component: Switch,
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) => <Switch {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  id: "lipsum",
  label: "Lorem ipsum dolor sit amet.",
};

export const Checked = Template.bind({});
Checked.args = {
  id: "lipsum",
  defaultChecked: true,
  label: "Lorem ipsum dolor sit amet.",
};
