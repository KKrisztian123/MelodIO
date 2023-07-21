import type { StoryFn, Meta } from "@storybook/react";
import { FormSwitch } from "../switch/Switch";
import Form from "../../Form";
import Button from "../../../Button/Button";

export default {
  title: "UI Components/Inputs/Form Inputs/Form Switch",
  component: FormSwitch,
  decorators: [(Story) => (
    <Form onSubmit={e => console.log(e)}>
      <Story />
      <br/>
      <Button text={"Send"} variant="box" type="primary" size="small" buttonType="submit" />
    </Form>
  )],
} as Meta<typeof FormSwitch>;

const Template: StoryFn<typeof FormSwitch> = (args) => <FormSwitch {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  id: "lipsum",
  label: "Lorem ipsum dolor sit amet.",
  config: { required: { value: true, message: "" } },
};
export const Checked = Template.bind({});
Checked.args = {
  id: "lipsum",
  label: "Lorem ipsum dolor sit amet.",
  defaultChecked: true,
  config: { required: { value: true, message: "" } },
};