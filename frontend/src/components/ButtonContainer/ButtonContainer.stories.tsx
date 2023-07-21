import type { StoryFn, Meta } from "@storybook/react";
import Button from "../Button/Button";
import "../../theme/variables.css";
import ButtonContainer from "./ButtonContainer";


export default {
  title: "UI Components/Buttons/ButtonContainer",
  component: ButtonContainer,
} as Meta<typeof ButtonContainer>;

const Template: StoryFn<typeof ButtonContainer> = (args) => (
  <ButtonContainer {...args}>
    <Button text="Primary" variant="box" type="primary" />
    <Button text="Secondary" variant="box" type="secondary" />
    <Button text="Tertiary" variant="box" type="tertiary" />
  </ButtonContainer>
);

export const Regular = Template.bind({});

Regular.args = {
  center: false,
};

export const Centered = Template.bind({});

Centered.args = {
  center: true,
};
