import { Meta, StoryFn } from "@storybook/react";
import { MImage } from "../Image";

export default {
    title: "UI Components/Images/Medium Image",
    component: MImage,
} as Meta<typeof MImage>

const Template: StoryFn<typeof MImage> = (args) => <MImage {...args}/>

export const Regular = Template.bind({});
Regular.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
}
export const AmbientLight = Template.bind({});
AmbientLight.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    ambientLight: true,
}