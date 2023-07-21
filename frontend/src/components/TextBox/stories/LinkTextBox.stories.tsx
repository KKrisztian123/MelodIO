import type { StoryFn, Meta } from "@storybook/react";
import { LinkTextBox } from "../TextBox";

export default {
    title: "UI Components/Text Box/Link Text Box",
    component: LinkTextBox,
} as Meta<typeof LinkTextBox>

const Template: StoryFn<typeof LinkTextBox> = (args) => <LinkTextBox {...args}/>

export const Regular = Template.bind({}); 
Regular.args = {
    title: "Hangszínszabályzó",
    description: "A hangszínszabályzó beállítása",
    isDisabled: false,
}

export const Disabled = Template.bind({}); 
Disabled.args = {
    title: "Hangszínszabályzó",
    description: "A hangszínszabályzó beállítása",
    isDisabled: true,
}


