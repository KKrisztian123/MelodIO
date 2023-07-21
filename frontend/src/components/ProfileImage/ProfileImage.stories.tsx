import { Meta, StoryFn } from "@storybook/react";
import ProfileImage from "./ProfileImage";

export default {
    title: "UI Components/Profile/Avatar",
    component: ProfileImage,
} as Meta<typeof ProfileImage>

const Template: StoryFn<typeof ProfileImage> = (props) => <ProfileImage {...props}/>

export const LargeInitials = Template.bind({});
LargeInitials.args = {
    name: "Jane Doe",
    size: "large",
}
export const MediumInitials = Template.bind({});
MediumInitials.args = {
    name: "Jane Doe",
    size: "medium",
}
export const SmallInitials = Template.bind({});
SmallInitials.args = {
    name: "Jane Doe",
    size: "small",
}
export const LargeAvatar = Template.bind({});
LargeAvatar.args = {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    name: "Jane Doe",
    size: "large",
}
export const MediumAvatar = Template.bind({});
MediumAvatar.args = {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    name: "Jane Doe",
    size: "medium",
}
export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    name: "Jane Doe",
    size: "small",
}