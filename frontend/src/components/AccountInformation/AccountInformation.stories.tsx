import { Meta, StoryFn } from "@storybook/react";
import AccountInformation from "./AccountInformation";

export default {
    title: "UI Components/Account Information/Account Information",
    component: AccountInformation,
} as Meta<typeof AccountInformation>

const Template: StoryFn<typeof AccountInformation> = (args) => <AccountInformation {...args} />

export const NoProfilePicture = Template.bind({})
NoProfilePicture.args = {
    userName: "Kucsera Krisztián",
    userEmail: "kucserakrisztian1@gmail.com"
}

export const ProfilePicture = Template.bind({})
ProfilePicture.args = {
    src: "https://i.scdn.co/image/ab67616d00001e02bc3f33247a4190be63e40fb2",
    userName: "Kucsera Krisztián",
    userEmail: "kucserakrisztian1@gmail.com"
}