import { Meta, StoryFn } from "@storybook/react";
import Image from "../Image";

export default {
    title: "UI Components/Images/Image",
    component: Image,
} as Meta<typeof Image>

const Template: StoryFn<typeof Image> = (args) => <Image {...args}/>

export const Regular = Template.bind({});
Regular.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
}
export const AmbientLight = Template.bind({});
AmbientLight.args = {
    src:"https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    ambientLight: true,
}