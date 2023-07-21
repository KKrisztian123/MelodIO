import { Meta, StoryFn } from "@storybook/react";
import { LImage } from "../Image";

export default {
    title: "UI Components/Images/Large Image",
    component: LImage,
} as Meta<typeof LImage>

const Template: StoryFn<typeof LImage> = (args) => <LImage {...args}/>

export const Regular = Template.bind({});
Regular.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
}
export const AmbientLight = Template.bind({});
AmbientLight.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    ambientLight: true,
}