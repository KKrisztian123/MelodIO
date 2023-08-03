import { Meta, StoryFn } from "@storybook/react";
import FullScreenModal from "../FullScreenModal";
import Button from "../../Button/Button";

export default {
    title: "UI Components/Modal/Full Screen Modal",
    component: FullScreenModal
} as Meta<typeof FullScreenModal>

const Template: StoryFn<typeof FullScreenModal> = (args) => <FullScreenModal {...args} />

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  title: "Lorem ipsum",
  triggerComponent: <Button text="Modal" />,
  closeComponent: <Button text="Bezárás" />,
};