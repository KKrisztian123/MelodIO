import type { StoryFn, Meta } from "@storybook/react";
import TextBox from "../TextBox";

export default {
    title: "UI Components/Text Box/Text Box",
    component: TextBox,
} as Meta<typeof TextBox>

const Template: StoryFn<typeof TextBox> = (args) => <TextBox {...args}/>

export const Regular = Template.bind({}); 

Regular.args = {
    title: "Hangszínszabályzó",
    description: "A hangszínszabályzó beállítása",
}

