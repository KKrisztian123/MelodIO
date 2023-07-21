import type { StoryFn, Meta } from "@storybook/react";
import Chip from "./Chip";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "UI Components/Chip/Chip",
    component: Chip,
} as Meta<typeof Chip>

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args}/>
export const TextChip = Template.bind({});

TextChip.args = {
    text: "Chip text",
}

export const IconChip = Template.bind({});
IconChip.args = {
    text: "Chip text",
    icon: faBolt
}