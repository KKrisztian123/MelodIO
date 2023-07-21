import { Meta, StoryFn } from "@storybook/react";
import Modal from "../Modal";
import Button from "../../Button/Button";
import SelectionContainer from "../../Selection/SelectionContainer";
import SelectionItem from "../../Selection/SelectionItem";
import {
  faGlobe,
  faHeadphones,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default {
  title: "UI Components/Modal/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  title: "Lorem ipsum",
  triggerComponent: <Button text="Modal" />,
  closeComponent: <Button text="Bezárás" />,
};

const TemplateWithState: StoryFn<typeof Modal> = (args) => {
  const [state, setState] = useState(false);
  return <Modal {...args} isOpen={state} changeOpen={setState} />;
};

export const Controlled = TemplateWithState.bind({});
Controlled.args = {
  title: "Lorem ipsum",
  triggerComponent: <Button text="Modal" />,
};
