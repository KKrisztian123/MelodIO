import Checkbox from "../checkbox/Checkbox";
import Form from "../../Form";
import type { StoryFn, Meta } from "@storybook/react";
import Button from "../../../Button/Button";

export default {
  title: "UI Components/Inputs/Form Inputs/Checkbox",
  component: Checkbox,
  decorators: [(Story) => (
    <Form onSubmit={(e)=>console.log(e)}>
      <Story />
      <br/>
      <Button text={"Send"} variant="box" type="primary" size="small" buttonType="submit" />
    </Form>
  )],
} as Meta<typeof Checkbox>

const Template: StoryFn<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: "Lorem ipsum dolor sit amet.",
  id: "lipsum",
  config: { required: { value: true, message: "" } },
};
export const Checked = Template.bind({});
Checked.args = {
  label: "Lorem ipsum dolor sit amet.",
  id: "lipsum",
  defaultChecked: true,
  config: { required: { value: true, message: "" } },
};