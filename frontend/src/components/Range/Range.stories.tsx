import type { Meta, StoryFn } from "@storybook/react";
import RangeInput from "./RangeInput";

export default {
    title: "UI Components/Inputs/Range Input",
    component: RangeInput,
} as Meta<typeof RangeInput>

const Template: StoryFn<typeof RangeInput> = (args) => <RangeInput {...args} />

export const Horizontal = Template.bind({});
Horizontal.args = {
    min:-20,
    max:20,
    startOrnament:"0:00",
    endOrnament: "1:33",
}


export const ReverseHorizontal = Template.bind({});
ReverseHorizontal.args = {
    min:-20,
    max:20,
    startOrnament:"0:00",
    endOrnament: "1:33",
    reverse: true
}

export const Vertical = Template.bind({});
Vertical.args = {
    min:0,
    max:153,
    startOrnament:"0:00",
    endOrnament: "1:33",
    orientation: "vertical",
    size: 100,
}

export const ReverseVertical = Template.bind({});
ReverseVertical.args = {
    min:0,
    max:153,
    startOrnament:"0:00",
    endOrnament: "1:33",
    orientation: "vertical",
    reverse: true,
    size: 200,
}