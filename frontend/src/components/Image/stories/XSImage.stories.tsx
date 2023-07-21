import { Meta, StoryFn } from "@storybook/react";
import { XSImage } from "../Image";

export default {
    title: "UI Components/Images/Extra Small Image",
    component: XSImage,
} as Meta<typeof XSImage>

const Template: StoryFn<typeof XSImage> = (args) => <XSImage {...args}/>

export const Regular = Template.bind({});
Regular.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
}
export const AmbientLight = Template.bind({});
AmbientLight.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    ambientLight: true,
}