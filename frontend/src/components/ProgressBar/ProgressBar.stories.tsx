import type { Meta, StoryFn } from "@storybook/react";
import ProgressBar from "./ProgressBar";

export default {
    title: "UI Components/Progress Bar/Progress Bar",
    component: ProgressBar,
} as Meta<typeof ProgressBar>

const Template: StoryFn<typeof ProgressBar> = (args) => <ProgressBar {...args} />

export const Stateless = Template.bind({});

export const Small = Template.bind({});
Small.args = {
   size: "small"
}
export const Stateful = Template.bind({});
Stateful.args = {
    percentage: 90,
}